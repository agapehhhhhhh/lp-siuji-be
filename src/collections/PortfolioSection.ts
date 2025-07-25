import type { CollectionConfig } from 'payload'

export const PortfolioSection: CollectionConfig = {
  slug: 'portfolio-section',
  admin: {
    useAsTitle: 'title',
    description: 'Portfolio/Partners section content',
    defaultColumns: ['title', 'category', 'isActive', 'order']
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Dipercaya Oleh Institusi Terkemuka',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      defaultValue: 'Bergabunglah dengan ribuan institusi yang telah mempercayai SiUJI',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Universities', value: 'university' },
        { label: 'Schools', value: 'school' },
        { label: 'Corporate', value: 'corporate' },
        { label: 'Government', value: 'government' },
        { label: 'Training Centers', value: 'training' },
      ],
      defaultValue: 'university',
    },
    {
      name: 'logos',
      type: 'array',
      label: 'Partner Logos',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Institution Name',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Website URL',
          admin: {
            description: 'Optional: Link to institution website',
          },
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
        },
      ],
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
        description: 'Order of appearance in landing page',
      },
    },
  ],
  defaultSort: 'order',
}

export default PortfolioSection
