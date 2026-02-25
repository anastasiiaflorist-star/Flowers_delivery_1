import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
})

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
    <html lang="en" className={jost.variable}>
      <body className="min-h-screen flex flex-col bg-cream font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
