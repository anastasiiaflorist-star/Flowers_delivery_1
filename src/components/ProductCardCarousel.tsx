'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductCardCarouselProps {
  images: { url: string; alt: string }[]
  featured?: boolean
  inStock?: boolean
}

export default function ProductCardCarousel({ images, featured, inStock }: ProductCardCarouselProps) {
  const [index, setIndex] = useState(0)
  const total = images.length

  function go(e: React.MouseEvent, next: number) {
    e.preventDefault()
    e.stopPropagation()
    setIndex(((next % total) + total) % total)
  }

  if (total === 0) {
    return (
      <div className="relative aspect-[4/5] bg-blush-soft overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-blush-pale" />
        <Badges featured={featured} inStock={inStock} />
      </div>
    )
  }

  return (
    <div
      className="relative aspect-[4/5] bg-blush-soft overflow-hidden group/carousel"
    >
      {images.map((img, i) => (
        <Image
          key={i}
          src={img.url}
          alt={img.alt}
          fill
          className={`object-cover transition-opacity duration-500 ease-in-out ${
            i === index
              ? 'opacity-100 group-hover:scale-105 transition-[opacity,transform] duration-500'
              : 'opacity-0'
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={i === 0}
        />
      ))}

      {/* Arrows — only when multiple images */}
      {total > 1 && (
        <>
          <button
            onClick={(e) => go(e, index - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center opacity-60 group-hover/carousel:opacity-100 transition-opacity z-10"
            aria-label="Previous image"
          >
            <svg className="w-3 h-3 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => go(e, index + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center opacity-60 group-hover/carousel:opacity-100 transition-opacity z-10"
            aria-label="Next image"
          >
            <svg className="w-3 h-3 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => go(e, i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <Badges featured={featured} inStock={inStock} />
    </div>
  )
}

function Badges({ featured, inStock }: { featured?: boolean; inStock?: boolean }) {
  return (
    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
      {featured && (
        <span className="bg-primary text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
          Bestseller
        </span>
      )}
      {inStock === false && (
        <span className="bg-gray-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
          Sold Out
        </span>
      )}
    </div>
  )
}
