import type { CollectionConfig } from 'payload'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'isActive', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'General', value: 'general' },
        { label: 'Features', value: 'features' },
        { label: 'Technical', value: 'technical' },
        { label: 'Pricing', value: 'pricing' },
        { label: 'Account', value: 'account' },
        { label: 'Support', value: 'support' },
      ],
      defaultValue: 'general',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags for better search',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
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
        description: 'Order of appearance in FAQ section',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this FAQ prominently',
      },
    },
    {
      name: 'helpfulCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'How many users found this helpful',
      },
    },
  ],
  defaultSort: 'order',
}
