"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ArrowLeft, Info, X } from 'lucide-react'
import Link from 'next/link'
import Header from "../../components/header"
import Footer from "../../components/footer"
import YouMayAlsoLike from "./components/YouMayAlsoLike"
import ScrollToTop from "../../components/scroll-to-top"

// Hardcoded cart products
const initialCartProducts = [
  {
    id: 1,
    name: "Loro Piana Polo Shirt",
    category: "Shirts",
    price: 45,
    quantity: 2,
    totalPrice: 90,
    colorName: "Navy Blue",
    size: "M",
    image: "/images/product-polo.png"
  },
  {
    id: 2,
    name: "White Chino Pants", 
    category: "Pants",
    price: 64,
    quantity: 1,
    totalPrice: 64,
    colorName: "White",
    size: "L",
    image: "/images/product-pants.jpg"
  },
  {
    id: 3,
    name: "Bidha Glasses",
    category: "Glasses", 
    price: 50,
    quantity: 1,
    totalPrice: 50,
    colorName: "Black",
    size: "OS",
    image: "/images/product-glasses.jpg"
  }
]

const Cart = () => {
  const [products, setProducts] = useState(initialCartProducts)
  const [shipping, setShipping] = useState(0)
  const [pointsAvailable, setPointsAvailable] = useState(250)
  const [pointsToUse, setPointsToUse] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Hardcoded as logged in
  const cartRef = useRef(null)

  const increaseQuantity = (id: number, colorName: string, size: string) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id && product.colorName === colorName && product.size === size) {
        const newQuantity = product.quantity + 1
        return {
          ...product,
          quantity: newQuantity,
          totalPrice: product.price * newQuantity
        }
      }
      return product
    })
    setProducts(updatedProducts)
  }

  const decreaseQuantity = (id: number, colorName: string, size: string) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id && product.colorName === colorName && product.size === size && product.quantity > 1) {
        const newQuantity = product.quantity - 1
        return {
          ...product,
          quantity: newQuantity,
          totalPrice: product.price * newQuantity
        }
      }
      return product
    })
    setProducts(updatedProducts)
  }

  const removeProduct = (id: number, colorName: string, size: string) => {
    const updatedProducts = products.filter(
      (product) => !(product.id === id && product.colorName === colorName && product.size === size)
    )
    setProducts(updatedProducts)
  }

  const calculateSubtotal = () => {
    return products.reduce((total, product) => total + product.totalPrice, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    return subtotal + shipping - (pointsToUse || 0)
  }
  
  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    setPointsToUse(Math.min(Math.max(0, value), pointsAvailable))
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cart-item", {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "all",
      })

      gsap.from(".summary-section", {
        x: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        clearProps: "all",
      })
    }, cartRef)

    return () => ctx.revert()
  }, [])

  const handleCheckout = () => {
    // Hardcoded checkout action
    console.log("Proceeding to checkout with items:", products)
    alert("Checkout functionality - will be connected to payment system later")
  }

  return (
    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden bg-[#f8f8ff]">
      {/* Navigation */}
      <div className="bg-white shadow-sm w-full">
        <Header />
        <div className="container mx-auto px-18 py-4">
          <div className="flex gap-4">
            <Link href="/" className="text-sm hover:underline">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/checkout" className="text-sm hover:underline">
              Checkout
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow w-full">
        <div className="container px-4 py-6 mx-auto">
          <div
            ref={cartRef}
            className="flex flex-col lg:flex-row max-w-6xl mx-auto bg-white rounded-lg shadow-md"
          >
            {/* Cart Items Section */}
            <div className="flex-1 p-4 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-black">Shopping Cart</h1>
                <span className="text-[#6b6b6b]">{products.length} items</span>
              </div>

              {products.length === 0 ? (
                <div className="border-t border-[#e5e5e5] py-12 text-center">
                  <div className="text-lg text-gray-600 mb-4">Your cart is empty</div>
                  <Link href="/" className="inline-block py-2 px-4 bg-black text-white rounded hover:bg-gray-800">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="border-t border-[#e5e5e5]">
                  {products.map((product) => (
                    <div
                      key={`${product.id}-${product.colorName}-${product.size}`}
                      className="cart-item py-4 md:py-6 flex flex-col sm:flex-row items-start sm:items-center border-b border-[#e5e5e5]"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded bg-[#f0f0f0]">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="ml-0 sm:ml-4 mt-2 sm:mt-0 flex-1">
                        <div className="text-[#6b6b6b] truncate">{product.category}</div>
                        <div className="text-black font-medium truncate">{product.name}</div>
                        <div className="text-sm text-gray-600">
                          Color: {product.colorName} | Size: {product.size}
                        </div>
                      </div>

                      <div className="flex items-center mt-2 sm:mt-0">
                        <button
                          onClick={() => decreaseQuantity(product.id, product.colorName, product.size)}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-[#d1d1d1] rounded text-black hover:bg-gray-50 text-xl font-bold"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <input
                          type="text"
                          value={product.quantity}
                          readOnly
                          className="mx-2 w-10 h-8 text-center bg-white border border-[#d1d1d1] rounded text-black"
                          aria-label="Quantity"
                        />

                        <button
                          onClick={() => increaseQuantity(product.id, product.colorName, product.size)}
                          className="w-8 h-8 flex items-center justify-center bg-white text-black border border-[#d1d1d1] rounded hover:bg-gray-50 text-xl font-bold"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="ml-auto sm:ml-6 w-24 text-right mt-2 sm:mt-0 font-medium text-black">
                        ${product.totalPrice.toFixed(2)}
                      </div>

                      <button
                        onClick={() => removeProduct(product.id, product.colorName, product.size)}
                        className="ml-2 sm:ml-6 bg-white text-black hover:bg-gray-50 p-1 rounded"
                        aria-label="Remove item"
                      >
                        <X size={20} stroke="black" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <Link href="/" className="flex items-center text-black no-underline hover:underline">
                  <ArrowLeft className="h-5 w-5 mr-2" stroke="black" />
                  Back to shop
                </Link>
              </div>

              {/* Show YouMayAlsoLike only when cart is not empty */}
              {products.length > 0 && <YouMayAlsoLike />}
            </div>

            {/* Summary Section */}
            <div className="summary-section w-full lg:w-1/3 p-4 md:p-8 bg-[#f0f0f0]">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-black">Summary</h2>

              <div className="border-t border-[#d1d1d1] pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-[#333333] font-medium">ITEMS {products.length}</span>
                  <span className="text-black font-medium">${calculateSubtotal().toFixed(2)}</span>
                </div>
                
                {/* Shipping costs if any */}
                {shipping > 0 && (
                  <div className="flex justify-between mb-2">
                    <span className="text-[#333333]">Shipping</span>
                    <span className="text-black">${shipping.toFixed(2)}</span>
                  </div>
                )}
                
                
                
               
              </div>

              <div className="border-t border-[#d1d1d1] pt-4 mt-4">
                <div className="flex justify-between mb-6">
                  <span className="text-[#333333] font-medium">TOTAL PRICE</span>
                  <span className="text-black font-bold">${calculateTotal().toFixed(2)}</span>
                </div>

                {products.length > 0 ? (
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 bg-black text-white rounded font-semibold hover:bg-gray-800 transition-colors"
                    aria-label="Proceed to checkout"
                    disabled={isLoading}
                  >
                    {isLoading ? 'CALCULATING...' : 'CHECKOUT'}
                  </button>
                ) : (
                  <button
                    className="w-full py-3 bg-gray-400 text-white rounded font-semibold cursor-not-allowed"
                    disabled
                  >
                    CHECKOUT
                  </button>
                )}
                
                {/* Show how many points will be earned */}
               
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Cart
