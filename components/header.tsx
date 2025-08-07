"use client"

import Link from "next/link"
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full ">
      {/* Top Announcement Bar - Full Width, No Padding */}
      <div className="bg-black text-white text-center text-sm w-full py-2">
        Get 25% Off This Summer Sale. Grab It Fast!! <span className="font-bold">15H : 45M : 37S</span>
      </div>

      {/* Main Navigation - Full Width */}
      <nav className="relative w-full bg-white h-16 px-10 flex items-center justify-between">
        {/* Mobile Menu Trigger (Hamburger) */}
        <div className="md:hidden flex items-center pl-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px] p-4">
              <div className="flex justify-end mb-4">
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <ul className="flex flex-col gap-4 text-lg font-medium">
                <li>
                  <Link href="#" className="hover:underline underline-offset-4" onClick={() => setIsOpen(false)}>
                    Men
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline underline-offset-4" onClick={() => setIsOpen(false)}>
                    Woman
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline underline-offset-4" onClick={() => setIsOpen(false)}>
                    Kids
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline underline-offset-4" onClick={() => setIsOpen(false)}>
                    New & Featured
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline underline-offset-4" onClick={() => setIsOpen(false)}>
                    Gift
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="#" className="hover:underline underline-offset-4" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium pl-8">
          <li>
            <Link href="#" className="hover:underline underline-offset-4">
              Men
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline underline-offset-4">
              Woman
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline underline-offset-4">
              Kids
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline underline-offset-4">
              New & Featured
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline underline-offset-4">
              Gift
            </Link>
          </li>
        </ul>

        {/* Logo - Centered for both mobile and desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 z-10">
          <Image 
            src="/logo2.png" 
            alt="Logo" 
            width={170} 
            height={60} 
            priority 
            className="w-24 h-auto md:w-[170px]"
          />
        </div>

        {/* Right Icons and Login */}
        <div className="flex items-center gap-6 pr-4 md:pr-8">
          <button aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="Shopping Bag">
            <ShoppingBag className="h-5 w-5" />
          </button>
          <Link href="#" className="hidden md:block text-sm font-medium hover:underline underline-offset-4">
            Login
          </Link>
        </div>
      </nav>
    </header>
  )
}
