import type { CollectionConfig } from 'payload'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'question',
    description: `
      Koleksi ini berisi pertanyaan yang sering diajukan (FAQ) pada landing page.
      Anda dapat mengelola pertanyaan, jawaban, kategori, dan tag untuk memudahkan pencarian.
      Setiap FAQ dapat diaktifkan/nonaktifkan, dan diurutkan tampilannya.
    `,
    defaultColumns: ['question', 'category', 'isActive'],
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
  ],
  defaultSort: 'order',
}
