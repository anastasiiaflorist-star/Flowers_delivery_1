import { defineField, defineType } from 'sanity'

export const tableStylingSchema = defineType({
  name: 'tableStyling',
  title: 'Table Styling',
  type: 'document',
  // Singleton — only one document of this type should exist
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Table Styling',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'intro',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 3,
      initialValue:
        'We create elegant floral table styling designed to transform your celebration into a refined visual experience.',
    }),
    defineField({
      name: 'body',
      title: 'Body Paragraphs',
      description: 'Each block is rendered as a separate paragraph on the page.',
      type: 'array',
      of: [{ type: 'block' }],
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
          name: 'tableStylingVideo',
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
  ],
  preview: {
    prepare() {
      return { title: 'Table Styling' }
    },
  },
})
