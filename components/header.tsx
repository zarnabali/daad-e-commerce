"use client"

import Link from "next/link"
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNavSticky, setIsNavSticky] = useState(false)

  // Handle escape key to close search
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isSearchOpen])

  // Handle scroll to make navigation sticky
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Make nav sticky after scrolling past the announcement bar (approximately 40px)
      setIsNavSticky(scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="w-full">
      {/* Top Announcement Bar - Full Width, No Padding */}
      <div className="bg-black text-white text-center text-sm w-full py-2">
        Welcome to Daad
      </div>

      {/* Main Navigation - Full Width */}
      <nav className={`w-full bg-white h-16 px-10 flex items-center justify-between transition-all duration-300 ${
        isNavSticky ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : 'relative'
      }`}>
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
                  <Link href="/men" className="hover:underline underline-offset-4" onClick={() => setIsOpen(false)}>
                    Men
                  </Link>
                </li>
                <li>
                  <Link href="/womens" className="hover:underline underline-offset-4" onClick={() => setIsOpen(false)}>
                    Woman
                  </Link>
                </li>
                <li>
                  <Link href="/kids" className="hover:underline underline-offset-4" onClick={() => setIsOpen(false)}>
                    Kids
                  </Link>
                </li>
                <li>
                  <Link href="/vendors" className="hover:underline underline-offset-4" onClick={() => setIsOpen(false)}>
                    Vendor Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline underline-offset-4" onClick={() => setIsOpen(false)}>
                    About Us
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/login" className="hover:underline underline-offset-4" onClick={() => setIsOpen(false)}>
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
            <Link href="/men" className="hover:underline underline-offset-4">
              Men
            </Link>
          </li>
          <li>
            <Link href="/womens" className="hover:underline underline-offset-4">
              Woman
            </Link>
          </li>
          <li>
            <Link href="/kids" className="hover:underline underline-offset-4">
              Kids
            </Link>
          </li>
          <li>
            <Link href="/vendors" className="hover:underline underline-offset-4">
              Vendor Dashboard
            </Link>
          </li>
          <li>
            <Link href="/about-us" className="hover:underline underline-offset-4">
              About Us
            </Link>
          </li>
        </ul>

        {/* Logo - Centered for both mobile and desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 z-10">
          <Link href="/">
            <Image 
              src="/logo2.png" 
              alt="Logo" 
              width={170} 
              height={60} 
              priority 
              className="w-24 h-auto md:w-[170px]"
            />
          </Link>
        </div>

        {/* Right Icons and Login */}
        <div className="flex items-center gap-6 pr-4 md:pr-8">
          <button 
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:opacity-70 transition-opacity"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link href="/cart" aria-label="Shopping Bag" className="hover:opacity-70 transition-opacity">
            <ShoppingBag className="h-5 w-5" />
          </Link>
          <Link href="/login" className="hidden md:block text-sm font-medium hover:underline underline-offset-4">
            Login
          </Link>
        </div>
      </nav>

      {/* Search Bar - Appears below navigation when opened */}
      {isSearchOpen && (
        <div className={`w-full bg-white border-t border-gray-200 px-4 py-3 md:px-10 md:py-4 ${
          isNavSticky ? 'fixed top-16 left-0 right-0 z-40 shadow-md' : 'relative'
        }`}>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full h-10 md:h-12 pl-4 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm md:text-base"
                autoFocus
              />
              <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
            
            {/* Search Suggestions (Optional) */}
            <div className="mt-3 md:mt-4">
              <p className="text-xs md:text-sm text-gray-500 mb-2">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs md:text-sm text-gray-700 transition-colors">
                  T-shirts
                </button>
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs md:text-sm text-gray-700 transition-colors">
                  Jeans
                </button>
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs md:text-sm text-gray-700 transition-colors">
                  Sneakers
                </button>
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs md:text-sm text-gray-700 transition-colors">
                  Dresses
                </button>
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs md:text-sm text-gray-700 transition-colors">
                  Jackets
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
