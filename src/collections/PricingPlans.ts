import type { CollectionConfig } from 'payload'

export const PricingPlans: CollectionConfig = {
  slug: 'pricing-plans',
  admin: {
    useAsTitle: 'name',
    description: `
      Koleksi ini berisi rencana harga untuk layanan SIUJI.
      Anda dapat mengelola nama rencana, harga, periode, deskripsi, fitur, dan CTA.
      Setiap rencana dapat diaktifkan/nonaktifkan, dan diurutkan tampilannya.
      Rencana yang ditandai sebagai "populer" akan ditampilkan dengan penekanan khusus.
    `,
    defaultColumns: ['name', 'price', 'period', 'isPopular', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Plan Name',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'period',
      type: 'select',
      required: true,
      options: [
        { label: 'Monthly', value: 'month' },
        { label: 'Yearly', value: 'year' },
      ],
      defaultValue: 'month',
    },
    {
      name: 'currency',
      type: 'select',
      required: true,
      options: [
        { label: 'IDR (Rp)', value: 'idr' },
      ],
      defaultValue: 'idr',
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      label: 'Plan Description',
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
        {
          name: 'isIncluded',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Is this feature included in the plan?',
          },
        },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      required: true,
      label: 'CTA Button Text',
      defaultValue: 'Get Started',
    },
    {
      name: 'ctaLink',
      type: 'text',
      required: true,
      label: 'CTA Button Link',
    },
    {
      name: 'isPopular',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark this plan as most popular (highlight)',
      },
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text (e.g., "Most Popular", "Best Value")',
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
        description: 'Order of appearance on pricing page',
      },
    },
    {
      name: 'limitations',
      type: 'array',
      label: 'Plan Limitations',
      fields: [
        {
          name: 'limitation',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  defaultSort: 'order',
}

export default PricingPlans
