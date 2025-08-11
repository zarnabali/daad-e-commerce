"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    id: 1,
    name: "MAN",
    image: "/images/category-man.jpg", 
    href:"/men"// Using the provided web image
  },
  {
    id: 2,
    name: "WOMAN",
    image: "/images/category-woman.jpg",
    href: "/womens" // Placeholder for woman
  },
  {
    id: 3,
    name: "KIDS",
    image: "/images/category-kids.jpg", 
    href: "/kids" // Placeholder for kids
  },
]

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null)
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        categoryRefs.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )
    }
  }, [])

  return (
    <section ref={sectionRef} className="w-full px-4 md:px-8 lg:px-12 pt-10 pb-16 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={category.href}
            className="block"
          >
            <div
              ref={(el) => {
                categoryRefs.current[index] = el
              }}
              className="relative w-full h-96 rounded-xl overflow-hidden flex items-end p-6 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-black/20 hover:scale-105 cursor-pointer group"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                layout="fill"
                objectFit="cover"
                quality={100}
                className="rounded-xl z-0 transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:shadow-black/30"
              />
              <div className="relative z-10 flex flex-col items-start text-white">
                <h3 className="text-4xl font-bold mb-4">{category.name}</h3>
                <Button className="bg-white text-black px-6 py-2 rounded-full text-base font-semibold hover:bg-gray-200 transition-colors">
                  See Details
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
