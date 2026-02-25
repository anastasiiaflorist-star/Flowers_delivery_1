export interface SanityImageAsset {
  _ref: string
  _type: 'reference'
}

export interface SanityImage {
  asset: SanityImageAsset
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanityVideoAsset {
  _ref: string
  _type: 'reference'
  url?: string // resolved by GROQ asset->url
}

export interface SanityVideo {
  _key?: string
  asset: SanityVideoAsset
  caption?: string
}

export interface Product {
  _id: string
  title: string
  slug: { current: string }
  price: number
  shortDescription?: string
  description?: unknown[]
  category?: string
  inStock: boolean
  featured: boolean
  tags?: string[]
  images?: SanityImage[]
  videos?: SanityVideo[]
}
