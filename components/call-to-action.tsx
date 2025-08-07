
"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function CallToAction() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (sectionRef.current) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })
        .fromTo(
          [titleRef.current, descriptionRef.current, buttonRef.current],
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 },
          0
        );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 md:px-8 lg:px-12 py-16 bg-black relative"
    >
      {/* Main Content */}
      <div className="relative z-10">
        <div className="relative w-full h-64 md:h-105 rounded-xl overflow-hidden mb-12">
          <Image
            src="/cta.jpg"
            alt="Couple in wedding attire"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="rounded-xl"
          />
        </div>
        <div className="text-center">
          <h2
            ref={titleRef}
            className="text-4xl font-bold mb-4 text-[#C2B280]"
          >
             STEP INTO STYLE, CRAFTED FOR THE DESERT LIFE
          </h2>
          <p
            ref={descriptionRef}
            className="text-lg text-[#C2B280] max-w-2xl mx-auto mb-8"
          >
            From sun-drenched dunes to cool desert nights — shop clothing made for your journey.
            Breathable fabrics. Timeless designs. Arabian elegance
          </p>
          <Button
            ref={buttonRef}
            className="bg-black text-black px-8 py-3 bg-[#C2B280] rounded-full text-base font-semibold hover:bg-gray-800 transition-colors"
          >
            Wear Your Culture, With Comfort
          </Button>
        </div>
      </div>
    </section>
  );
}