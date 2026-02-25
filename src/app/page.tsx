import Link from 'next/link'
import Image from 'next/image'
import photo2 from './images/photo_2.jpg'
import { serverClient } from '@/sanity/lib/client'
import { FEATURED_PRODUCTS_QUERY } from '@/sanity/lib/queries'
import { Product } from '@/types'
import { sampleProducts } from '@/lib/sampleData'
import ProductCard from '@/components/ProductCard'
import type { Metadata } from 'next'

export const revalidate = 60 // revalidate every 60 seconds

export const metadata: Metadata = {
  description:
    'Handcrafted luxury bouquets and floral arrangements. Same-day flower delivery. Fresh flowers from around the world.',
}

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    if (!serverClient) return sampleProducts.filter((p) => p.featured)
    const products = await serverClient.fetch<Product[]>(FEATURED_PRODUCTS_QUERY, {}, { cache: 'no-store' })
    return products.length > 0 ? products : sampleProducts.filter((p) => p.featured)
  } catch (err) {
    console.error('Failed to fetch featured products from Sanity:', err)
    return sampleProducts.filter((p) => p.featured)
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <>
      {/* ─── HERO ───────────────────────────────────────────────────── */}
      <section className="relative flex items-center overflow-hidden" style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/55 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Text */}
          <div className="flex flex-col items-center gap-6">
            <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase mb-4">
              Luxury Florist
            </p>
            <h1 className="text-center text-5xl sm:text-6xl font-serif font-bold text-dark leading-tight mb-6">
              Fresh Flowers<br />
              <span className="text-primary">Delivered</span><br />
              With Love
            </h1>
            <p className="text-center text-lg text-muted max-w-[42rem] leading-relaxed mb-8">
              Handcrafted luxury bouquets and arrangements made with the freshest blooms
              from around the world. Available for same-day delivery, 7 days a week.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-medium hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg"
              >
                Shop Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/products?category=bouquets"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3.5 rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
              >
                View Bouquets
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-blush-border">
              {[
                { label: 'Same-day delivery' },
                { label: '3-day freshness guarantee' },
                { label: 'Premium Dutch flowers' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2">
                  <span className="text-s text-muted font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ─── CATEGORY PILLS ─────────────────────────────────────────── */}
      <section className="bg-white border-y border-pink-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: 'All', href: '/products' },
              { label: 'Baskets', href: '/products?category=baskets' },
              { label: 'Bouquets', href: '/products?category=bouquets' },
              { label: 'Flowers in a Box', href: '/products?category=flowers-in-a-box' },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="px-5 py-2 rounded-full border border-blush-light text-sm font-medium text-dark-wine hover:bg-blush-light hover:border-blush-light transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BESTSELLERS ────────────────────────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase mb-2">
              Our Fast-Selling Arrangements
            </p>
            <h2 className="text-4xl font-serif font-bold text-dark">Bestsellers</h2>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">No featured products yet.</p>
          )}

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-dark text-white px-10 py-3.5 rounded-full font-medium hover:bg-dark-medium transition-colors"
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
      <section className="bg-primary text-white py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: 'Delivery Within 1 Hour',
                desc: 'If flowers are in stock and you are within our delivery zone.',
              },
              {
                title: 'Fresh Flowers',
                desc: 'Sourced from the Netherlands, Ecuador, Kenya, Colombia and more.',
              },
              {
                title: 'Order by Phone',
                desc: 'Call +33 6 80 86 95 74 to order or customise your bouquet.',
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <h3 className="font-serif font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-pink-100 max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase mb-2">
              Why Choose Me
            </p>
            <h2 className="text-4xl font-serif font-bold text-dark">Why Me</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: '3-Day Freshness Guarantee',
                desc: "I am committed to delivering only the freshest flowers. If your bouquet wilts within 3 days and all care instructions were followed, I'll replace it free of charge.",
              },
              {
                title: 'Exceptional Service',
                desc: 'I am here to assist you every step of the way — from selecting the perfect bouquet to ensuring timely delivery. Your satisfaction is my priority.',
              },
              {
                title: 'Thoughtful Packaging',
                desc: 'Each bouquet is delivered in an aqua pack to keep blooms hydrated, inside a protective box. I include flower food, care instructions, and a complimentary card.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 rounded-3xl bg-cream hover:shadow-md transition-shadow">
                <h3 className="font-serif font-semibold text-lg text-dark mb-3">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ME ───────────────────────────────────────────────── */}
      <section id="about" className="py-20 bg-blush-soft">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={photo2}
                alt="About Me"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Text */}
            <div>
              <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase mb-2">
                A Little About Me
              </p>
              <h2 className="text-4xl font-serif font-bold text-dark mb-8">About Me</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-dark-muted text-lg leading-relaxed">
                  <span className="text-primary mt-1">•</span>
                  <span>5 years of experience in the flower business</span>
                </li>
                <li className="flex items-start gap-3 text-dark-muted text-lg leading-relaxed">
                  <span className="text-primary mt-1">•</span>
                  <span>Each flower is high quality ✨</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PACKAGING ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase mb-2">
                Presentation Matters
              </p>
              <h2 className="text-4xl font-serif font-bold text-dark mb-6">Packaging</h2>
              <p className="text-muted leading-relaxed mb-4">
                All my bouquets come with paper wrapping, a signature ribbon, an aqua box, and a craft bag for
                comfortable transportation. I also provide flower food, care tips, and a complimentary note card.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                I believe in providing a complete package to ensure your flowers are beautifully presented and
                well-cared for — from the moment they leave my studio to when they arrive at their destination.
              </p>

              <ul className="space-y-3">
                {[
                  'Signature ribbon & paper wrapping',
                  'Aqua box to keep blooms hydrated',
                  'Craft bag for easy carrying',
                  'Flower food & care instructions',
                  'Complimentary note card',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-dark-muted">
                    <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
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
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden aspect-square flex items-center justify-center">
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase mb-2">
              What Our Clients Say
            </p>
            <h2 className="text-4xl font-serif font-bold text-dark">Reviews</h2>
            <div className="flex items-center justify-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
                <span className="ml-2 text-sm text-muted">280+ reviews</span>
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
              <div key={review.name} className="bg-cream rounded-3xl p-7">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-dark-muted leading-relaxed mb-5 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blush-light rounded-full flex items-center justify-center text-sm font-bold text-primary">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">{review.name}</p>
                    <p className="text-xs text-muted">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-dark to-dark-wine text-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
            I am Forever in Love With What I Do
          </h2>
          <p className="text-pink-200 text-lg mb-8">
            Join me on this journey and let me bring beauty and joy to your every occasion.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-dark-wine px-10 py-4 rounded-full font-semibold hover:bg-pink-50 transition-colors shadow-lg text-lg"
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
