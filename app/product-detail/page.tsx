"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "../../components/header"
import Footer from "../../components/footer"
import ProductDetail from "./components/detail-product"

// Product type definition
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

// Hardcoded product data
const hardcodedProduct: Product = {
  _id: "product-1",
  name: "Loro Piana Polo Shirt",
  price: 45,
  material: "100% Premium Cotton",
  category: "Shirts",
  description: `Experience luxury with our premium polo shirt crafted from the finest materials.

This sophisticated piece features:
• Premium 100% cotton construction for ultimate comfort
• Classic polo collar with mother-of-pearl buttons
• Tailored fit that flatters all body types
• Reinforced seams for durability
• Easy care - machine washable

Perfect for both casual and semi-formal occasions, this polo shirt embodies timeless elegance while providing the comfort you need throughout your day.

Care Instructions:
- Machine wash cold with like colors
- Tumble dry low heat
- Iron on medium heat if needed
- Do not bleach`,
  
  colors: [
    { _id: "color-1", name: "Navy Blue", code: "#1e3a8a", isAvailable: true },
    { _id: "color-2", name: "White", code: "#ffffff", isAvailable: true },
    { _id: "color-3", name: "Black", code: "#000000", isAvailable: true },
    { _id: "color-4", name: "Gray", code: "#6b7280", isAvailable: true }
  ],
  
  sizes: [
    { _id: "size-1", name: "XS", isAvailable: true },
    { _id: "size-2", name: "S", isAvailable: true },
    { _id: "size-3", name: "M", isAvailable: true },
    { _id: "size-4", name: "L", isAvailable: true },
    { _id: "size-5", name: "XL", isAvailable: true },
    { _id: "size-6", name: "XXL", isAvailable: true }
  ],
  
  defaultImages: [
    { url: "/images/product-polo.png", alt: "Polo Shirt Front View" },
    { url: "/images/mens1.jpg", alt: "Polo Shirt Side View" },
    { url: "/images/mens2.jpg", alt: "Polo Shirt Back View" },
    { url: "/images/mens3.jpg", alt: "Polo Shirt Detail View" }
  ],
  
  colorImages: [
    {
      color: "Navy Blue",
      images: [
        { url: "/images/product-polo.png", alt: "Navy Blue Polo Front" },
        { url: "/images/mens1.jpg", alt: "Navy Blue Polo Side" },
        { url: "/images/mens2.jpg", alt: "Navy Blue Polo Back" }
      ]
    },
    {
      color: "White",
      images: [
        { url: "/images/product-tshirt.png", alt: "White Polo Front" },
        { url: "/images/mens1.jpg", alt: "White Polo Side" },
        { url: "/images/mens3.jpg", alt: "White Polo Detail" }
      ]
    },
    {
      color: "Black",
      images: [
        { url: "/images/product-bomber.png", alt: "Black Polo Front" },
        { url: "/images/mens2.jpg", alt: "Black Polo Side" },
        { url: "/images/mens1.jpg", alt: "Black Polo Back" }
      ]
    }
  ],
  
  inventory: [
    // Navy Blue inventory
    { color: "Navy Blue", size: "XS", stock: 5 },
    { color: "Navy Blue", size: "S", stock: 8 },
    { color: "Navy Blue", size: "M", stock: 12 },
    { color: "Navy Blue", size: "L", stock: 10 },
    { color: "Navy Blue", size: "XL", stock: 6 },
    { color: "Navy Blue", size: "XXL", stock: 3 },
    
    // White inventory
    { color: "White", size: "XS", stock: 4 },
    { color: "White", size: "S", stock: 7 },
    { color: "White", size: "M", stock: 15 },
    { color: "White", size: "L", stock: 12 },
    { color: "White", size: "XL", stock: 8 },
    { color: "White", size: "XXL", stock: 0 }, // Out of stock
    
    // Black inventory
    { color: "Black", size: "XS", stock: 3 },
    { color: "Black", size: "S", stock: 9 },
    { color: "Black", size: "M", stock: 11 },
    { color: "Black", size: "L", stock: 14 },
    { color: "Black", size: "XL", stock: 7 },
    { color: "Black", size: "XXL", stock: 4 },
    
    // Gray inventory
    { color: "Gray", size: "XS", stock: 2 },
    { color: "Gray", size: "S", stock: 6 },
    { color: "Gray", size: "M", stock: 9 },
    { color: "Gray", size: "L", stock: 8 },
    { color: "Gray", size: "XL", stock: 5 },
    { color: "Gray", size: "XXL", stock: 0 } // Out of stock
  ],
  
  // Vendor information
  vendor: {
    name: "Premium Clothing Co.",
    description: "Specializing in luxury menswear since 1985, Premium Clothing Co. brings you the finest quality garments crafted with attention to detail and superior materials.",
    rating: 4.8,
    totalReviews: 1247,
    location: "New York, USA",
    establishedYear: 1985,
    specialties: ["Premium Cotton", "Luxury Menswear", "Tailored Fit"],
    certifications: ["GOTS Certified", "Fair Trade", "Sustainable Manufacturing"],
    shippingPolicy: "Free shipping on orders over $50. Express delivery available.",
    returnPolicy: "30-day hassle-free returns. Items must be in original condition.",
    contactInfo: {
      email: "support@premiumclothing.com",
      phone: "+1 (555) 123-4567",
      website: "www.premiumclothing.com"
    }
  }
}

export default function ProductDetailPage() {
  const searchParams = useSearchParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setProduct(hardcodedProduct)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </div>
  )
}
