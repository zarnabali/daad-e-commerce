"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

gsap.registerPlugin(ScrollTrigger)

type Product = {
  id: number
  title: string
  subtitle: string
  price: string
  priceValue: number
  image: string
  image2: string
  type: "Shirts" | "Pants" | "Shoes" | "Glasses"
}

type CatalogProps = {
  heading?: string
  products?: Product[]
}

const defaultProducts: Product[] = [
  { id: 1, title: "Loro Piana", subtitle: "Slim-Fit Silk & Linen Polo Shirt", price: "$45", priceValue: 45, image: "/images/product-polo.png", image2: "/images/product-polo.png", type: "Shirts" },
  { id: 2, title: "White Pants", subtitle: "Slim Fit man pants", price: "$90", priceValue: 90, image: "/images/product-pants.jpg", image2: "/images/product-pants.jpg", type: "Pants" },
  { id: 3, title: "Bidha Glasses", subtitle: "Black glasses with luxury finishing", price: "$50", priceValue: 50, image: "/images/product-glasses.jpg", image2: "/images/product-glasses-2.jpg", type: "Glasses" },
  { id: 4, title: "Leather Shoes Jack", subtitle: "Men leather shoes", price: "$89", priceValue: 89, image: "/images/product-boots.jpg", image2: "/images/product-boots-2.jpg", type: "Shoes" },
  { id: 5, title: "Grey T-shirt", subtitle: "Unisex grey t-shirt", price: "$21", priceValue: 21, image: "/images/product-tshirt.png", image2: "/images/product-tshirt.png", type: "Shirts" },
  { id: 6, title: "Brown Bomber", subtitle: "Luxury unisex bomber jacket", price: "$52", priceValue: 52, image: "/images/product-bomber.png", image2: "/images/product-bomber.png", type: "Shirts" },
  { id: 7, title: "Chino Pants", subtitle: "Stretch cotton chinos", price: "$64", priceValue: 64, image: "/images/product-glasses.jpg", image2: "/images/product-glasses-2.jpg", type: "Pants" },
  { id: 8, title: "Aviator Shades", subtitle: "Premium metal frame", price: "$72", priceValue: 72, image: "/images/product-glasses.jpg", image2: "/images/product-glasses-2.jpg", type: "Glasses" },
  { id: 9, title: "Derby Shoes", subtitle: "Full-grain leather", price: "$120", priceValue: 120, image: "/images/product-boots.jpg", image2: "/images/product-boots-2.jpg", type: "Shoes" },
  { id: 10, title: "Oxford Shirt", subtitle: "Classic cotton", price: "$40", priceValue: 40, image: "/images/product-glasses.jpg", image2: "/images/product-glasses-2.jpg", type: "Shirts" },
  { id: 11, title: "Lounge Pants", subtitle: "Soft jersey", price: "$38", priceValue: 38, image: "/images/product-pants.jpg", image2: "/images/product-glasses.jpg", type: "Pants" },
  { id: 12, title: "Square Frame", subtitle: "Acetate frame", price: "$58", priceValue: 58, image: "/images/product-glasses.jpg", image2: "/images/product-glasses-2.jpg", type: "Glasses" },
]

export default function Catalog({
  heading = "Products from Men's collection",
  products = defaultProducts,
}: CatalogProps) {
  const [categoryFilter, setCategoryFilter] = useState<"All" | Product["type"]>("All")
  const [priceFilter, setPriceFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("default")

  const filtered = useMemo(() => {
    let result = [...products]

    // Apply category filter
    if (categoryFilter !== "All") {
      result = result.filter((p) => p.type === categoryFilter)
    }

    // Apply price filter
    if (priceFilter !== "all") {
      switch (priceFilter) {
        case "under-25":
          result = result.filter((p) => p.priceValue < 25)
          break
        case "25-50":
          result = result.filter((p) => p.priceValue >= 25 && p.priceValue <= 50)
          break
        case "50-75":
          result = result.filter((p) => p.priceValue >= 50 && p.priceValue <= 75)
          break
        case "75-100":
          result = result.filter((p) => p.priceValue >= 75 && p.priceValue <= 100)
          break
        case "over-100":
          result = result.filter((p) => p.priceValue > 100)
          break
      }
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.priceValue - b.priceValue)
        break
      case "price-high":
        result.sort((a, b) => b.priceValue - a.priceValue)
        break
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        // Keep default order
        break
    }

    return result
  }, [categoryFilter, priceFilter, sortBy, products])

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const filtersRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [titleRef.current, filtersRef.current],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )

      const items = cardsRef.current?.querySelectorAll(".catalog-card")
      if (items && items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: cardsRef.current!,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const clearAllFilters = () => {
    setCategoryFilter("All")
    setPriceFilter("all")
    setSortBy("default")
  }

  return (
    <section ref={sectionRef as any} className="w-full px-4 md:px-8 lg:px-12 py-12 md:py-16">
      <h2 ref={titleRef} className="text-2xl md:text-3xl font-bold mb-6">
        {heading}
      </h2>

      <div ref={filtersRef} className="flex flex-wrap gap-3 md:gap-4 mb-8 items-center">
        {/* Category Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600">Category</label>
          <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as "All" | Product["type"])}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Shirts">Shirts</SelectItem>
              <SelectItem value="Pants">Pants</SelectItem>
              <SelectItem value="Shoes">Shoes</SelectItem>
              <SelectItem value="Glasses">Glasses</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600">Price Range</label>
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="under-25">Under $25</SelectItem>
              <SelectItem value="25-50">$25 - $50</SelectItem>
              <SelectItem value="50-75">$50 - $75</SelectItem>
              <SelectItem value="75-100">$75 - $100</SelectItem>
              <SelectItem value="over-100">Over $100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600">Sort By</label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        <div className="flex flex-col gap-1">
          <div className="text-xs">&nbsp;</div>
          <Button variant="outline" onClick={clearAllFilters} className="text-sm">
            Clear All
          </Button>
        </div>

        {/* Results count */}
        <div className="flex flex-col gap-1 ml-auto">
          <div className="text-xs">&nbsp;</div>
          <p className="text-sm text-gray-600">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
          </p>
        </div>
      </div>

      <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {filtered.map((product) => (
          <div key={product.id} className="catalog-card bg-white rounded-xl overflow-hidden flex flex-col group cursor-pointer">
            <div className="relative w-full h-44 md:h-64 lg:h-72 overflow-hidden">
              {/* First Image */}
              <Image
                src={product.image || "/placeholder.svg?height=400&width=400&query=ecommerce%20product"}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover rounded-t-xl transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Second Image - Slides in from left on hover */}
              <Image
                src={product.image2 || product.image || "/placeholder.svg?height=400&width=400&query=ecommerce%20product"}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover rounded-t-xl absolute inset-0 transform translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-0"
              />
              
              {/* Add to Cart Icon - Appears on hover */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors duration-200 cursor-pointer">
                  <ShoppingCart className="h-5 w-5 text-black" />
                </div>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-base md:text-lg font-semibold mb-1">{product.title}</h3>
              <p className="text-xs md:text-sm text-gray-500 mb-2 flex-grow">{product.subtitle}</p>
              <p className="text-sm md:text-lg font-bold">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
