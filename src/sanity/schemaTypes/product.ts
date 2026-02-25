import { defineField, defineType } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      description: 'Short videos (MP4 / MOV recommended, max ~50 MB each)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'productVideo',
          title: 'Video',
          fields: [
            defineField({
              name: 'asset',
              title: 'Video file',
              type: 'file',
              options: { accept: 'video/*' },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
            }),
          ],
          preview: {
            select: { caption: 'caption' },
            prepare({ caption }: { caption?: string }) {
              return { title: caption || 'Video' }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price (EUR)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Baskets', value: 'baskets' },
          { title: 'Bouquets', value: 'bouquets' },
          { title: 'Flowers in a Box', value: 'flowers-in-a-box' },
        ],
      },
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured / Bestseller',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      price: 'price',
    },
    prepare({ title, media, price }) {
      return {
        title,
        subtitle: price ? `€${price}` : 'No price set',
        media,
      }
    },
  },
})
