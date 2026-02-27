'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/products?category=baskets', label: 'Baskets' },
  { href: '/products?category=bouquets', label: 'Bouquets' },
  { href: '/products?category=flowers in a box', label: 'Flowers in a Box' },
  { href: '/table-styling', label: 'Table Styling' },
  { href: '/#services', label: 'Services' },
  { href: '/#ordering-information', label: 'Ordering Information' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full fixed top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-blush-light shadow-sm">
      {/* Announcement bar */}
      <div className="bg-blush-light text-dark-wine text-center text-xs py-2 px-4 font-medium tracking-wide">
        Free delivery within Monaco
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lx:px-[6rem]">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-serif font-semibold text-dark-wine group-hover:text-primary transition-colors">
              Fleuri
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-dark-muted hover:text-primary transition-colors sm:text-sm lg:text-xl"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          {!menuOpen && (
            <button
              className="md:hidden p-2 rounded-md text-dark-wine hover:bg-blush-soft"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-0.5 bg-current mb-1" />
              <div className="w-5 h-0.5 bg-current mb-1" />
              <div className="w-5 h-0.5 bg-current" />
            </button>
          )}
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <button
              className="absolute top-4 right-4 p-2 rounded-md text-dark-wine hover:bg-blush-soft bottom-[70%]"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <div className="relative w-5 h-5">
                <span className="absolute top-1/2 left-0 w-full h-0.5 bg-current transform -translate-y-1/2 rotate-45" />
                <span className="absolute top-1/2 left-0 w-full h-0.5 bg-current transform -translate-y-1/2 -rotate-45" />
              </div>
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-dark-muted hover:text-primary transition-colors py-1"
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
