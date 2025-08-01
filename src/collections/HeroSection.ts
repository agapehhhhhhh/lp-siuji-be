import type { CollectionConfig } from 'payload'

export const HeroSection: CollectionConfig = {
  slug: 'hero-section',
  admin: {
    useAsTitle: 'title',
    description: `
      Koleksi ini berisi konten untuk section "Hero" pada landing page.
      Anda dapat mengelola judul, subjudul, deskripsi, dan gambar latar belakang.
      Setiap elemen dapat diaktifkan/nonaktifkan, dan diurutkan tampilannya.
    `,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Main Headline',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
      defaultValue: 'Get Started Now',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image/Illustration',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'ornaments',
      type: 'array',
      label: 'Ornaments',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Ornament Name',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Ornament Image',
        },
        {
          name: 'position',
          type: 'text',
          label: 'Position (optional)',
          required: false,
        },
      ],
    },
  ],
}

export default HeroSection
