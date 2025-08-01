import type { CollectionConfig } from 'payload'

export const AboutSection: CollectionConfig = {
  slug: 'about-section',
  admin: {
    useAsTitle: 'title',
    description: `
      Koleksi ini berisi konten untuk section "Tentang SIUJI" pada landing page.
      Anda dapat mengelola judul, subjudul, deskripsi utama, serta carousel slides (misal: "Untuk Guru", "Untuk Siswa") yang tampil di frontend.
      Setiap slide dapat berisi gambar, judul, deskripsi, dan urutan tampil. Gambar yang diunggah akan muncul di carousel About Section pada website.
      Perubahan data di sini akan langsung memengaruhi tampilan section About di halaman depan website SIUJI.
    `,
    defaultColumns: ['title', 'isActive']
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'What is SIUJI?',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Main Description',
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Carousel Slides (For Teacher/Student)',
      minRows: 2,
      maxRows: 3,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Slide Title (e.g., "For Teacher", "For Student")',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Slide Description',
        },
        {
          name: 'images',
          type: 'array',
          label: 'Slide Images (for stacking effect)',
          minRows: 1,
          maxRows: 4,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'alt',
              type: 'text',
              label: 'Alt Text',
            },
            {
              name: 'order',
              type: 'number',
              defaultValue: 0,
            },
          ],
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          label: 'Slide Order',
        },
      ],
    },
    {
      name: 'rotatingImages',
      type: 'array',
      label: 'Stack Background Images',
      maxRows: 4,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'carouselConfig',
      type: 'group',
      label: 'Carousel Configuration',
      fields: [
        {
          name: 'autoSlide',
          type: 'checkbox',
          label: 'Auto Slide',
          defaultValue: true,
        },
        {
          name: 'slideInterval',
          type: 'number',
          label: 'Slide Interval (ms)',
          defaultValue: 3000,
          admin: {
            condition: (data) => data.autoSlide === true,
          },
        },
        {
          name: 'pauseOnHover',
          type: 'checkbox',
          label: 'Pause on Hover',
          defaultValue: true,
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

export default AboutSection
