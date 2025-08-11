"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Star, StarHalf, User, Calendar, ThumbsUp, MessageCircle, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

interface Review {
  _id: string
  customerName: string
  rating: number
  date: string
  title: string
  comment: string
  helpful: number
  verified: boolean
  images?: string[]
}

interface VendorProduct {
  _id: string
  name: string
  price: number
  image: string
  image2: string
  rating: number
  reviewCount: number
}

interface ProductReviewsProps {
  productId: string
  productName: string
  averageRating: number
  totalReviews: number
  reviews: Review[]
  vendorProducts: VendorProduct[]
}

export default function ProductReviews({
  productId,
  productName,
  averageRating,
  totalReviews,
  reviews,
  vendorProducts
}: ProductReviewsProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent')
  const [showAllReviews, setShowAllReviews] = useState(false)
  
  const sectionRef = useRef<HTMLElement>(null)
  const ratingRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const vendorProductsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Rating section animation
      gsap.fromTo(
        ratingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ratingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )

      // Reviews section animation
      gsap.fromTo(
        reviewsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: reviewsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )

      // Vendor products animation
      gsap.fromTo(
        vendorProductsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: vendorProductsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  const getRatingText = (rating: number) => {
    if (rating >= 4.5) return "Excellent"
    if (rating >= 4.0) return "Very Good"
    if (rating >= 3.5) return "Good"
    if (rating >= 3.0) return "Average"
    return "Below Average"
  }

  const filteredReviews = reviews.filter(review => 
    selectedRating === null || review.rating === selectedRating
  )

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'helpful':
        return b.helpful - a.helpful
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 3)

  return (
    <section ref={sectionRef} className="w-full px-4 md:px-8 lg:px-12 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Product Rating Overview */}
        <div ref={ratingRef} className="bg-white rounded-xl p-6 md:p-8 mb-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Customer Reviews</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="text-4xl font-bold text-gray-900 mr-4">{averageRating.toFixed(1)}</div>
                <div>
                  <div className="flex items-center mb-2">
                    {renderStars(averageRating)}
                  </div>
                  <div className="text-sm text-gray-600">{getRatingText(averageRating)}</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">Based on {totalReviews} reviews</p>
              
              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => {
                  const count = reviews.filter(r => r.rating === rating).length
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
                  
                  return (
                    <div key={rating} className="flex items-center text-sm">
                      <span className="w-8 text-gray-600">{rating}★</span>
                      <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-12 text-gray-600 text-right">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-semibold mb-4">Filter by Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => {
                  const count = reviews.filter(r => r.rating === rating).length
                  const isSelected = selectedRating === rating
                  
                  return (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(isSelected ? null : rating)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">{rating}★</span>
                        <span className="text-gray-600">({count} reviews)</span>
                      </div>
                      {isSelected && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div ref={reviewsRef} className="bg-white rounded-xl p-6 md:p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h3 className="text-xl font-semibold mb-4 md:mb-0">
              All Reviews ({filteredReviews.length})
            </h3>
            
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'helpful' | 'rating')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {displayedReviews.map((review) => (
              <div key={review._id} className="border-b border-gray-100 pb-6 last:border-b-0">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">{review.customerName}</span>
                      {review.verified && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-gray-600 text-sm">{review.rating}/5</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600 text-sm flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">{review.comment}</p>
                    
                    {review.images && review.images.length > 0 && (
                      <div className="flex space-x-2 mb-3">
                        {review.images.map((image, index) => (
                          <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={image}
                              alt={`Review image ${index + 1}`}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {reviews.length > 3 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {showAllReviews ? 'Show Less' : `Show All ${reviews.length} Reviews`}
              </button>
            </div>
          )}
        </div>

        {/* Vendor Products Section */}
        <div ref={vendorProductsRef} className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
          <h3 className="text-xl font-semibold mb-6">More from this Vendor</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {vendorProducts.map((product) => (
              <Link 
                key={product._id} 
                href={`/product-detail?id=${product._id}`}
                className="group block"
              >
                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="relative w-full h-48 overflow-hidden">
                    {/* First Image */}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-t-lg transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Second Image - Slides in from left on hover */}
                    <Image
                      src={product.image2 || product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-t-lg absolute inset-0 transform translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-0"
                    />
                    
                    {/* Add to Cart Icon - Appears on hover */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors duration-200 cursor-pointer">
                        <ShoppingCart className="h-5 w-5 text-black" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h4>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">${product.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                        <span className="text-xs text-gray-400">({product.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
