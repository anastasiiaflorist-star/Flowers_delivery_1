'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

type MediaItem =
  | { type: 'image'; url: string; thumb: string; alt: string }
  | { type: 'video'; url: string; caption?: string }

interface ProductGalleryProps {
  images: { url: string; thumb: string; alt: string }[]
  videos: { url: string; caption?: string }[]
  title: string
  featured?: boolean
}

export default function ProductGallery({ images, videos, title, featured }: ProductGalleryProps) {
  const allMedia: MediaItem[] = [
    ...images.map((img) => ({ type: 'image' as const, ...img })),
    ...videos.map((vid) => ({ type: 'video' as const, ...vid })),
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const active = allMedia[activeIndex]
  const total = allMedia.length

  function go(idx: number) {
    const next = (idx + total) % total
    setActiveIndex(next)
    // pause any playing video when switching
    if (videoRef.current) videoRef.current.pause()
  }

  if (total === 0) return <div className="aspect-[4/5] rounded-3xl bg-blush-pale" />

  return (
    <div className="space-y-4">
      {/* Main display */}
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-blush-pale shadow-md">
        {active.type === 'image' ? (
          <Image
            src={active.url}
            alt={active.alt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <video
            ref={videoRef}
            src={active.url}
            controls
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Bestseller badge */}
        {featured && activeIndex === 0 && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full shadow">
              Bestseller
            </span>
          </div>
        )}

        {/* Prev / Next arrows */}
        {total > 1 && (
          <>
            <button
              onClick={() => go(activeIndex - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <svg className="w-4 h-4 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => go(activeIndex + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <svg className="w-4 h-4 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {allMedia.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => go(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${idx === activeIndex ? 'bg-white' : 'bg-white/50'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {total > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {allMedia.map((item, idx) => (
            <button
              key={idx}
              onClick={() => go(idx)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                idx === activeIndex ? 'border-primary' : 'border-blush-light hover:border-primary/50'
              }`}
              aria-label={`View media ${idx + 1}`}
            >
              {item.type === 'image' ? (
                <Image src={item.thumb} alt={item.alt} fill className="object-cover" sizes="80px" />
              ) : (
                <div className="absolute inset-0 bg-dark/10 flex items-center justify-center bg-blush-pale">
                  {/* Play icon */}
                  <svg className="w-7 h-7 text-dark/60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7L8 5z" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
