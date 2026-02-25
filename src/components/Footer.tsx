import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#3a1e1e] text-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌸</span>
              <span className="text-xl font-serif font-semibold text-white">La Fleur</span>
            </div>
            <p className="text-sm text-pink-200 leading-relaxed max-w-xs">
              Luxury floral arrangements crafted with love and delivered fresh to your door.
              We believe every moment deserves beautiful flowers.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-300 hover:text-white transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="tel:+1234567890"
                className="text-pink-300 hover:text-white transition-colors text-sm"
              >
                +1 (234) 567-890
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Shop</h4>
            <ul className="space-y-2">
              {[
                { label: 'All Products', href: '/products' },
                { label: 'Bouquets', href: '/products?category=bouquets' },
                { label: 'Flower Boxes', href: '/products?category=flower-boxes' },
                { label: 'Gifts & Balloons', href: '/products?category=gifts-balloons' },
                { label: 'Wedding', href: '/products?category=wedding' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-pink-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Info</h4>
            <ul className="space-y-2">
              <li className="text-sm text-pink-300">Open daily · 7 days a week</li>
              <li className="text-sm text-pink-300">Same-day delivery available</li>
              <li className="text-sm text-pink-300">123 Blossom Street, FL 33009</li>
            </ul>

            <h4 className="text-white font-semibold mb-4 mt-8 text-sm uppercase tracking-widest">We Accept</h4>
            <p className="text-sm text-pink-300">Visa · Mastercard · AMEX · PayPal · Apple Pay · Google Pay</p>
          </div>
        </div>

        <div className="border-t border-[#5a2e2e] mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-pink-400">© {new Date().getFullYear()} La Fleur Flower Shop. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-pink-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-pink-400 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="text-xs text-pink-400 hover:text-white transition-colors">Delivery Info</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
