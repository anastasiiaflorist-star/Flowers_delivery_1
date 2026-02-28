import type { Metadata } from 'next'
import { Jost, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://fleuri.ie'),
  title: {
    default: 'Fleuri — Luxury Flower Shop',
    template: '%s | Fleuri',
  },
  description:
    'Luxury floral arrangements and bouquets crafted with love. Fresh flowers from the Netherlands, Ecuador & Colombia.',
  keywords: [
    'flower shop',
    'bouquets',
    'floral arrangements',
    'luxury flowers',
    'flower delivery',
    'fresh flowers',
    'wedding flowers',
    'event flowers',
    'flower gift',
  ],
  authors: [{ name: 'Fleuri' }],
  creator: 'Fleuri',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    siteName: 'Fleuri',
    title: 'Fleuri — Luxury Flower Shop',
    description:
      'Luxury floral arrangements and bouquets crafted with love. Fresh flowers from the Netherlands, Ecuador & Colombia.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Fleuri Luxury Flower Shop' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fleuri — Luxury Flower Shop',
    description:
      'Luxury floral arrangements and bouquets crafted with love. Fresh flowers from the Netherlands, Ecuador & Colombia.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jost.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream font-sans">
        <Navbar />
        <main className="flex-1 mt-[97px]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
