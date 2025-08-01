import type { CollectionConfig } from 'payload'

export const PortfolioSection: CollectionConfig = {
  slug: 'portfolio-section',
  admin: {
    useAsTitle: 'title',
    description: `
      Koleksi ini berisi konten untuk section "Portofolio" pada landing page.
      Anda dapat mengelola judul, deskripsi, dan logo mitra yang ditampilkan.
      Setiap logo dapat diaktifkan/nonaktifkan, dan diurutkan tampilannya.
    `,
    defaultColumns: ['title', 'isActive', 'order']
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Trusted by Companies Worldwide',
      admin: {
        description: 'Section title displayed above the logos',
      },
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
        description: 'Order of appearance (lower numbers appear first)',
      },
    },
  ],
  defaultSort: 'order',
}

export default PortfolioSection
