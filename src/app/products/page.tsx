import { serverClient } from '@/sanity/lib/client'
import { ALL_PRODUCTS_QUERY } from '@/sanity/lib/queries'
import { Product } from '@/types'
import { sampleProducts } from '@/lib/sampleData'
import ProductCard from '@/components/ProductCard'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic' // category filtering via searchParams

export const metadata: Metadata = {
  description:
    'Browse our complete collection of luxury bouquets, flower boxes, gifts, and arrangements. Handcrafted with the freshest blooms from around the world. Every arrangement made with love.',
}

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'bestsellers', label: 'Bestsellers' },
  { value: 'baskets', label: 'Baskets' },
  { value: 'bouquets', label: 'Bouquets' },
  { value: 'flowers in a box', label: 'Flowers in a Box' },
]

async function getAllProducts(): Promise<Product[]> {
  try {
    if (!serverClient) return sampleProducts
    const products = await serverClient.fetch<Product[]>(ALL_PRODUCTS_QUERY, {}, { cache: 'no-store' })
    return products.length > 0 ? products : sampleProducts
  } catch (err) {
    console.error('Failed to fetch products from Sanity:', err)
    return sampleProducts
  }
}

const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

function buildHref(category: string | undefined, sort: string | undefined) {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (sort) params.set('sort', sort)
  const qs = params.toString().replace(/\+/g, '%20')
  return `/products${qs ? `?${qs}` : ''}`
}

interface ProductsPageProps {
  searchParams: { category?: string; sort?: string }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, sort } = searchParams
  const allProducts = await getAllProducts()

  // Normalize category slugs: treat hyphens and spaces as equivalent
  const normalize = (s: string) => s.trim().toLowerCase().replace(/-/g, ' ')
  const normalizedCategory = category ? normalize(category) : ''

  const filtered = normalizedCategory === 'bestsellers'
    ? allProducts.filter((p) => p.featured)
    : normalizedCategory
    ? allProducts.filter((p) => normalize(p.category ?? '') === normalizedCategory)
    : allProducts

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    return 0
  })

  const activeCategory = CATEGORIES.find((c) => normalize(c.value) === normalizedCategory) || CATEGORIES[0]

  return (
    <div className="bg-cream min-h-screen">
      {/* Page header */}
      <div className="bg-gradient-to-b from-blush-pale to-cream py-14 text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase mb-2">
          Our Collection
        </p>
        <h1 className="text-5xl font-serif font-bold text-dark mb-4">
          {category ? activeCategory.label : 'All Products'}
        </h1>
        <p className="text-muted max-w-lg mx-auto">
          Handcrafted with the freshest blooms from around the world. Every arrangement made with love.
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = (category || '') === cat.value
              return (
                <a
                  key={cat.value}
                  href={buildHref(cat.value || undefined, sort)}
                  className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary border-primary text-white shadow-sm'
                      : 'border-blush-light text-dark-wine hover:bg-blush-light hover:border-blush-light'
                  }`}
                >
                  {cat.label}
                </a>
              )
            })}
            <a
              href="/table-styling"
              className="px-5 py-2 rounded-full border text-sm font-medium transition-colors border-blush-light text-dark-wine hover:bg-blush-light hover:border-blush-light"
            >
              Table Styling
            </a>
          </div>

          {/* Sort pills */}
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted font-medium mr-1">Sort by:</span>
            {SORT_OPTIONS.map((opt) => {
              const isActive = (sort || '') === opt.value
              return (
                <a
                  key={opt.value}
                  href={buildHref(category, opt.value || undefined)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary border-primary text-white shadow-sm'
                      : 'border-blush-light text-dark-wine hover:bg-blush-light hover:border-blush-light'
                  }`}
                >
                  {opt.label}
                </a>
              )
            })}
          </div>
        </div>

        {/* Grid */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sorted.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-serif font-semibold text-dark mb-2">No arrangements found</h3>
            <p className="text-muted mb-6">
              We don&apos;t have any products in this category right now. Check back soon!
            </p>
            <a
              href="/products"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
            >
              View All Products
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
