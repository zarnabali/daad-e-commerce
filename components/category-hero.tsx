"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

type CategoryHeroProps = {
  title?: string
  description?: string
  buttonText?: string
  imageSrc?: string
}

export default function CategoryHero({
  title = "MEN'S COLLECTION",
  description = "Discover refined essentials crafted for comfort and statement-making style.",
  buttonText = "Shop Now",
  imageSrc = "/images/men-hero.png",
}: CategoryHeroProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const paragraphRef = useRef<HTMLParagraphElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

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
    <section className="relative rounded-3xl mx-4 md:mx-10 h-[520px] md:h-[600px] overflow-hidden">
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={title}
        fill
        sizes="100vw"
        className="object-cover z-0"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 flex flex-col justify-end p-6 md:p-12 text-white">
        <h1 ref={headingRef} className="text-3xl md:text-6xl font-bold mb-2 md:mb-4 max-w-4xl">
          {title}
        </h1>

        {/* Row 2: left description, right button */}
        <div className="flex w-full items-end justify-between gap-4">
          <p ref={paragraphRef} className="text-sm md:text-lg max-w-2xl">
            {description}
          </p>
          <Button
            ref={buttonRef as any}
            className="bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  )
}
