import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    description: `
      Koleksi media untuk mengelola semua gambar dan file yang digunakan di landing page.
      
      **Panduan Upload:**
      - Why Choose Icon: Gambar persegi (1:1), minimal 200x200px
      - Hero Ornament: Gambar persegi (1:1), minimal 150x150px  
      - Feature Image: Gambar landscape (16:9), minimal 800x450px
      - Avatar: Gambar persegi (1:1), minimal 150x150px
      - Logo: Format PNG/SVG dengan background transparan
      
      Pilih kategori yang sesuai agar gambar dapat difilter dengan mudah di section lain.
    `,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Deskripsi gambar untuk aksesibilitas (SEO)',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Image Category',
      required: true,
      defaultValue: 'general',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Why Choose Icon', value: 'why-choose-icon' },
        { label: 'Hero Ornament', value: 'hero-ornament' },
        { label: 'Feature Image', value: 'feature-image' },
        { label: 'Avatar/Profile', value: 'avatar' },
        { label: 'Logo/Brand', value: 'logo' },
        { label: 'About Section', value: 'about-image' },
        { label: 'Portfolio Logo', value: 'portfolio-logo' },
      ],
      admin: {
        description: 'Kategori membantu filtering gambar di section tertentu',
      },
    },
  ],
  upload: {
    staticDir: 'media',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'why-choose-icon',
        width: 200,
        height: 200,
        crop: 'center',
      },
      {
        name: 'hero-ornament', 
        width: 150,
        height: 150,
        crop: 'center',
      },
      {
        name: 'feature-image',
        width: 800,
        height: 450, // 16:9 ratio
        crop: 'center',
      },
      {
        name: 'avatar',
        width: 150,
        height: 150,
        crop: 'center',
      },
      {
        name: 'logo',
        width: 300,
        height: 120,
        crop: 'center',
      },
      {
        name: 'thumbnail',
        width: 100,
        height: 100,
        crop: 'center',
      },
    ],
  },
}
