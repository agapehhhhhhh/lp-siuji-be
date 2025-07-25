import type { CollectionConfig } from 'payload'

export const WhyChooseSection: CollectionConfig = {
  slug: 'why-choose-section',
  admin: {
    useAsTitle: 'title',
    description: 'Why choose us section content',
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
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
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
        },
      ],
    },
    {
      name: 'sideImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Side Image/Illustration',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default WhyChooseSection
