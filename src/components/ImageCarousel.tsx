'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageCarouselProps {
  images: { url: string; alt: string }[]
  /** Tailwind aspect-ratio class, defaults to aspect-[4/5] */
  aspectClass?: string
  className?: string
}

export default function ImageCarousel({
  images,
  aspectClass = 'w-full aspect-[4/5] md:w-[70%] lg:w-full mx-auto',
  className = '',
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0)
  const total = images.length

  if (total === 0) {
    return (
      <div className={`${aspectClass} rounded-3xl overflow-hidden bg-blush-pale shadow-md ${className}`} />
    )
  }

  function go(next: number) {
    setIndex(((next % total) + total) % total)
  }

  return (
    <div className={`relative ${aspectClass} rounded-3xl overflow-hidden shadow-md group/imgcarousel ${className}`}>
      {images.map((img, i) => (
        <Image
          key={i}
          src={img.url}
          alt={img.alt}
          fill
          className={`object-cover transition-opacity duration-500 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={i === 0}
        />
      ))}

      {total > 1 && (
        <>
          <button
            onClick={() => go(index - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center opacity-60 group-hover/imgcarousel:opacity-100 transition-opacity z-10"
            aria-label="Previous image"
          >
            <svg className="w-4 h-4 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => go(index + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center opacity-60 group-hover/imgcarousel:opacity-100 transition-opacity z-10"
            aria-label="Next image"
          >
            <svg className="w-4 h-4 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
