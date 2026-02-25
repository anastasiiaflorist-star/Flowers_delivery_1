import { groq } from 'next-sanity'

export const ALL_PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    price,
    shortDescription,
    category,
    inStock,
    featured,
    images[] {
      asset,
      hotspot,
      crop
    }
  }
`

export const FEATURED_PRODUCTS_QUERY = groq`
  *[_type == "product" && featured == true] | order(_createdAt desc) [0...8] {
    _id,
    title,
    slug,
    price,
    shortDescription,
    category,
    inStock,
    images[] {
      asset,
      hotspot,
      crop
    }
  }
`

export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    price,
    description,
    shortDescription,
    category,
    inStock,
    featured,
    tags,
    images[] {
      asset,
      hotspot,
      crop
    }
  }
`

export const PRODUCT_SLUGS_QUERY = groq`
  *[_type == "product"] {
    "slug": slug.current
  }
`
