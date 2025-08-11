"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { X, ChevronLeft, ChevronRight, Plus, Minus, Star, MapPin, Calendar, Award, Shield, Truck, RotateCcw } from "lucide-react"
import { useSearchParams } from "next/navigation"
import ProductReviews from "./product-reviews"

// Size chart images - using placeholder paths that you can replace with actual images
const sizeChartImages = [
  "/images/size-chart-1.jpg",
  "/images/size-chart-2.jpg", 
  "/images/care-instructions.jpg"
]

// Sample reviews data
const sampleReviews = [
  {
    _id: "review1",
    customerName: "Sarah Johnson",
    rating: 5,
    date: "2024-01-15",
    title: "Perfect fit and quality!",
    comment: "This polo shirt exceeded my expectations. The material is incredibly soft and the fit is perfect. I've already ordered another one in a different color. Highly recommend!",
    helpful: 12,
    verified: true,
    images: ["/images/product-polo.png"]
  },
  {
    _id: "review2",
    customerName: "Michael Chen",
    rating: 4,
    date: "2024-01-10",
    title: "Great quality, slight sizing issue",
    comment: "The shirt is well-made and the fabric feels premium. I ordered my usual size but it runs slightly small. Would recommend sizing up if you're between sizes.",
    helpful: 8,
    verified: true
  },
  {
    _id: "review3",
    customerName: "Emily Rodriguez",
    rating: 5,
    date: "2024-01-08",
    title: "Absolutely love it!",
    comment: "This is now my favorite polo shirt. The color is exactly as shown, the material is breathable, and it looks professional. Perfect for both casual and business settings.",
    helpful: 15,
    verified: true,
    images: ["/images/product-polo.png", "/images/product-bomber.png"]
  },
  {
    _id: "review4",
    customerName: "David Thompson",
    rating: 4,
    date: "2024-01-05",
    title: "Good value for money",
    comment: "Solid quality polo shirt. The fabric is comfortable and it washes well. The price point is reasonable for the quality you get. Will definitely buy more from this brand.",
    helpful: 6,
    verified: true
  },
  {
    _id: "review5",
    customerName: "Lisa Wang",
    rating: 5,
    date: "2024-01-02",
    title: "Exceptional quality and service",
    comment: "Not only is the shirt amazing quality, but the customer service was outstanding. Had a small issue with my order and they resolved it immediately. The shirt fits perfectly and looks great!",
    helpful: 9,
    verified: true
  }
]

// Sample vendor products data
const sampleVendorProducts = [
  {
    _id: "vendor1",
    name: "Premium Cotton Polo Shirt",
    price: 55,
    image: "/images/product-polo.png",
    image2: "/images/product-polo.png",
    rating: 4.8,
    reviewCount: 127
  },
  {
    _id: "vendor2",
    name: "Luxury Silk Blend Shirt",
    price: 89,
    image: "/images/product-tshirt.png",
    image2: "/images/product-tshirt.png",
    rating: 4.6,
    reviewCount: 89
  },
  {
    _id: "vendor3",
    name: "Classic Oxford Button-Down",
    price: 72,
    image: "/images/product-bomber.png",
    image2: "/images/product-bomber.png",
    rating: 4.7,
    reviewCount: 156
  },
  {
    _id: "vendor4",
    name: "Slim Fit Dress Shirt",
    price: 68,
    image: "/images/product-polo.png",
    image2: "/images/product-polo.png",
    rating: 4.5,
    reviewCount: 94
  }
]

