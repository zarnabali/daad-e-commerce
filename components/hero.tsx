"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Hero() {
  const headingRef = useRef(null)
  const paragraphRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
    )
    gsap.fromTo(
      paragraphRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" },
    )
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" },
    )
  }, [])

  return (
    <section className="relative rounded-3xl mx-10 h-[600px] overflow-hidden">
      <Image
        src="/hero2.jpg"
        alt="DaaD Spring Collection"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 flex flex-col justify-end p-8 md:p-12 text-white">
        <h1 ref={headingRef} className="text-4xl md:text-6xl font-bold mb-2 md:mb-4 ">
          daad SPRING COLLECTION
        </h1>
        
        {/* New container for description and button */}
        <div className="flex flex-col md:flex-row justify-between items-end w-full">
          <p ref={paragraphRef} className="text-base md:text-lg max-w-xl mb-6 md:mb-0">
            Find out our best spring collection. Offering our best quality product in a DaaD Spring Collection.
          </p>
          <Button
            ref={buttonRef}
            className="bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded-full text-base md:text-lg font-semibold w-fit hover:bg-gray-200 transition-colors mt-4 md:mt-0"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </section>
  )
}
