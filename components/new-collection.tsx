"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ShoppingCart } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    id: 1,
    name: "Loro Piana",
    description: "Slim-Fit Striped Silk and Linen-Blend Polo Shirt",
    price: "$45",
    image: "/images/product-polo.png",
    image2: "/images/product-polo.png", // Second image for hover effect
  },
  {
    id: 2,
    name: "White Pants",
    description: "Slim Fit man pants",
    price: "$90",
    image: "/images/product-pants.jpg",
    image2: "/images/product-pants.jpg", // Second image for hover effect
  },
  {
    id: 3,
    name: "Bidha Glasses",
    description: "Black Glasses with luxury finishing",
    price: "$50",
    image: "/images/product-glasses.jpg",
    image2: "/images/product-glasses-2.jpg", // Second image for hover effect
  },
  {
    id: 4,
    name: "Brown Bomber",
    description: "Luxury unisex bomber jacket",
    price: "$52",
    image: "/images/product-bomber.png",
    image2: "/images/product-bomber.png", // Second image for hover effect
  },
  {
    id: 5,
    name: "Leather Shoes Jack",
    description: "Man leather shoes",
    price: "$89",
    image: "/images/product-boots.jpg",
    image2: "/images/product-boots-2.jpg", // Second image for hover effect
  },
  {
    id: 6,
    name: "Grey T-shirt",
    description: "Unisex grey tshirt",
    price: "$21",
    image: "/images/product-tshirt.png",
    image2: "/images/product-tshirt.png", // Second image for hover effect
  },
]

export default function NewCollection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const productRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (sectionRef.current) {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // When the top of the section is 80% down from the top of the viewport
          toggleActions: "play none none none", // Play animation once when entering
        },
      })
      .fromTo(
        [titleRef.current, descriptionRef.current],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 },
        0 // Start at the beginning of the timeline
      )
      .fromTo(
        productRefs.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15 },
        0.3 // Start product animations slightly after title/description
      );
    }
  }, [])

  return (
    <section ref={sectionRef} className="w-full  px-4 md:px-8 lg:px-12 py-16">
      <div className="text-center mb-12">
        <h2 ref={titleRef} className="text-4xl font-bold mb-4">
          NEW COLLECTION
        </h2>
        <p ref={descriptionRef} className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our latest collection, where classic and contemporary styles converge in perfect harmony.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={product.id}
            ref={(el) => {
              productRefs.current[index] = el
            }}
            className="bg-white rounded-xl overflow-hidden flex flex-col group cursor-pointer"
          >
            <div className="relative w-full h-64 lg:h-96 overflow-hidden">
              {/* First Image */}
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Second Image - Slides in from left on hover */}
              <Image
                src={product.image2 || product.image || "/placeholder.svg"}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl absolute inset-0 transform translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-0"
              />
              
              {/* Add to Cart Icon - Appears on hover */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors duration-200 cursor-pointer">
                  <ShoppingCart className="h-5 w-5 text-black" />
                </div>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2 flex-grow">{product.description}</p>
              <p className="text-lg font-bold">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
