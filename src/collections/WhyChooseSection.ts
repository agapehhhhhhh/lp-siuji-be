import type { CollectionConfig } from 'payload'

export const WhyChooseSection: CollectionConfig = {
  slug: 'why-choose-section',
  admin: {
    useAsTitle: 'title',
    description: `
      Koleksi ini berisi konten untuk section "Mengapa Memilih Kami" pada landing page.
      
      **Panduan Upload Gambar:**
      - Icon: Gunakan gambar persegi (1:1), ukuran minimal 200x200px, pilih kategori "Why Choose Icon"
      - Side Image: Gunakan gambar landscape (16:9), ukuran minimal 800x450px, pilih kategori "Feature Image"
      
      Anda dapat mengatur judul, subtitle, poin-poin keunggulan, dan gambar pendukung.
      Setiap perubahan akan langsung tampil di frontend section "Why Choose Us".
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
      defaultValue: 'Why Choose Us?',
    },
    {
      name: 'points',
      type: 'array',
      label: 'Value Proposition Points',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Point Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Point Description',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Point Icon',
          admin: {
            description: 'Upload gambar persegi (1:1) untuk icon. Pilih kategori "Why Choose Icon" saat upload.',
          },
          filterOptions: {
            category: { in: ['why-choose-icon', 'general'] }
          }
        },
        {
          name: 'sideImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Side Image/Illustration',
          admin: {
            description: 'Upload gambar landscape (16:9) untuk ilustrasi. Pilih kategori "Feature Image" saat upload.',
          },
          filterOptions: {
            category: { in: ['feature-image', 'general'] }
          }
        },
      ],
    },

    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default WhyChooseSection
