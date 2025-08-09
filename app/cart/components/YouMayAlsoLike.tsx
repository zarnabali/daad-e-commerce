"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

// Hardcoded recommended products
const recommendedProducts = [
  {
    _id: "rec1",
    name: "Grey T-shirt", 
    category: "Shirts",
    price: 21,
    defaultImages: [{ url: "/images/product-tshirt.png" }],
    colors: [{ name: "Grey" }]
  },
  {
    _id: "rec2", 
    name: "Brown Bomber Jacket",
    category: "Jackets", 
    price: 52,
    defaultImages: [{ url: "/images/product-bomber.png" }],
    colors: [{ name: "Brown" }]
  },
  {
    _id: "rec3",
    name: "Derby Shoes",
    category: "Shoes",
    price: 120, 
    defaultImages: [{ url: "/images/product-boots.png" }],
    colors: [{ name: "Black" }]
  },
  {
    _id: "rec4",
    name: "Aviator Sunglasses", 
    category: "Glasses",
    price: 72,
    defaultImages: [{ url: "/images/product-glasses-2.jpg" }],
    colors: [{ name: "Gold" }]
  }
]

const YouMayAlsoLike = () => {
  const [products, setProducts] = useState(recommendedProducts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleViewProduct = (product: any) => {
    const defaultColor = product.colors[0]
    // For now, just log the navigation - will be connected later
    console.log(`Navigate to: /product/${product._id}?color=${defaultColor.name}`)
    alert(`Product: ${product.name} - Will navigate to product detail page`)
  }

  if (loading) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-medium mb-6 text-black">You May Also Like</h3>
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((index) => (
            <div key={index} className="border border-gray-200 rounded p-4 animate-pulse">
              <div className="flex items-start gap-4">
                <div className="w-20 h-24 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Don't show the section if there are no recommended products
  if (products.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-medium mb-6 text-black">You May Also Like</h3>
      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border border-gray-200 rounded p-4">
            <div className="flex items-start gap-4">
              <div className="w-20 h-24 bg-gray-100 rounded overflow-hidden">
                <img 
                  src={product.defaultImages[0].url || "/placeholder.svg"} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-black">{product.name}</h4>
                <p className="text-xs text-gray-600">Category: {product.category}</p>
                <p className="text-sm font-medium mt-1 text-black">${product.price.toFixed(2)}</p>
              </div>
            </div>
            <button 
              onClick={() => handleViewProduct(product)}
              className="w-full border border-black bg-black text-white hover:bg-gray-800 transition-colors rounded-none py-2 mt-4 text-sm font-medium"
            >
              SEE PRODUCT
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default YouMayAlsoLike
