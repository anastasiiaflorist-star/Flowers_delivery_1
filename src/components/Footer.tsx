import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark text-pink-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-serif font-semibold text-white">Fleuri</span>
            </div>
            <p className="text-sm text-pink-200 leading-relaxed max-w-xs">
              Luxury floral arrangements crafted with love and delivered fresh to your door.
              I believe every moment deserves beautiful flowers.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/anastasia.a.florist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-300 hover:text-white transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="tel:+33680869574"
                className="text-pink-300 hover:text-white transition-colors text-sm"
              >
                +33 6 80 86 95 74
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Shop</h4>
            <ul className="space-y-2">
              {[
                { label: 'All Products', href: '/products' },
                { label: 'Baskets', href: '/products?category=baskets' },
                { label: 'Bouquets', href: '/products?category=bouquets' },
                { label: 'Flowers in a Box', href: '/products?category=flowers in a box' },
                { label: 'Table Styling', href: '/table-styling' },
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
        </div>

        <div className="border-t border-dark-medium mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-pink-400">© {new Date().getFullYear()} Fleuri Flower Shop. All rights reserved. Made by SoftKerr.com</p>
          {/* <div className="flex gap-6">
            <Link href="#" className="text-xs text-pink-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-pink-400 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="text-xs text-pink-400 hover:text-white transition-colors">Delivery Info</Link>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
