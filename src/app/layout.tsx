import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'La Fleur — Luxury Flower Shop',
    template: '%s | La Fleur',
  },
  description:
    'Luxury floral arrangements and bouquets crafted with love. Same-day delivery available. Fresh flowers from the Netherlands, Ecuador & Colombia.',
  keywords: ['flower shop', 'bouquets', 'floral arrangements', 'luxury flowers', 'flower delivery'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#fdf8f4]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
