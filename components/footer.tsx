"use client"

import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)
  const logoRef = useRef(null)
  const newsletterRef = useRef(null)
  const productLinksRef = useRef(null)
  const categoryLinksRef = useRef(null)
  const socialLinksRef = useRef(null)
  const bottomBarRef = useRef(null)

  useEffect(() => {
    if (footerRef.current) {
      gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
      .fromTo(
        [logoRef.current, newsletterRef.current, productLinksRef.current, categoryLinksRef.current, socialLinksRef.current, bottomBarRef.current],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 },
        0
      );
    }
  }, [])

  return (
    <footer ref={footerRef} className="w-full bg-black text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
        {/* Logo and Newsletter */}
        <div className="flex flex-col items-start md:col-span-2 lg:col-span-1" ref={logoRef}>
          <div className="mb-4">
            <Image
              src="/logo-white.png"
              alt="daad Logo"
              width={200}
              height={100}
              className=" w-auto"
            />
          </div>
          <p className="text-white mb-4">
            Get newsletter update for upcoming product and best discount for all item
          </p>
          <div className="flex w-full max-w-sm" ref={newsletterRef}>
            <Input type="email" placeholder="Your Email" className="flex-grow rounded-r-none text-white" />
            <Button className="bg-white text-black rounded-l-none px-6 hover:bg-gray-600 transition-colors">
              Submit
            </Button>
          </div>
        </div>

        {/* Product Links */}
        <div className="flex flex-col items-start" ref={productLinksRef}>
          <h3 className="font-bold text-lg mb-4">Product</h3>
          <ul className="space-y-2 text-white">
            <li><Link href="#" className="hover:underline">Tshirt</Link></li>
            <li><Link href="#" className="hover:underline">Jacket</Link></li>
            <li><Link href="#" className="hover:underline">Shoes</Link></li>
            <li><Link href="#" className="hover:underline">Pants</Link></li>
            <li><Link href="#" className="hover:underline">Sunglasses</Link></li>
            <li><Link href="#" className="hover:underline">Tuxedo</Link></li>
          </ul>
        </div>

        {/* Categories Links */}
        <div className="flex flex-col items-start" ref={categoryLinksRef}>
          <h3 className="font-bold text-lg mb-4">Categories</h3>
          <ul className="space-y-2 text-white">
            <li><Link href="#" className="hover:underline">Man</Link></li>
            <li><Link href="#" className="hover:underline">Woman</Link></li>
            <li><Link href="#" className="hover:underline">Kids</Link></li>
            <li><Link href="#" className="hover:underline">Gift</Link></li>
            <li><Link href="#" className="hover:underline">New Arrival</Link></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-start" ref={socialLinksRef}>
          <h3 className="font-bold text-lg mb-4">Our Social Media</h3>
          <ul className="space-y-2 text-white">
            <li>
              <Link href="#" className="hover:underline flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                Instagram
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline flex items-center gap-2">
                <Facebook className="w-4 h-4" />
                Facebook
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline flex items-center gap-2">
                <Youtube className="w-4 h-4" />
                Youtube
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline flex items-center gap-2">
                <Twitter className="w-4 h-4" />
                Twitter
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div ref={bottomBarRef} className="bg-white text-black text-sm py-4 px-4 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center">
        <p className="mb-2 md:mb-0">© 2025 DaaD Production</p>
        <div className="flex space-x-4">
          <Link href="#" className="hover:underline">Terms & Conditions</Link>
          <Link href="#" className="hover:underline">Privacy Policy</Link>
          <Link href="#" className="hover:underline">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  )
}
