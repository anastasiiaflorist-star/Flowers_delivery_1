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
}
