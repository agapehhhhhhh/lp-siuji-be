import type { CollectionConfig } from 'payload'
import { sendAdminNotification, sendAutoReply } from '../services/emailService'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  admin: {
    useAsTitle: 'name',
    description: `
      Koleksi ini berisi pesan dari form "Contact Us" di landing page.
      Setiap kali ada pengunjung yang mengisi form kontak, data akan tersimpan di sini
      dan email notifikasi otomatis akan dikirim ke admin dan user.
      
      Admin dapat:
      - Melihat semua pesan masuk
      - Mengubah status pesan (New, In Progress, Resolved)  
      - Menambahkan catatan internal
      - Email otomatis dikirim ke admin dan user
    `,
    defaultColumns: ['name', 'email', 'status', 'emailSent', 'createdAt'],
    group: 'Landing Page',
  },
  access: {
    read: () => true,
    create: () => true, // Allow frontend to create
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name/Institution',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Resolved', value: 'resolved' },
      ],
      defaultValue: 'new',
      admin: {
        description: 'Track the status of this contact message',
      },
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'Admin Notes',
      admin: {
        description: 'Internal notes for admin use only',
      },
    },
    {
      name: 'source',
      type: 'text',
      label: 'Source',
      defaultValue: 'Landing Page Contact Form',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      label: 'User Agent',
      admin: {
        readOnly: true,
        description: 'Browser/device information',
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      label: 'IP Address',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'emailSent',
      type: 'checkbox',
      label: 'Email Notifications Sent',
      defaultValue: false,
      admin: {
        readOnly: true,
        description: 'Indicates if email notifications were sent successfully',
      },
    },
    {
      name: 'emailDetails',
      type: 'group',
      label: 'Email Details',
      admin: {
        condition: (data) => data.emailSent === true,
        description: 'Detail pengiriman email',
      },
      fields: [
        {
          name: 'adminEmailSent',
          type: 'checkbox',
          label: 'Admin Email Sent',
          defaultValue: false,
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'userEmailSent',
          type: 'checkbox',
          label: 'User Auto-Reply Sent',
          defaultValue: false,
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'adminMessageId',
          type: 'text',
          label: 'Admin Email Message ID',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'userMessageId',
          type: 'text',
          label: 'User Email Message ID',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'emailSentAt',
          type: 'date',
          label: 'Email Sent At',
          admin: {
            readOnly: true,
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
      ],
    },
  ],
    hooks: {
    afterChange: [
        async ({ doc, operation, req }) => {
        // Send email notifications when new contact message is created
        if (operation === 'create') {
            console.log('🔔 New contact message received:', doc.name, '-', doc.email)
            
            try {
            const contactData = {
                id: doc.id,
                name: doc.name,
                email: doc.email,
                phone: doc.phone,
                message: doc.message,
            }

            // Send email notifications in parallel
            const [adminResult, userResult] = await Promise.allSettled([
                sendAdminNotification(contactData),
                sendAutoReply(contactData)
            ])

            // Check results
            const adminSuccess = adminResult.status === 'fulfilled' && adminResult.value.success
            const userSuccess = userResult.status === 'fulfilled' && userResult.value.success

            // Prepare email details with proper date formatting
            const emailDetails: any = {
                adminEmailSent: adminSuccess,
                userEmailSent: userSuccess,
                emailSentAt: new Date().toISOString(), // Convert Date to ISO string
            }

            if (adminSuccess && adminResult.status === 'fulfilled') {
                emailDetails.adminMessageId = adminResult.value.messageId
            }

            if (userSuccess && userResult.status === 'fulfilled') {
                emailDetails.userMessageId = userResult.value.messageId
            }

            // Update document with email status
            await req.payload.update({
                collection: 'contact-messages',
                id: doc.id,
                data: {
                    emailSent: adminSuccess && userSuccess,
                    emailDetails,
                }
            })

            // ...existing success/error logging...

            } catch (error) {
            console.error('❌ Failed to send email notifications:', error)
            
            // Update document to mark email as failed
            try {
                await req.payload.update({
                    collection: 'contact-messages',
                    id: doc.id,
                    data: {
                        emailSent: false,
                        emailDetails: {
                            adminEmailSent: false,
                            userEmailSent: false,
                            emailSentAt: new Date().toISOString(),
                        },
                    }
                })
            } catch (updateError) {
                console.error('❌ Failed to update email status:', updateError)
            }
            }
        }
        },
    ],
    },
}

export default ContactMessages
