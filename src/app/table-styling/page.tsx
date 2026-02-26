import { serverClient } from '@/sanity/lib/client'
import { TABLE_STYLING_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import ProductGallery from '@/components/ProductGallery'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Table Styling',
  description:
    'Elegant floral table styling for celebrations, intimate dinners and sophisticated gatherings. Bespoke floral concepts tailored to your event.',
}

interface TableStylingData {
  intro?: string
  body?: unknown[]
  images?: { asset: object; hotspot?: object; crop?: object }[]
  videos?: { _key: string; caption?: string; url: string }[]
}

async function getTableStyling(): Promise<TableStylingData> {
  try {
    if (!serverClient) return {}
    const data = await serverClient.fetch<TableStylingData>(TABLE_STYLING_QUERY, {}, { cache: 'no-store' })
    return data ?? {}
  } catch (err) {
    console.error('Failed to fetch table styling data from Sanity:', err)
    return {}
  }
}

export default async function TableStylingPage() {
  const data = await getTableStyling()

  const galleryImages = (data.images ?? []).map((img) => ({
    url: urlFor(img).width(900).height(1125).fit('crop').url(),
    thumb: urlFor(img).width(160).height(160).fit('crop').url(),
    alt: 'Table Styling',
  }))

  const galleryVideos = (data.videos ?? []).map((v) => ({
    url: v.url,
    caption: v.caption,
  }))

  const hasMedia = galleryImages.length > 0 || galleryVideos.length > 0

  return (
    <div className="bg-cream min-h-screen">
      {/* Page header */}
      <div className="bg-gradient-to-b from-blush-pale to-cream py-14 text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase mb-2">
          Our Services
        </p>
        <h1 className="text-5xl font-serif font-bold text-dark mb-4">Table Styling</h1>
        <p className="text-muted max-w-lg mx-auto">
          Bespoke floral concepts designed to elevate your event.
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Navigation pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { label: 'All', href: '/products' },
            { label: 'Bestsellers', href: '/products?category=bestsellers' },
            { label: 'Baskets', href: '/products?category=baskets' },
            { label: 'Bouquets', href: '/products?category=bouquets' },
            { label: 'Flowers in a Box', href: '/products?category=flowers in a box' },
            { label: 'Table Styling', href: '/table-styling', active: true },
          ].map((cat) => (
            <a
              key={cat.href}
              href={cat.href}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors ${
                cat.active
                  ? 'bg-primary border-primary text-white shadow-sm'
                  : 'border-blush-light text-dark-wine hover:bg-blush-light hover:border-blush-light'
              }`}
            >
              {cat.label}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Text content */}
          <div className="space-y-8">
            {data.intro && (
              <p className="text-xl text-dark-muted leading-relaxed font-medium">{data.intro}</p>
            )}

            {data.body && data.body.length > 0 && (
              <div className="space-y-4 text-muted leading-relaxed">
                <PortableTextRenderer value={data.body} />
              </div>
            )}

            {/* Fallback text when no Sanity content yet */}
            {!data.intro && (!data.body || data.body.length === 0) && (
              <div className="space-y-5 text-muted leading-relaxed">
                <p className="text-xl text-dark-muted font-medium">
                  We create elegant floral table styling designed to transform your celebration into a refined visual experience.
                </p>
                <p>
                  Share your vision with us, or allow us to develop a bespoke floral concept tailored to your event, theme, and venue. From intimate dinners to sophisticated gatherings, every detail is carefully curated to enhance the atmosphere and elevate your table setting.
                </p>
                <p>
                  Each project is individually designed, and pricing is provided upon request. Contact us to discuss your event — we&apos;ll be happy to guide you through the concept, styling options, and personalized proposal.
                </p>
              </div>
            )}

            {/* Contact CTA */}
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="https://wa.me/33680869574"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-medium hover:bg-primary-dark transition-colors shadow-md"
              >
                Request a Proposal
              </a>
              <a
                href="mailto:fleuri.dlv@gmail.com"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3.5 rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
              >
                Send an Email
              </a>
            </div>
          </div>

          {/* Media gallery */}
          <div className="sticky top-8">
            {hasMedia ? (
              <ProductGallery
                images={galleryImages}
                videos={galleryVideos}
                title="Table Styling"
              />
            ) : (
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-blush-pale shadow-md flex items-center justify-center">
                <p className="text-muted text-sm">Images coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
