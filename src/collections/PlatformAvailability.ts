import type { CollectionConfig } from 'payload'

export const PlatformAvailability: CollectionConfig = {
  slug: 'platform-availability',
  admin: {
    useAsTitle: 'sectionTitle',
    defaultColumns: ['sectionTitle', 'isActive'],
    description: 'Platform availability section with 3 platform showcase'
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      required: true,
      label: 'Section Headline',
      defaultValue: 'Kini SIUJI Sudah Tersedia di 3 Platform Berbeda',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Section Subtitle',
    },
    {
      name: 'platforms',
      type: 'array',
      label: 'Available Platforms',
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Platform Name',
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          label: 'Platform Slug',
          admin: {
            description: 'Used for platform selection (e.g., "Android", "Website", "IOS")',
          },
        },
        {
          name: 'mockupImage',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Platform UI Mockup',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Platform Description',
        },
        {
          name: 'isDefault',
          type: 'checkbox',
          label: 'Default Selected Platform',
          defaultValue: false,
          admin: {
            description: 'Only one platform should be marked as default',
          },
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          label: 'Display Order',
        },
      ],
    },
    {
      name: 'infoBanner',
      type: 'group',
      label: 'Information Banner',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Banner Text',
          defaultValue: 'Dapatkan akses lengkap ke semua platform SiUJI',
        },
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'Mulai Sekarang',
        },
        {
          name: 'buttonLink',
          type: 'text',
          label: 'Button Link',
          defaultValue: '/register',
        },
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Banner Background Color',
          defaultValue: '#4CC5BD',
          admin: {
            description: 'CSS color value (hex, rgb, etc.)',
          },
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
}

export default PlatformAvailability
