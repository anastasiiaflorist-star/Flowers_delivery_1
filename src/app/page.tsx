import Link from 'next/link'
import { serverClient } from '@/sanity/lib/client'
import { FEATURED_PRODUCTS_QUERY, HOME_IMAGES_QUERY } from '@/sanity/lib/queries'
import { Product } from '@/types'
import { sampleProducts } from '@/lib/sampleData'
import ProductCard from '@/components/ProductCard'
import ImageCarousel from '@/components/ImageCarousel'
import { urlFor } from '@/sanity/lib/image'
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

interface HomeImages {
  aboutImages?: { asset: object; hotspot?: object; crop?: object }[]
  servicesImages?: { asset: object; hotspot?: object; crop?: object }[]
}

async function getHomeImages(): Promise<HomeImages> {
  try {
    if (!serverClient) return {}
    const data = await serverClient.fetch<HomeImages>(HOME_IMAGES_QUERY, {}, { cache: 'no-store' })
    return data ?? {}
  } catch (err) {
    console.error('Failed to fetch home images from Sanity:', err)
    return {}
  }
}

export default async function HomePage() {
  const [featuredProducts, homeImages] = await Promise.all([
    getFeaturedProducts(),
    getHomeImages(),
  ])

  const aboutImageList = (homeImages.aboutImages ?? []).map((img) => ({
    url: urlFor(img).width(900).height(1125).fit('crop').url(),
    alt: 'About Me',
  }))

  const servicesImageList = (homeImages.servicesImages ?? []).map((img) => ({
    url: urlFor(img).width(900).height(1125).fit('crop').url(),
    alt: 'Services',
  }))

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
              from around the world. Freshness Guaranteed.
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
                { label: 'Unique Designs' },
                { label: 'Freshness Guaranteed' },
                { label: 'Premium flowers' },
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
              { label: 'All', href: '/products', active: false },
              { label: 'Bestsellers', href: '/products?category=bestsellers', active: true },
              { label: 'Baskets', href: '/products?category=baskets', active: false },
              { label: 'Bouquets', href: '/products?category=bouquets', active: false },
              { label: 'Flowers in a Box', href: '/products?category=flowers in a box', active: false },
              { label: 'Table Styling', href: '/table-styling', active: false },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors ${
                  cat.active
                    ? 'bg-primary border-primary text-white shadow-sm'
                    : 'border-blush-light text-dark-wine hover:bg-blush-light hover:border-blush-light'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BESTSELLERS ────────────────────────────────────────────── */}
      <section id="bestsellers" className="py-20 bg-cream">
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

      

      {/* ─── WHY US ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-serif font-bold text-dark">Why Choose Our Bouquets</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-10">
            {[
              {
                title: 'Premium Flowers Only',
                desc: "You pay exclusively for flowers. We do not use filler greenery to artificially increase volume — every stem is a premium bloom.",
              },
              {
                title: 'Freshness Guaranteed',
                desc: 'Each bouquet is delivered in a water-filled aqua box, ensuring the flowers remain hydrated and flawless during transportation.',
              },
              {
                title: 'Refined Presentation',
                desc: 'Our bouquets are wrapped in high-quality floral wrapping that enhances their luxurious appearance and finished with our signature premium ribbon featuring our logo — a mark of quality and craftsmanship.',
              },
              {
                title: 'Protected Delivery',
                desc: 'Every arrangement is provided with a protective carrier to ensure safe, elegant, and damage-free transport.',
              },
            ].map((item) => (
              <div key={item.title} className="w-full md:w-[calc(33.333%-1.667rem)] text-center p-8 rounded-3xl bg-cream hover:shadow-md transition-shadow">
                <h3 className="font-serif font-semibold text-lg text-dark mb-3">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase mb-2">
              How We Work
            </p>
            <h2 className="text-4xl font-serif font-bold text-dark">Services</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image carousel */}
            <div className="sticky top-8">
              <ImageCarousel images={servicesImageList} />
            </div>

            {/* Right column: service cards + contact */}
            <div className="flex flex-col gap-6">
              {/* Service cards */}
              {[
                {
                  title: 'Pre-Order & Freshness',
                  body: "All our arrangements are made to order, with a minimum of 24 hours' notice. Since we purchase flowers specifically for each client, you are guaranteed the freshest blooms.",
                },
                {
                  title: 'Personalized Arrangements',
                  body: "When placing an order, you can select a composition and color palette that you love. Each bouquet is handcrafted and unique, as no two flowers are exactly alike. While we aim to capture the spirit of your chosen design, exact replicas are rarely possible. Ordering in advance helps us create a bouquet that closely matches your vision, tailored to your preferences, budget, and the freshest blooms available.\n\nAnd if you love our style, you will never be disappointed.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-cream rounded-3xl p-8 hover:shadow-md transition-shadow">
                  <h3 className="font-serif font-semibold text-xl text-dark mb-4">{item.title}</h3>
                  {item.body.split('\n\n').map((para, i) => (
                    <p key={i} className={`text-muted leading-relaxed${i > 0 ? ' mt-4' : ''}`}>{para}</p>
                  ))}
                </div>
              ))}

              {/* Contact */}
              <div className="bg-cream rounded-3xl p-8 hover:shadow-md transition-shadow">
                <h3 className="font-serif font-semibold text-xl text-dark mb-6">Contact Us</h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="mailto:fleuri.dlv@gmail.com"
                      className="flex items-center gap-4 group"
                    >
                      <span className="w-10 h-10 rounded-full bg-blush-light flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                        <svg className="w-5 h-5 text-primary group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wider font-medium mb-0.5">Email</p>
                        <p className="text-dark font-medium group-hover:text-primary transition-colors">fleuri.dlv@gmail.com</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/33680869574"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group"
                    >
                      <span className="w-10 h-10 rounded-full bg-blush-light flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                        <svg className="w-5 h-5 text-primary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wider font-medium mb-0.5">WhatsApp</p>
                        <p className="text-dark font-medium group-hover:text-primary transition-colors">+33 6 80 86 95 74</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/anastasia.a.florist/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group"
                    >
                      <span className="w-10 h-10 rounded-full bg-blush-light flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                        <svg className="w-5 h-5 text-primary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wider font-medium mb-0.5">Instagram</p>
                        <p className="text-dark font-medium group-hover:text-primary transition-colors">@anastasia.a.florist</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ORDERING INFORMATION ───────────────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase mb-2">
              Good to Know
            </p>
            <h2 className="text-4xl font-serif font-bold text-dark">Ordering Information</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {[
              {
                title: 'Minimum Order',
                body: 'The minimum order amount is €100.',
              },
              {
                title: 'Free Delivery in Monaco',
                body: 'We proudly provide free delivery within Monaco.',
              },
              {
                title: 'Nearby Delivery',
                body: 'Delivery to neighboring towns such as Beausoleil, Cap-d\'Ail, Roquebrune-Cap-Martin, and nearby areas is available upon request. Delivery pricing is calculated individually depending on location.',
              },
            ].map((item) => (
              <div key={item.title} className="w-full md:w-[calc(33.333%-1.334rem)] bg-white rounded-3xl p-8 hover:shadow-md transition-shadow">
                <h3 className="font-serif font-semibold text-lg text-dark mb-3">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.body}</p>
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
