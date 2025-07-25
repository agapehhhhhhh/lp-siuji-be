import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'isActive', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Company/Institution Name',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Company Logo',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'School', value: 'school' },
        { label: 'University', value: 'university' },
        { label: 'Company', value: 'company' },
        { label: 'Government', value: 'government' },
        { label: 'NGO', value: 'ngo' },
      ],
      defaultValue: 'school',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Brief Description',
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website URL',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location/City',
    },
    {
      name: 'partnershipDate',
      type: 'date',
      label: 'Partnership Start Date',
    },
    {
      name: 'studentCount',
      type: 'number',
      label: 'Number of Students (if applicable)',
      min: 0,
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
        description: 'Order of appearance in partners section',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this partner prominently',
      },
    },
  ],
  defaultSort: 'order',
}

export default Partners
