import type { CollectionConfig } from 'payload'

export const PricingPlans: CollectionConfig = {
  slug: 'pricing-plans',
  admin: {
    useAsTitle: 'name',
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
        { label: 'One-time', value: 'once' },
      ],
      defaultValue: 'month',
    },
    {
      name: 'currency',
      type: 'select',
      required: true,
      options: [
        { label: 'USD ($)', value: 'usd' },
        { label: 'IDR (Rp)', value: 'idr' },
        { label: 'EUR (€)', value: 'eur' },
      ],
      defaultValue: 'usd',
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
