import type { CollectionConfig } from 'payload'

export const ContactSection: CollectionConfig = {
  slug: 'contact-section',
  admin: {
    useAsTitle: 'title',
    description: 'Contact Us section content for landing page',
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
      defaultValue: 'Hubungi Kami',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      defaultValue: 'Terhubung dengan tim kami untuk solusi ujian online terbaik',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
    },
    // Contact Form Fields Labels
    {
      name: 'formConfig',
      type: 'group',
      label: 'Contact Form Configuration',
      fields: [
        {
          name: 'nameLabel',
          type: 'text',
          label: 'Name Field Label',
          defaultValue: 'Nama',
        },
        {
          name: 'whatsappLabel',
          type: 'text',
          label: 'WhatsApp Field Label',
          defaultValue: 'No WhatsApp',
        },
        {
          name: 'institutionLabel',
          type: 'text',
          label: 'Institution Field Label',
          defaultValue: 'Instansi',
        },
        {
          name: 'messageLabel',
          type: 'text',
          label: 'Message Field Label',
          defaultValue: 'Pesan',
        },
        {
          name: 'submitButtonText',
          type: 'text',
          label: 'Submit Button Text',
          defaultValue: 'Kirim',
        },
        {
          name: 'successMessage',
          type: 'text',
          label: 'Success Message',
          defaultValue: 'Terima kasih! Pesan Anda telah terkirim.',
        },
      ],
    },
    // Contact Information
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'address',
          type: 'textarea',
          label: 'Office Address',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
        },
        {
          name: 'workingHours',
          type: 'text',
          label: 'Working Hours',
          defaultValue: 'Senin - Jumat: 09:00 - 17:00',
        },
        {
          name: 'whatsappNumber',
          type: 'text',
          label: 'WhatsApp Number',
          admin: {
            description: 'Format: +62812345678 (dengan kode negara)',
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

export default ContactSection
