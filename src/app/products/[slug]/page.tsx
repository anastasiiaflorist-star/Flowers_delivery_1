import { notFound } from 'next/navigation'
import Link from 'next/link'
import { serverClient } from '@/sanity/lib/client'
import { PRODUCT_BY_SLUG_QUERY, PRODUCT_SLUGS_QUERY } from '@/sanity/lib/queries'
import { Product } from '@/types'
import { urlFor } from '@/sanity/lib/image'
import { sampleProducts } from '@/lib/sampleData'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import ProductGallery from '@/components/ProductGallery'
import type { Metadata } from 'next'

export const revalidate = 60 // revalidate every 60 seconds

interface ProductDetailPageProps {
  params: { slug: string }
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    if (!serverClient) return sampleProducts.find((p) => p.slug.current === slug) || null
    const product = await serverClient.fetch<Product>(PRODUCT_BY_SLUG_QUERY, { slug })
    if (product) return product
    return sampleProducts.find((p) => p.slug.current === slug) || null
  } catch (err) {
    console.error('Failed to fetch product from Sanity:', err)
    return sampleProducts.find((p) => p.slug.current === slug) || null
  }
}

export async function generateStaticParams() {
  try {
    if (!serverClient) return sampleProducts.map((p) => ({ slug: p.slug.current }))
    const slugs = await serverClient.fetch<{ slug: string }[]>(PRODUCT_SLUGS_QUERY)
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
    description: product.shortDescription || `${product.title} — luxury floral arrangement by Fleuri.`,
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const galleryImages = (product.images || []).map((img) => ({
    url: urlFor(img).width(800).height(900).fit('crop').url(),
    thumb: urlFor(img).width(200).height(200).fit('crop').url(),
    alt: product.title,
  }))
  const galleryVideos = (product.videos || []).map((v) => ({
    url: v?.url || '',
    caption: v?.caption || '',
  }))

  const categoryLabel =
    product.category
      ? product.category.replaceAll('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      : null

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
          {categoryLabel && (
            <>
              <span>/</span>
              <Link
                href={`/products?category=${product.category}`}
                className="hover:text-primary transition-colors"
              >
                {categoryLabel}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-dark font-medium truncate max-w-[200px]">{product.title}</span>
        </nav>
      </div>

      {/* Main content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Gallery */}
          <ProductGallery
            images={galleryImages}
            videos={galleryVideos}
            title={product.title}
            featured={product.featured}
          />

          {/* Details */}
          <div className="lg:sticky lg:top-24">
            {categoryLabel && (
              <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase mb-2">
                {categoryLabel}
              </p>
            )}
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-dark leading-tight mb-3">
              {product.title}
            </h1>

            {/* {product.shortDescription && (
              <p className="text-muted text-lg mb-5">{product.shortDescription}</p>
            )} */}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-dark">€{product.price.toFixed(2)}</span>
              {!product.inStock && (
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Sold Out
                </span>
              )}
            </div>

            {/* CTA buttons */}
            <div className="space-y-3 mb-8">
              <a
                href="tel:+33680869574"
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-lg transition-all shadow-md hover:shadow-lg ${
                  product.inStock
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                }`}
              >
                {product.inStock ? 'Order by Phone' : 'Currently Unavailable'}
              </a>
              <a
                href="https://www.instagram.com/anastasia.a.florist"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              >
                Message on Instagram
              </a>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-blush-light text-dark-wine px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Long description */}
            {product.description && (
              <div className="border-t border-pink-100 pt-6">
                <h3 className="font-serif font-semibold text-dark mb-4 text-lg">About this arrangement</h3>
                <PortableTextRenderer value={product.description} />
              </div>
            )}

            {/* Guarantees */}
            <div className="border-t border-pink-100 mt-6 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Freshness Guarantee' },
                { label: 'Unique Design' },
                { label: 'Gift Packaging Included' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-xs text-muted font-medium leading-tight">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to shop */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-dark-wine hover:text-primary font-medium transition-colors group"
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
