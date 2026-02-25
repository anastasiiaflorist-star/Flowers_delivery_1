import { serverClient } from '@/sanity/lib/client'
import { ALL_PRODUCTS_QUERY } from '@/sanity/lib/queries'
import { Product } from '@/types'
import { sampleProducts } from '@/lib/sampleData'
import ProductCard from '@/components/ProductCard'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic' // category filtering via searchParams

export const metadata: Metadata = {
  description:
    'Browse our complete collection of luxury bouquets, flower boxes, gifts, and arrangements. Same-day delivery available.',
}

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'baskets', label: 'Baskets' },
  { value: 'bouquets', label: 'Bouquets' },
  { value: 'flowers-in-a-box', label: 'Flowers in a Box' },
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

interface ProductsPageProps {
  searchParams: { category?: string }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = searchParams
  const allProducts = await getAllProducts()

  const filtered = category
    ? allProducts.filter((p) => p.category === category)
    : allProducts

  const activeCategory = CATEGORIES.find((c) => c.value === (category || '')) || CATEGORIES[0]

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
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {CATEGORIES.map((cat) => {
            const isActive = (category || '') === cat.value
            return (
              <a
                key={cat.value}
                href={cat.value ? `/products?category=${cat.value}` : '/products'}
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
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
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
