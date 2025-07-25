import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'school', 'rating', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Reviewer Name',
    },
    {
      name: 'position',
      type: 'text',
      required: true,
      label: 'Job Position',
    },
    {
      name: 'school',
      type: 'text',
      label: 'School/Institution',
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: 'Testimonial Content',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        description: 'Rating from 1 to 5 stars',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Photo',
    },
    {
      name: 'testimonialTitle',
      type: 'text',
      label: 'Testimonial Title (Optional)',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Order of appearance in testimonial slider',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this testimonial prominently',
      },
    },
  ],
  defaultSort: 'order',
}
