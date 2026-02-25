import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-cream">
      <div className="text-center px-4">
        <h1 className="text-4xl font-serif font-bold text-dark mb-3">Page Not Found</h1>
        <p className="text-muted mb-8 max-w-md mx-auto">
          The page you&apos;re looking for has bloomed away. Let&apos;s get you back to our beautiful arrangements.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-medium hover:bg-primary-dark transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3.5 rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
          >
            Shop Flowers
          </Link>
        </div>
      </div>
    </div>
  )
}