interface Product {
  _id: string
  name: string
  price: number
  material: string
  category: string
  description: string
  colors: Array<{
    _id: string
    name: string
    code: string
    isAvailable: boolean
  }>
  sizes: Array<{
    _id: string
    name: string
    isAvailable: boolean
  }>
  defaultImages: Array<{
    url: string
    alt: string
  }>
  colorImages: Array<{
    color: string
    images: Array<{
      url: string
      alt: string
    }>
  }>
  inventory: Array<{
    color: string
    size: string
    stock: number
  }>
  vendor: {
    name: string
    description: string
    rating: number
    totalReviews: number
    location: string
    establishedYear: number
    specialties: string[]
    certifications: string[]
    shippingPolicy: string
    returnPolicy: string
    contactInfo: {
      email: string
      phone: string
      website: string
    }
  }
}

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const searchParams = useSearchParams()
  
  // Get color from URL and set it as initial selected color
  const colorFromUrl = searchParams.get('color')
  const [selectedColor, setSelectedColor] = useState(colorFromUrl || (product?.colors?.length > 0 ? product.colors[0].name : ""))
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [validationError, setValidationError] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [isColorSelected, setIsColorSelected] = useState(!!colorFromUrl)
  
  // Track available sizes for the selected color
  const [availableSizes, setAvailableSizes] = useState<Record<string, Record<string, boolean>>>({})
  const [sizeInventory, setSizeInventory] = useState<Record<string, Record<string, number>>>({})
  
  // Organize images for rendering
  const [displayImages, setDisplayImages] = useState<Array<{url: string, alt: string}>>([])
  const [isLoadingImages, setIsLoadingImages] = useState(false)

  const productRef = useRef<HTMLDivElement>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const successMessageRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [mouseStart, setMouseStart] = useState<number | null>(null)
  const [mouseEnd, setMouseEnd] = useState<number | null>(null)
  const mainImageRef = useRef<HTMLImageElement>(null)
  const [preloadedImages, setPreloadedImages] = useState(new Set<string>())

  // Size chart state
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false)
  const [currentSizeChartIndex, setCurrentSizeChartIndex] = useState(0)
  const sizeChartRef = useRef<HTMLDivElement>(null)

  // Vendor details state
  const [showVendorDetails, setShowVendorDetails] = useState(false)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  // Add this function to preload images
  const preloadImages = (imageUrls: string[]) => {
    return Promise.all(
      imageUrls.map(imageUrl => {
        if (preloadedImages.has(imageUrl)) {
          return Promise.resolve()
        }
        
        return new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => {
            setPreloadedImages(prev => new Set([...prev, imageUrl]))
            resolve()
          }
          img.onerror = () => resolve() // Resolve even on error to prevent hanging
          img.src = imageUrl
        })
      })
    )
  }

  // Set up initial available sizes and inventory based on product data
  useEffect(() => {
    if (product && product.inventory) {
      // Initialize available sizes map for each color
      const sizeAvailability: Record<string, Record<string, boolean>> = {}
      const inventoryBySize: Record<string, Record<string, number>> = {}
      
      // Process inventory data to determine which sizes are available for each color
      product.inventory.forEach(item => {
        if (!sizeAvailability[item.color]) {
          sizeAvailability[item.color] = {}
        }
        
        if (!inventoryBySize[item.color]) {
          inventoryBySize[item.color] = {}
        }
        
        // A size is available for a color if it has stock
        sizeAvailability[item.color][item.size] = item.stock > 0
        inventoryBySize[item.color][item.size] = item.stock
      })
      
      setAvailableSizes(sizeAvailability)
      setSizeInventory(inventoryBySize)
      
      // If we already have a selected color, reset selected size if it's not available
      if (selectedColor && selectedSize) {
        const isCurrentSizeAvailable = sizeAvailability[selectedColor] && 
                                      sizeAvailability[selectedColor][selectedSize]
        
        if (!isCurrentSizeAvailable) {
          setSelectedSize(null)
        }
      }
    }
  }, [product, selectedColor, selectedSize])

  // Set up images based on product data
  useEffect(() => {
    if (product) {
      setIsLoadingImages(true)
      
      let imagesToLoad: Array<{url: string, alt: string}> = []
      
      // If color is selected (either from URL or user selection), show color-specific images
      if (isColorSelected) {
        // Find images for the selected color
        const colorImagesObj = product.colorImages?.find(ci => ci.color === selectedColor)
        const colorImages = colorImagesObj?.images || []
        
        // If we have color-specific images, use them, otherwise fall back to default images
        if (colorImages.length > 0) {
          imagesToLoad = colorImages
        } else {
          imagesToLoad = product.defaultImages || []
        }
      } else {
        // If no color is selected, show default images
        imagesToLoad = product.defaultImages || []
      }
      
      // Only reset index if we're switching to a different set of images
      const currentImageUrls = displayImages.map(img => img.url)
      const newImageUrls = imagesToLoad.map(img => img.url)
      const isDifferentImageSet = JSON.stringify(currentImageUrls) !== JSON.stringify(newImageUrls)
      
      if (isDifferentImageSet) {
        setCurrentImageIndex(0)
      }
      
      setDisplayImages(imagesToLoad)
      
      // Preload all images and wait for them to load
      const imageUrls = imagesToLoad.map(img => img.url)
      let loadedCount = 0
      
      if (imageUrls.length === 0) {
        setIsLoadingImages(false)
        return
      }
      
      imageUrls.forEach(imageUrl => {
        if (preloadedImages.has(imageUrl)) {
          loadedCount++
          if (loadedCount === imageUrls.length) {
            setIsLoadingImages(false)
          }
        } else {
          const img = new Image()
          img.onload = () => {
            setPreloadedImages(prev => new Set([...prev, imageUrl]))
            loadedCount++
            if (loadedCount === imageUrls.length) {
              setIsLoadingImages(false)
            }
          }
          img.onerror = () => {
            loadedCount++
            if (loadedCount === imageUrls.length) {
              setIsLoadingImages(false)
            }
          }
          img.src = imageUrl
        }
      })
    }
  }, [product, selectedColor, isColorSelected, displayImages, preloadedImages])

  // Preload all images when component mounts
  useEffect(() => {
    if (product) {
      setIsLoadingImages(true)
      
      const allImageUrls: string[] = []
      
      // Add default images
      if (product.defaultImages) {
        allImageUrls.push(...product.defaultImages.map(img => img.url))
      }
      
      // Add all color-specific images
      if (product.colorImages) {
        product.colorImages.forEach(colorImg => {
          if (colorImg.images) {
            allImageUrls.push(...colorImg.images.map(img => img.url))
          }
        })
      }
      
      // Remove duplicates and preload
      const uniqueUrls = [...new Set(allImageUrls)]
      
      // Preload all images before showing content
      preloadImages(uniqueUrls).then(() => {
        // Add a minimum loading time to ensure smooth experience
        setTimeout(() => {
          setIsLoadingImages(false)
        }, 1000) // 1 second minimum
      })
    }
  }, [product])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1400)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
 
    // GSAP animations
    if (productRef.current) {
      gsap.from(productRef.current, {
        // Animation properties can be added here
      })
    }

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)

    // GSAP animation for lightbox
    if (lightboxRef.current) {
      gsap.fromTo(lightboxRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
    }
  }

  const closeLightbox = () => {
    if (lightboxRef.current) {
      gsap.to(lightboxRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setLightboxOpen(false),
      })
    }
  }

  // Updated unified swipe handlers
  const handleSwipeStart = (clientX: number) => {
    setTouchStart(clientX)
    setTouchEnd(null)
    setMouseStart(clientX)
    setMouseEnd(null)
    setIsDragging(true)
  }

  const handleSwipeEnd = (clientX: number) => {
    const startPos = touchStart || mouseStart
    if (!startPos) return
    
    const distance = startPos - clientX
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleSlide('next')
    } else if (isRightSwipe) {
      handleSlide('prev')
    }

    // Reset all states
    setTouchStart(null)
    setTouchEnd(null)
    setMouseStart(null)
    setMouseEnd(null)
    setIsDragging(false)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    handleSwipeStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (touchEnd) {
      handleSwipeEnd(touchEnd)
    }
  }

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleSwipeStart(e.clientX)
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !mouseStart) return
    e.preventDefault()
    setMouseEnd(e.clientX)
  }

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || !mouseStart) {
      setIsDragging(false)
      return
    }
    
    e.preventDefault()
    const currentMouseEnd = mouseEnd || e.clientX
    handleSwipeEnd(currentMouseEnd)
  }

  const onMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      setTouchStart(null)
      setTouchEnd(null)
      setMouseStart(null)
      setMouseEnd(null)
    }
  }

  // Unified slide animation for both mobile and desktop
  const handleSlide = (direction: 'next' | 'prev') => {
    if (isLoadingImages || displayImages.length <= 1) return
    
    const nextIndex = direction === 'next' 
      ? (currentImageIndex + 1) % displayImages.length
      : (currentImageIndex - 1 + displayImages.length) % displayImages.length
    
    // Since all images are preloaded, use consistent fast animation
    if (mainImageRef.current) {
      if (direction === 'next') {
        gsap.to(mainImageRef.current, {
          x: -100,
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            setCurrentImageIndex(nextIndex)
            if (mainImageRef.current) {
              gsap.fromTo(mainImageRef.current,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.15 }
              )
            }
          }
        })
      } else {
        gsap.to(mainImageRef.current, {
          x: 100,
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            setCurrentImageIndex(nextIndex)
            if (mainImageRef.current) {
              gsap.fromTo(mainImageRef.current,
                { x: -100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.15 }
              )
            }
          }
        })
      }
    }
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  // Helper function for validation
  const validateInputs = () => {
    // Reset validation error
    setValidationError("")
    
    // Validation checks
    if (!selectedColor) {
      setValidationError("Please select a color")
      return false
    }
    if (!selectedSize) {
      setValidationError("Please select a size")
      return false
    }
    if (quantity <= 0) {
      setValidationError("Quantity must be greater than 0")
      return false
    }
    
    // Check if the selected size is available for the selected color
    if (!availableSizes[selectedColor] || !availableSizes[selectedColor][selectedSize]) {
      setValidationError("Selected size is not available for this color")
      return false
    }
    
    // Check if there's sufficient stock
    const stock = sizeInventory[selectedColor]?.[selectedSize] || 0
    if (stock < quantity) {
      setValidationError(`Only ${stock} items available in this size and color`)
      return false
    }
    
    return true
  }

  const validateAndAddToBag = () => {
    // Reset success message
    setSuccessMessage("")
    
    // Validate inputs
    if (!validateInputs()) {
      return
    }

    // Get selected color object for complete information
    const selectedColorObj = product.colors.find(color => color.name === selectedColor)
    
    // Find an appropriate image to use (use first image or default)
    const productImage = displayImages.length > 0 ? displayImages[0].url : ""
    
    // Create item object with ALL required information
    const item = {
      id: product._id,
      name: product.name,
      price: product.price,
      colorName: selectedColor,
      colorHex: selectedColorObj?.code || "#000000",
      size: selectedSize,
      quantity: quantity,
      image: productImage,
      timestamp: new Date().toISOString(),
      totalPrice: product.price * quantity,
      material: product.material,
      category: product.category,
      description: product.description,
      availableSizes: availableSizes[selectedColor],
      sizeInventory: sizeInventory[selectedColor]
    }

    try {
      // Read existing cart items
      const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]')
    
      // Check if item already exists in cart
      const existingItemIndex = existingCart.findIndex(
        (cartItem: any) => cartItem.id === item.id && 
                    cartItem.colorName === item.colorName && 
                    cartItem.size === item.size
      )

      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        existingCart[existingItemIndex].quantity += item.quantity
        existingCart[existingItemIndex].totalPrice = existingCart[existingItemIndex].price * existingCart[existingItemIndex].quantity
      } else {
        // Add new item if it doesn't exist
        existingCart.push(item)
      }

      // Save updated cart
      localStorage.setItem('cartItems', JSON.stringify(existingCart))
      
      // Dispatch cart updated event
      window.dispatchEvent(new Event('cartUpdated'))
      
      // Clear error if any
      setValidationError("")
    } catch (error) {
      console.error("Error adding to cart:", error)
      setValidationError("Failed to add item to cart")
    }

    // Show success message with animation
    setSuccessMessage("Item added to bag successfully!")
    if (successMessageRef.current) {
      gsap.fromTo(
        successMessageRef.current, 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
      
      // Auto hide after 3 seconds
      setTimeout(() => {
        if (successMessageRef.current) {
          gsap.to(successMessageRef.current, { 
            opacity: 0, 
            y: -20, 
            duration: 0.5, 
            ease: "power2.in",
            onComplete: () => setSuccessMessage("")
          })
        }
      }, 3000)
    }
  }

  // Check if a size is available for the selected color
  const isSizeAvailable = (sizeName: string) => {
    // If no color is selected, use the general availability from the size object
    if (!selectedColor) {
      const sizeObj = product.sizes.find(size => size.name === sizeName)
      return sizeObj?.isAvailable || false
    }
    
    // If a color is selected, check if the size is available for that color
    return availableSizes[selectedColor]?.[sizeName] || false
  }
  
  // Check if a size has stock
  const getSizeStock = (sizeName: string) => {
    if (!selectedColor) return 0
    return sizeInventory[selectedColor]?.[sizeName] || 0
  }

  // Handle color selection
  const handleColorSelect = (colorName: string) => {
    setIsColorSelected(true)
    setSelectedColor(colorName)
    
    // Reset size selection if the current size isn't available for the new color
    if (selectedSize && (!availableSizes[colorName] || !availableSizes[colorName][selectedSize])) {
      setSelectedSize(null)
    }
  }

  const handleSizeChartNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentSizeChartIndex((prev) => (prev + 1) % sizeChartImages.length)
    } else {
      setCurrentSizeChartIndex((prev) => (prev - 1 + sizeChartImages.length) % sizeChartImages.length)
    }
  }

  // Size chart modal component
  const SizeChartModal = () => {
    if (!isSizeChartOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div 
          ref={sizeChartRef}
          className="bg-white w-[90%] max-w-3xl h-[80vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-white">
            <h3 className="text-lg font-semibold">Size Chart</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsSizeChartOpen(false)}
                className="p-1 bg-white hover:bg-gray-50"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 h-[calc(100%-4rem)] overflow-auto bg-white relative">
            {/* Navigation Arrows */}
            <button
              onClick={() => handleSizeChartNavigation('prev')}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={() => handleSizeChartNavigation('next')}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <img
              src={sizeChartImages[currentSizeChartIndex] || "/placeholder.svg"}
              alt={`Size Chart ${currentSizeChartIndex + 1}`}
              className="w-full h-full object-contain"
            />

           {/* Dots Indicator */}
           <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-3">
              {sizeChartImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSizeChartIndex(index)}
                  className={`w-3 h-3 rounded-full border-0 p-0 flex-shrink-0 transition-all duration-300 ${
                    index === currentSizeChartIndex 
                      ? "bg-black" 
                      : "bg-black/40 hover:bg-black/60"
                  }`}
                  style={{ 
                    minWidth: '12px', 
                    minHeight: '12px',
                    borderRadius: '50%'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Vendor Details Component
  const VendorDetails = () => {
    if (!showVendorDetails) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-semibold">Vendor Information</h3>
            <button
              onClick={() => setShowVendorDetails(false)}
              className="p-1 hover:bg-gray-50"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-2">{product.vendor.name}</h4>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{product.vendor.rating}</span>
                  <span>({product.vendor.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{product.vendor.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Since {product.vendor.establishedYear}</span>
                </div>
              </div>
              <p className="text-gray-700">{product.vendor.description}</p>
            </div>

            {/* Specialties */}
            <div className="mb-6">
              <h5 className="font-semibold mb-2 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Specialties
              </h5>
              <div className="flex flex-wrap gap-2">
                {product.vendor.specialties.map((specialty, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-6">
              <h5 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Certifications
              </h5>
              <div className="flex flex-wrap gap-2">
                {product.vendor.certifications.map((cert, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold mb-2 flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Shipping Policy
                </h5>
                <p className="text-gray-700 text-sm">{product.vendor.shippingPolicy}</p>
              </div>

              <div>
                <h5 className="font-semibold mb-2 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Return Policy
                </h5>
                <p className="text-gray-700 text-sm">{product.vendor.returnPolicy}</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 pt-4 border-t">
              <h5 className="font-semibold mb-3">Contact Information</h5>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Email:</span> {product.vendor.contactInfo.email}</p>
                <p><span className="font-medium">Phone:</span> {product.vendor.contactInfo.phone}</p>
                <p><span className="font-medium">Website:</span> {product.vendor.contactInfo.website}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Handle case where product data isn't loaded yet
  if (!product) {
    return <div>Loading product details...</div>
  }

  // Format price for display
  const formattedPrice = product.price
  
  // Determine if product has a badge
  const productBadge = product.category || ""

  return (
    <div className="bg-white min-h-screen w-full text-black" ref={productRef}>
      {/* Mobile/Tablet View (below 1400px) */}
      {isMobile ? (
        <div className="px-4 pt-4 pb-8 max-w-6xl mx-auto">
          {/* Image Section */}
          <div className="mb-4 relative">
            {isLoadingImages ? (
              <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
              </div>
            ) : (
              displayImages.length > 0 && (
                <>
                  <div 
                    className="w-full max-w-md mx-auto aspect-[3/4] relative overflow-hidden"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                  >
                    <img
                      ref={mainImageRef}
                      src={displayImages[currentImageIndex]?.url || "/placeholder.svg"}
                      alt={displayImages[currentImageIndex]?.alt || product.name}
                      className="w-full h-full object-contain absolute top-0 left-0 cursor-pointer"
                      onClick={() => openLightbox(currentImageIndex)}
                    />
                  </div>
                  
                  {/* Thumbnail strip for larger screens */}
                  <div className="hidden md:flex justify-center items-center space-x-2 mt-4 overflow-x-auto px-4">
                    {displayImages.map((image, index) => (
                      <div
                        key={index}
                        className={`w-16 h-16 lg:w-20 lg:h-20 border-2 ${
                          index === currentImageIndex ? "border-black" : "border-gray-200"
                        } cursor-pointer flex-shrink-0`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.alt || `Product view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Dots indicator for mobile */}
                  <div className="flex md:hidden justify-center items-center space-x-2 mt-4">
                    {displayImages.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? "bg-black scale-110" 
                            : "bg-black/40"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )
            )}
          </div>
  
          {/* Product Info Section */}
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1">{product.name}</h1>
            {product.material && (
              <div className="mb-2 text-sm md:text-base">{product.material}</div>
            )}
  
            <p className="text-2xl md:text-3xl font-bold mb-4 lg:mb-6">${formattedPrice}</p>
  
            {productBadge && (
              <div className="inline-block px-3 py-1 md:px-4 md:py-2 bg-white text-sm md:text-base font-medium mb-4 lg:mb-6 border border-gray-200 rounded-md">
                {productBadge}
              </div>
            )}

            {/* Vendor Info Button */}
            <div className="mb-4 lg:mb-6">
              <button
                onClick={() => setShowVendorDetails(true)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
              >
                <Star className="w-4 h-4" />
                <span>Sold by {product.vendor.name} ({product.vendor.rating} ⭐)</span>
              </button>
            </div>
  
            {/* Color Selection */}
            <div className="mb-4 lg:mb-6">
              <p className="font-medium mb-2 md:mb-3 text-base md:text-lg">
                COLOR {isColorSelected && <span className="ml-2 font-normal">{selectedColor}</span>}
              </p>
              <div className="flex gap-1.5 md:gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color._id}
                    className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full p-0 flex items-center justify-center transition-all ${
                      selectedColor === color.name ? "ring-2 ring-black" : ""
                    }`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => handleColorSelect(color.name)}
                    disabled={!color.isAvailable}
                  >
                  </button>
                ))}
              </div>
            </div>
  
            {/* Size Selection */}
            <div className="mb-4 lg:mb-6">
              <div className="flex justify-between items-center mb-2 md:mb-3">
                <p className="font-medium text-base md:text-lg">SIZE</p>
                <button 
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-gray-600 bg-white underline text-sm md:text-base"
                >
                  Size Chart
                </button>
              </div>
              <div className="flex gap-3 md:gap-4 flex-wrap">
                {product.sizes.map((size) => {
                  const sizeAvailable = isSizeAvailable(size.name);
                  const sizeStock = getSizeStock(size.name);
                  
                  return (
                    <button
                      key={size._id}
                      className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center border text-sm md:text-base ${
                        selectedSize === size.name 
                          ? "border-black bg-white text-black"
                          : "border-gray-300 bg-white text-black"
                      } ${
                        isColorSelected && (!sizeAvailable || sizeStock === 0)
                          ? "opacity-60 cursor-not-allowed" 
                          : "hover:border-black"
                      } text-center relative rounded-md transition-all`}
                      onClick={() => sizeAvailable && sizeStock > 0 && setSelectedSize(size.name)}
                      disabled={isColorSelected && (!sizeAvailable || sizeStock === 0)}
                    >
                      {size.name}
                      {isColorSelected && sizeAvailable && sizeStock === 0 && (
                        <span className="absolute -bottom-6 left-0 right-0 text-xs text-red-500">
                          Out of stock
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

  
            {/* Quantity Selector */}
            <div className="mb-4 lg:mb-6">
              <p className="font-medium mb-2 md:mb-3 text-base md:text-lg">QUANTITY</p>
              <div className="flex items-center border border-gray-300 inline-flex rounded-md">
                <button 
                  onClick={decrementQuantity} 
                  className="px-3 py-2 md:px-4 md:py-3 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 md:px-6 md:py-3 min-w-[40px] text-center font-medium">
                  {quantity}
                </span>
                <button 
                  onClick={incrementQuantity} 
                  className="px-3 py-2 md:px-4 md:py-3 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
  
            {/* Validation Error */}
            {validationError && (
              <div className="mb-4 lg:mb-6 text-red-500 text-sm md:text-base p-3 bg-red-50 border border-red-200 rounded-md">
                {validationError}
              </div>
            )}
            
            {/* Success Message */}
            {successMessage && (
              <div 
                className="mb-4 lg:mb-6 bg-green-100 text-green-800 p-3 border border-green-200 rounded-md"
                ref={successMessageRef}
              >
                {successMessage}
              </div>
            )}
  
            {/* Add to Bag Button */}
            <button 
              className="w-full py-4 md:py-5 bg-black text-white font-medium mb-4 lg:mb-6 rounded-none hover:bg-gray-800 transition-colors text-base md:text-lg"
              onClick={validateAndAddToBag}
            >
              ADD TO BAG
            </button>
  
            {/* Product Info */}
            <p className="text-center text-gray-600 text-sm md:text-base mb-4 lg:mb-6">
              {product.material || ""}
            </p>
  
            <p className="text-center font-medium text-sm md:text-base lg:text-lg">
              FREE SHIPPING FOR $50+ ORDERS AND FREE RETURNS
            </p>
  
            {/* Product Description */}
            <div className="mt-8 lg:mt-12 border-t border-gray-200 pt-8 lg:pt-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 lg:mb-8">
                Product Description
              </h2>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed text-base md:text-lg">
                {product.description || "No description available."}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Desktop View (1400px and above) */
        <div className="mx-10 px-20 py-8 flex">
          {/* Thumbnail Gallery */}
          <div className="w-45 mr-6">
            {isLoadingImages ? (
              <div className="w-40 h-40 mb-4 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              </div>
            ) : (
              displayImages.slice(0, 7).map((image, index) => (
                <div
                  key={index}
                  className={`w-40 h-40 mb-4 border ${currentImageIndex === index ? "border-gray-300" : "border-gray-200"} cursor-pointer`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt || `Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            )}
          </div>
          
          {/* Main Image */}
          <div className="flex-1 relative mr-20 ml-10">
            {isLoadingImages ? (
              <div className="w-[95%] h-[80%] flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black"></div>
              </div>
            ) : (
              displayImages.length > 0 && (
                <div 
                  className="relative w-[95%] h-[80%] cursor-grab active:cursor-grabbing select-none"
                  onMouseDown={onMouseDown}
                  onMouseMove={onMouseMove}
                  onMouseUp={onMouseUp}
                  onMouseLeave={onMouseLeave}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  style={{ userSelect: 'none' }}
                >
                  <img
                    ref={mainImageRef}
                    src={displayImages[currentImageIndex]?.url || "/placeholder.svg"}
                    alt={displayImages[currentImageIndex]?.alt || product.name}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable={false}
                    onClick={(e) => {
                      if (!isDragging && Math.abs((mouseStart || 0) - e.clientX) < 5) {
                        openLightbox(currentImageIndex)
                      }
                    }}
                  />
                </div>
              )
            )}
          </div>
  
          {/* Product Details - Desktop */}
          <div className="w-1/3 pl-12">
            <h1 className="text-3xl font-bold mb-1">{product.name}</h1>
            {product.material && (
              <div className="mb-2 text-sm">{product.material}</div>
            )}
  
            <p className="text-2xl font-bold mb-8">${formattedPrice}</p>
  
            {productBadge && (
              <div className="inline-block px-4 py-1 bg-white text-sm font-medium mb-8 border border-gray-200 rounded-md">
                {productBadge}
              </div>
            )}

            {/* Vendor Info Button - Desktop */}
            <div className="mb-8">
              <button
                onClick={() => setShowVendorDetails(true)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
              >
                <Star className="w-4 h-4" />
                <span>Sold by {product.vendor.name} ({product.vendor.rating} ⭐)</span>
              </button>
            </div>
  
            <div className="mb-8">
              <p className="font-medium mb-2">
                COLOR {isColorSelected && <span className="ml-2 font-normal">{selectedColor}</span>}
              </p>
              <div className="flex gap-1.5">
                {product.colors.map((color) => (
                  <button
                    key={color._id}
                    className={`w-6 h-6 rounded-full p-0 flex items-center justify-center ${selectedColor === color.name ? "ring-1 ring-black" : ""}`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => handleColorSelect(color.name)}
                    disabled={!color.isAvailable}
                  >
                  </button>
                ))}
              </div>
            </div>
  
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <p className="font-medium">SIZE</p>
                <button 
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-gray-600 underline bg-white"
                >
                  Size Chart
                </button>
              </div>
              <div className="flex gap-4">
                {product.sizes.map((size) => {
                  const sizeAvailable = isSizeAvailable(size.name);
                  const sizeStock = getSizeStock(size.name);
                  
                  return (
                    <button
                      key={size._id}
                      className={`w-10 h-10 flex items-center justify-center border ${
                        selectedSize === size.name 
                          ? "border-black" 
                          : "border-gray-300"
                      } ${
                        isColorSelected && (!sizeAvailable || sizeStock === 0)
                          ? "opacity-60 cursor-not-allowed" 
                          : "bg-white text-black"
                      } text-center relative rounded-md`}
                      onClick={() => sizeAvailable && sizeStock > 0 && setSelectedSize(size.name)}
                      disabled={isColorSelected && (!sizeAvailable || sizeStock === 0)}
                    >
                      {size.name}
                      {isColorSelected && sizeAvailable && sizeStock === 0 && <span className="block text-xs">Out of stock</span>}
                    </button>
                  );
                })}
              </div>
            </div>
  
            {/* Quantity Selector */}
            <div className="mb-8">
              <p className="font-medium mb-3">QUANTITY</p>
              <div className="flex items-center border border-gray-300 inline-flex rounded-md">
                <button 
                  onClick={decrementQuantity} 
                  className="px-3 py-2 bg-white"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 min-w-[40px] text-center">{quantity}</span>
                <button 
                  onClick={incrementQuantity} 
                  className="px-3 py-2 bg-white"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
  
            {/* Validation Error */}
            {validationError && (
              <div className="mb-6 text-red-500 text-sm">{validationError}</div>
            )}
            
            {/* Success Message */}
            {successMessage && (
              <div 
                className="mb-6 bg-green-100 text-green-800 p-2 border border-green-200"
                ref={successMessageRef}
              >
                {successMessage}
              </div>
            )}
  
            <button 
              className="w-full py-4 bg-black text-white rounded-none font-medium text-sm mb-4"
              onClick={validateAndAddToBag}
            >
              ADD TO BAG
            </button>
  
            <p className="text-center text-gray-600 text-sm mb-6">{product.material || ""}</p>
  
            <p className="text-center text-sm font-medium">FREE SHIPPING FOR $50+ ORDERS AND FREE RETURNS</p>
  
            {/* Product Description */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold mb-6">Product Description</h2>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                {product.description || "No description available."}
              </div>
            </div>
          </div>
        </div>
      )}
  
      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex bg-white items-center justify-center" ref={lightboxRef}>
          <button className="absolute top-4 right-4 p-2 bg-white text-black rounded-full" onClick={closeLightbox}>
            <X size={50} />
          </button>
  
          <button
            className="absolute bg-white text-black left-4 rounded-full top-1/2 transform -translate-y-1/2 p-2"
            onClick={() => handleSlide('prev')}
          >
            <ChevronLeft size={50} />
          </button>
  
          {displayImages.length > 0 && (
            <img
              src={displayImages[currentImageIndex]?.url || "/placeholder.svg"}
              alt={displayImages[currentImageIndex]?.alt || product.name}
              className="lightbox-image max-h-[80vh] max-w-[80vw]"
            />
          )}
  
          <button
            className="absolute right-4 bg-white text-black rounded-full top-1/2 transform -translate-y-1/2 p-2"
            onClick={() => handleSlide('next')}
          >
            <ChevronRight size={50} />
          </button>
  
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {displayImages.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? "bg-black scale-110" 
                    : "bg-black/40"
                }`}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Product Reviews and Vendor Products */}
      <ProductReviews
        productId={product._id}
        productName={product.name}
        averageRating={4.6}
        totalReviews={sampleReviews.length}
        reviews={sampleReviews}
        vendorProducts={sampleVendorProducts}
      />
      
      <SizeChartModal />
      <VendorDetails />
    </div>
  )
}
