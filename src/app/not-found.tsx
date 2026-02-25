import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#fdf8f4]">
      <div className="text-center px-4">
        <p className="text-8xl mb-6">🌸</p>
        <h1 className="text-4xl font-serif font-bold text-[#3a1e1e] mb-3">Page Not Found</h1>
        <p className="text-[#7a5a5a] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for has bloomed away. Let&apos;s get you back to our beautiful arrangements.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#c0516a] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#a03d54] transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border-2 border-[#c0516a] text-[#c0516a] px-8 py-3.5 rounded-full font-medium hover:bg-[#c0516a] hover:text-white transition-colors"
          >
            Shop Flowers
          </Link>
        </div>
      </div>
    </div>
  )
}
