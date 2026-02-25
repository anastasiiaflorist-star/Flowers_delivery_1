import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { urlFor } from '@/sanity/lib/image'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl =
    product.images && product.images.length > 0
      ? urlFor(product.images[0]).width(600).height(700).fit('crop').url()
      : null

  return (
    <Link href={`/products/${product.slug.current}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Image */}
        <div className="relative aspect-[4/5] bg-blush-soft overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-blush-pale">
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.featured && (
              <span className="bg-primary text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                Bestseller
              </span>
            )}
            {!product.inStock && (
              <span className="bg-gray-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                Sold Out
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-serif font-semibold text-dark group-hover:text-primary transition-colors text-sm sm:text-base leading-snug">
            {product.title}
          </h3>
          {product.shortDescription && (
            <p className="text-xs text-muted mt-1 line-clamp-2">{product.shortDescription}</p>
          )}
          {product.category && (
            <p className="text-xs text-primary mt-1 uppercase tracking-wide font-medium">
              {product.category.replace('-', ' ')}
            </p>
          )}
          <p className="mt-3 text-base font-semibold text-dark">
          €{product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  )
}
