import Link from 'next/link'
import { Product } from '@/types'
import { urlFor } from '@/sanity/lib/image'
import ProductCardCarousel from './ProductCardCarousel'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const images =
    product.images?.map((img) => ({
      url: urlFor(img).width(600).height(700).fit('crop').url(),
      alt: product.title,
    })) ?? []

  return (
    <Link href={`/products/${product.slug.current}`} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
        {/* Image carousel */}
        <ProductCardCarousel
          images={images}
          featured={product.featured}
          inStock={product.inStock}
        />

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-serif font-semibold text-dark group-hover:text-primary transition-colors text-sm sm:text-base leading-snug">
            {product.title}
          </h3>
          {product.shortDescription && (
            <p className="text-xs text-muted mt-1 line-clamp-2">{product.shortDescription}</p>
          )}
          {product.category && (
            <p className="text-xs text-primary mt-1 uppercase tracking-wide font-medium">
              {product.category.replaceAll('-', ' ')}
            </p>
          )}
          <p className="mt-auto pt-3 text-base font-semibold text-dark">
            €{product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  )
}
