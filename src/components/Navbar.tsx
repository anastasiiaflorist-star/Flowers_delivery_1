'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/products?category=bouquets', label: 'Bouquets' },
  { href: '/products?category=flower-boxes', label: 'Flower Boxes' },
  { href: '/products?category=gifts-balloons', label: 'Gifts & Balloons' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full sticky top-0 z-50 bg-[#fdf8f4]/95 backdrop-blur-sm border-b border-pink-100 shadow-sm">
      {/* Announcement bar */}
      <div className="bg-[#f9d4dc] text-[#7a3a44] text-center text-xs py-2 px-4 font-medium tracking-wide">
        Free delivery on orders over $190 · Open 7 days a week
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🌸</span>
            <span className="text-xl font-serif font-semibold text-[#7a3a44] group-hover:text-[#c0516a] transition-colors">
              La Fleur
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#5a3a3a] hover:text-[#c0516a] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-[#7a3a44] hover:bg-pink-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current" />
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#5a3a3a] hover:text-[#c0516a] transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
