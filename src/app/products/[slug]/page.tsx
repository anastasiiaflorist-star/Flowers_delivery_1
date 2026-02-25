import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { PRODUCT_BY_SLUG_QUERY, PRODUCT_SLUGS_QUERY } from '@/sanity/lib/queries'
import { Product } from '@/types'
import { urlFor } from '@/sanity/lib/image'
import { sampleProducts } from '@/lib/sampleData'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import type { Metadata } from 'next'

interface ProductDetailPageProps {
  params: { slug: string }
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    if (!client) return sampleProducts.find((p) => p.slug.current === slug) || null
    const product = await client.fetch<Product>(PRODUCT_BY_SLUG_QUERY, { slug })
    if (product) return product
    return sampleProducts.find((p) => p.slug.current === slug) || null
  } catch {
    return sampleProducts.find((p) => p.slug.current === slug) || null
  }
}

export async function generateStaticParams() {
  try {
    if (!client) return sampleProducts.map((p) => ({ slug: p.slug.current }))
    const slugs = await client.fetch<{ slug: string }[]>(PRODUCT_SLUGS_QUERY)
    return slugs.map((s) => ({ slug: s.slug }))
  } catch {
    return sampleProducts.map((p) => ({ slug: p.slug.current }))
  }
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = params
  const product = await getProduct(slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.title,
    description: product.shortDescription || `${product.title} — luxury floral arrangement by La Fleur.`,
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const images = product.images || []
  const firstImage =
    images.length > 0
      ? urlFor(images[0]).width(800).height(900).fit('crop').url()
      : null

  const categoryLabel =
    product.category
      ? product.category.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      : null

  return (
    <div className="bg-[#fdf8f4] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-sm text-[#7a5a5a]">
          <Link href="/" className="hover:text-[#c0516a] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#c0516a] transition-colors">Shop</Link>
          {categoryLabel && (
            <>
              <span>/</span>
              <Link
                href={`/products?category=${product.category}`}
                className="hover:text-[#c0516a] transition-colors"
              >
                {categoryLabel}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-[#3a1e1e] font-medium truncate max-w-[200px]">{product.title}</span>
        </nav>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#fce8ed] shadow-md">
              {firstImage ? (
                <Image
                  src={firstImage}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[120px]">
                  💐
                </div>
              )}
              {product.featured && (
                <div className="absolute top-4 left-4">
                  <span className="bg-[#c0516a] text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                    Bestseller
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.slice(0, 5).map((img, idx) => {
                  const thumbUrl = urlFor(img).width(200).height(200).fit('crop').url()
                  return (
                    <div key={idx} className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 border-pink-200">
                      <Image
                        src={thumbUrl}
                        alt={`${product.title} ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:sticky lg:top-24">
            {categoryLabel && (
              <p className="text-xs font-medium tracking-[0.2em] text-[#c0516a] uppercase mb-2">
                {categoryLabel}
              </p>
            )}
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#3a1e1e] leading-tight mb-3">
              {product.title}
            </h1>

            {product.shortDescription && (
              <p className="text-[#7a5a5a] text-lg mb-5">{product.shortDescription}</p>
            )}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-[#3a1e1e]">${product.price.toFixed(2)}</span>
              {!product.inStock && (
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Sold Out
                </span>
              )}
            </div>

            {/* CTA buttons */}
            <div className="space-y-3 mb-8">
              <a
                href="tel:+1234567890"
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-lg transition-all shadow-md hover:shadow-lg ${
                  product.inStock
                    ? 'bg-[#c0516a] text-white hover:bg-[#a03d54]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                }`}
              >
                📞 {product.inStock ? 'Order by Phone' : 'Currently Unavailable'}
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold border-2 border-[#c0516a] text-[#c0516a] hover:bg-[#c0516a] hover:text-white transition-colors"
              >
                💬 Message on Instagram
              </a>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-[#f9d4dc] text-[#7a3a44] px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Long description */}
            {product.description && (
              <div className="border-t border-pink-100 pt-6">
                <h3 className="font-serif font-semibold text-[#3a1e1e] mb-4 text-lg">About this arrangement</h3>
                <PortableTextRenderer value={product.description} />
              </div>
            )}

            {/* Guarantees */}
            <div className="border-t border-pink-100 mt-6 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '🌿', label: '3-Day Freshness Guarantee' },
                { icon: '⚡', label: 'Same-Day Delivery' },
                { icon: '🎁', label: 'Gift Packaging Included' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <p className="text-xs text-[#7a5a5a] font-medium leading-tight">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to shop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[#7a3a44] hover:text-[#c0516a] font-medium transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Shop
        </Link>
      </div>
    </div>
  )
}
