import { defineField, defineType } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Treat as singleton — studio users should only ever create one document of this type
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Site Settings',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'aboutImages',
      title: 'About Me — Images',
      description: 'Photos shown in the carousel in the "About Me" section on the homepage.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'servicesImages',
      title: 'Services — Images',
      description: 'Photos shown in the carousel in the "Services" section on the homepage.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
