import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { FEATURED_PRODUCTS_QUERY } from '@/sanity/lib/queries'
import { Product } from '@/types'
import { sampleProducts } from '@/lib/sampleData'
import ProductCard from '@/components/ProductCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Luxury Flower Shop — La Fleur',
  description:
    'Handcrafted luxury bouquets and floral arrangements. Same-day flower delivery. Fresh flowers from around the world.',
}

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    if (!projectId || projectId === 'your-project-id') {
      return sampleProducts.filter((p) => p.featured)
    }
    const products = await client.fetch<Product[]>(FEATURED_PRODUCTS_QUERY)
    return products.length > 0 ? products : sampleProducts.filter((p) => p.featured)
  } catch {
    return sampleProducts.filter((p) => p.featured)
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <>
      {/* ─── HERO ───────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-[#fdf0f3] via-[#fdf8f4] to-[#f9f3ec]">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-[#f9d4dc]/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#e8d5c0]/30 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <p className="text-sm font-medium tracking-[0.2em] text-[#c0516a] uppercase mb-4">
              Luxury Floral Studio
            </p>
            <h1 className="text-5xl sm:text-6xl font-serif font-bold text-[#3a1e1e] leading-tight mb-6">
              Fresh Flowers,<br />
              <span className="text-[#c0516a]">Delivered</span><br />
              With Love
            </h1>
            <p className="text-lg text-[#7a5a5a] max-w-md leading-relaxed mb-8">
              Handcrafted luxury bouquets and arrangements made with the freshest blooms
              from around the world. Available for same-day delivery, 7 days a week.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#c0516a] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#a03d54] transition-colors shadow-md hover:shadow-lg"
              >
                Shop Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/products?category=bouquets"
                className="inline-flex items-center gap-2 border-2 border-[#c0516a] text-[#c0516a] px-8 py-3.5 rounded-full font-medium hover:bg-[#c0516a] hover:text-white transition-colors"
              >
                View Bouquets
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-[#f0d8dc]">
              {[
                { icon: '🌿', label: 'Same-day delivery' },
                { icon: '✨', label: '3-day freshness guarantee' },
                { icon: '💐', label: 'Premium Dutch flowers' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2">
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-xs text-[#7a5a5a] font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image collage */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative w-full aspect-[4/3] lg:aspect-square max-w-lg mx-auto">
              {/* Main image frame */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden bg-[#fce8ed] shadow-2xl">
                <div className="w-full h-full flex items-center justify-center text-[120px] select-none">
                  💐
                </div>
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#fce8ed] rounded-full flex items-center justify-center text-xl">🌸</div>
                <div>
                  <p className="text-xs font-semibold text-[#3a1e1e]">Next-day delivery</p>
                  <p className="text-xs text-[#7a5a5a]">Available 7 days a week</p>
                </div>
              </div>
              {/* Floating rating */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-3">
                <div className="text-yellow-400 text-sm">★★★★★</div>
                <p className="text-xs font-semibold text-[#3a1e1e] mt-0.5">280+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORY PILLS ─────────────────────────────────────────── */}
      <section className="bg-white border-y border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: 'All', href: '/products' },
              { label: 'Bouquets', href: '/products?category=bouquets' },
              { label: 'Flower Boxes', href: '/products?category=flower-boxes' },
              { label: 'Arrangements', href: '/products?category=arrangements' },
              { label: 'Gifts & Balloons', href: '/products?category=gifts-balloons' },
              { label: 'Wedding', href: '/products?category=wedding' },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="px-5 py-2 rounded-full border border-pink-200 text-sm font-medium text-[#7a3a44] hover:bg-[#f9d4dc] hover:border-[#f9d4dc] transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BESTSELLERS ────────────────────────────────────────────── */}
      <section className="py-20 bg-[#fdf8f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-[0.2em] text-[#c0516a] uppercase mb-2">
              Our Fast-Selling Arrangements
            </p>
            <h2 className="text-4xl font-serif font-bold text-[#3a1e1e]">Bestsellers</h2>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-[#7a5a5a]">No featured products yet.</p>
          )}

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#3a1e1e] text-white px-10 py-3.5 rounded-full font-medium hover:bg-[#5a2e2e] transition-colors"
            >
              View All Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── DELIVERY BANNER ────────────────────────────────────────── */}
      <section className="bg-[#c0516a] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: '⚡',
                title: 'Delivery Within 1 Hour',
                desc: 'If flowers are in stock and you are within our delivery zone.',
              },
              {
                icon: '🌍',
                title: 'Fresh Flowers',
                desc: 'Sourced from the Netherlands, Ecuador, Kenya, Colombia and more.',
              },
              {
                icon: '📞',
                title: 'Order by Phone',
                desc: 'Call us at +1 (234) 567-890 to order or customise your bouquet.',
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <span className="text-4xl mb-3">{item.icon}</span>
                <h3 className="font-serif font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-pink-100 max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-medium tracking-[0.2em] text-[#c0516a] uppercase mb-2">
              Why Choose Us
            </p>
            <h2 className="text-4xl font-serif font-bold text-[#3a1e1e]">Why Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: '🌹',
                title: '3-Day Freshness Guarantee',
                desc: "We are committed to delivering only the freshest flowers. If your bouquet wilts within 3 days and all care instructions were followed, we'll replace it free of charge.",
              },
              {
                icon: '💎',
                title: 'Exceptional Service',
                desc: 'Our dedicated team is here to assist you every step of the way — from selecting the perfect bouquet to ensuring timely delivery. Your satisfaction is our priority.',
              },
              {
                icon: '🎁',
                title: 'Thoughtful Packaging',
                desc: 'Each bouquet is delivered in an aqua pack to keep blooms hydrated, inside a protective box. We include flower food, care instructions, and a complimentary card.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 rounded-3xl bg-[#fdf8f4] hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-[#f9d4dc] rounded-full flex items-center justify-center text-3xl mx-auto mb-5">
                  {item.icon}
                </div>
                <h3 className="font-serif font-semibold text-lg text-[#3a1e1e] mb-3">{item.title}</h3>
                <p className="text-sm text-[#7a5a5a] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PACKAGING ──────────────────────────────────────────────── */}
      <section className="py-20 bg-[#fdf0f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <p className="text-sm font-medium tracking-[0.2em] text-[#c0516a] uppercase mb-2">
                Presentation Matters
              </p>
              <h2 className="text-4xl font-serif font-bold text-[#3a1e1e] mb-6">Our Packaging</h2>
              <p className="text-[#7a5a5a] leading-relaxed mb-4">
                All our bouquets come with paper wrapping, a signature ribbon, an aqua box, and a craft bag for
                comfortable transportation. We also provide flower food, care tips, and a complimentary note card.
              </p>
              <p className="text-[#7a5a5a] leading-relaxed mb-8">
                We believe in providing a complete package to ensure your flowers are beautifully presented and
                well-cared for — from the moment they leave our studio to when they arrive at their destination.
              </p>

              <ul className="space-y-3">
                {[
                  'Signature ribbon & paper wrapping',
                  'Aqua box to keep blooms hydrated',
                  'Craft bag for easy carrying',
                  'Flower food & care instructions',
                  'Complimentary note card',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#5a3a3a]">
                    <span className="w-5 h-5 bg-[#c0516a] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden aspect-square flex items-center justify-center text-[100px]">
                🎀
              </div>
              <div className="absolute -bottom-5 -right-5 bg-[#c0516a] text-white rounded-2xl p-5 shadow-lg">
                <p className="text-2xl font-serif font-bold">100%</p>
                <p className="text-xs mt-0.5">Satisfaction Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-medium tracking-[0.2em] text-[#c0516a] uppercase mb-2">
              What Our Clients Say
            </p>
            <h2 className="text-4xl font-serif font-bold text-[#3a1e1e]">Reviews</h2>
            <div className="flex items-center justify-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-[#7a5a5a]">280+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Natalie M.',
                text: "Absolutely stunning experience! The flowers were incredibly fresh and beautifully arranged. You can tell they use high-quality blooms — everything felt premium. Service was exceptional.",
                date: 'a week ago',
              },
              {
                name: 'Alicia B.',
                text: "I've been following this shop for over a year. They created a masterpiece for same-day delivery. Their online customer service was above and beyond. I'm a very happy customer!",
                date: 'a month ago',
              },
              {
                name: 'Maria R.',
                text: "My Favourite flower shop! Their bouquets are always breathtaking — elegant, fresh, and beautifully arranged. Deliveries are always right on time. I order only from them now!",
                date: '2 months ago',
              },
            ].map((review) => (
              <div key={review.name} className="bg-[#fdf8f4] rounded-3xl p-7">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[#5a3a3a] leading-relaxed mb-5 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#f9d4dc] rounded-full flex items-center justify-center text-sm font-bold text-[#c0516a]">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#3a1e1e]">{review.name}</p>
                    <p className="text-xs text-[#7a5a5a]">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-[#3a1e1e] to-[#7a3a44] text-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="text-4xl mb-4">🌸</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
            We&apos;re Forever in Love With What We Do
          </h2>
          <p className="text-pink-200 text-lg mb-8">
            Join us on this journey and let us bring beauty and joy to your every occasion.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-[#7a3a44] px-10 py-4 rounded-full font-semibold hover:bg-pink-50 transition-colors shadow-lg text-lg"
          >
            Explore the Catalog
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
