import type { CollectionConfig } from 'payload'

export const Features: CollectionConfig = {
  slug: 'features',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isActive', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'position',
      type: 'select',
      required: true,
      options: [
        { label: 'Image Left, Text Right', value: 'left' },
        { label: 'Text Left, Image Right', value: 'right' },
      ],
      defaultValue: 'left',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Feature List',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'CTA Button Link',
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
        description: 'Order of appearance on the page',
      },
    },
  ],
  defaultSort: 'order',
}
