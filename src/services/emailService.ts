import nodemailer from 'nodemailer'

// Create email transporter
const createTransporter = () => {
  console.log('📧 Creating email transporter...')
  console.log('EMAIL_SERVICE:', process.env.EMAIL_SERVICE)
  console.log('EMAIL_HOST:', process.env.EMAIL_HOST)
  console.log('EMAIL_USER:', process.env.EMAIL_USER)
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set' : '❌ Not set')

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true', // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// Interface for contact data
interface ContactData {
  id?: string
  name: string
  email: string
  phone: string
  message: string
}

// Send notification to admin
export const sendAdminNotification = async (contactData: ContactData) => {
  try {
    console.log('📬 Sending admin notification email...')
    const transporter = createTransporter()
    
    const adminMailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@siuji.com',
      to: process.env.ADMIN_EMAIL || 'admin@siuji.com',
      subject: `🔔 Pesan Baru dari ${contactData.name} - Landing Page SIUJI`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <div style="background-color: #38b2ac; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="margin: 0;">📬 Pesan Baru dari Landing Page</h2>
          </div>
          
          <div style="padding: 20px; background-color: #f9f9f9;">
            <h3 style="color: #333; margin-top: 0;">Detail Pesan:</h3>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd; width: 120px;">Nama/Institusi:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${contactData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Email:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">
                  <a href="mailto:${contactData.email}" style="color: #38b2ac;">${contactData.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Telepon:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">
                  <a href="tel:${contactData.phone}" style="color: #38b2ac;">${contactData.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Waktu:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date().toLocaleString('id-ID')}</td>
              </tr>
            </table>
            
            <h4 style="color: #333; margin-top: 20px;">Pesan:</h4>
            <div style="background-color: white; padding: 15px; border-radius: 6px; border-left: 4px solid #38b2ac;">
              ${contactData.message.replace(/\n/g, '<br>')}
            </div>
            
            ${contactData.id ? `
            <div style="margin-top: 20px; text-align: center;">
              <a href="${process.env.SERVER_URL}/admin/collections/contact-messages/${contactData.id}" 
                 style="background-color: #38b2ac; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                📝 Lihat di CMS
              </a>
            </div>
            ` : ''}
          </div>
          
          <div style="padding: 15px; background-color: #f0f0f0; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px; color: #666;">
            Email otomatis dari Landing Page SIUJI - ${process.env.COMPANY_NAME || 'PT. Someah Kreatif Nusantara'}
          </div>
        </div>
      `
    }

    const result = await transporter.sendMail(adminMailOptions)
    console.log('✅ Admin notification email sent successfully:', result.messageId)
    
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('❌ Failed to send admin notification email:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return { success: false, error: errorMessage }
  }
}

// Send auto-reply to user
export const sendAutoReply = async (contactData: ContactData) => {
  try {
    console.log('📧 Sending auto-reply email to user...')
    const transporter = createTransporter()
    
    const userMailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@siuji.com',
      to: contactData.email,
      subject: '✅ Terima kasih telah menghubungi SIUJI',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <div style="background-color: #38b2ac; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="margin: 0;">🎉 Terima Kasih ${contactData.name}!</h2>
          </div>
          
          <div style="padding: 20px;">
            <p style="font-size: 16px; line-height: 1.6;">
              Terima kasih telah menghubungi <strong>SIUJI</strong>. Kami telah menerima pesan Anda dan akan merespon sesegera mungkin.
            </p>
            
            <div style="background-color: #f0f8ff; padding: 15px; border-radius: 6px; border-left: 4px solid #38b2ac; margin: 20px 0;">
              <h4 style="margin-top: 0; color: #333;">📋 Ringkasan Pesan Anda:</h4>
              <p style="margin: 5px 0;"><strong>Nama:</strong> ${contactData.name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${contactData.email}</p>
              <p style="margin: 5px 0;"><strong>Telepon:</strong> ${contactData.phone}</p>
              <p style="margin: 5px 0; margin-top: 10px;"><strong>Pesan:</strong></p>
              <div style="background-color: white; padding: 10px; border-radius: 4px; margin-top: 5px;">
                ${contactData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <p style="font-size: 14px; color: #666; line-height: 1.6;">
              Tim kami akan menghubungi Anda dalam <strong>1-2 hari kerja</strong>. 
              Jika ada pertanyaan mendesak, Anda dapat menghubungi kami langsung di:
            </p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>📞 Telepon:</strong> +62-XXX-XXXX-XXXX</p>
              <p style="margin: 5px 0;"><strong>📧 Email:</strong> support@siuji.com</p>
              <p style="margin: 5px 0;"><strong>🌐 Website:</strong> <a href="https://siuji.com" style="color: #38b2ac;">www.siuji.com</a></p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.FRONTEND_URL || 'https://siuji.com'}" 
                 style="background-color: #38b2ac; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                🚀 Kunjungi Website SIUJI
              </a>
            </div>
          </div>
          
          <div style="padding: 15px; background-color: #f0f0f0; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px; color: #666;">
            Email otomatis dari SIUJI - ${process.env.COMPANY_NAME || 'PT. Someah Kreatif Nusantara'}<br>
            Mohon jangan balas email ini. Untuk bantuan, hubungi support@siuji.com
          </div>
        </div>
      `
    }

    const result = await transporter.sendMail(userMailOptions)
    console.log('✅ Auto-reply email sent successfully to', contactData.email, '- Message ID:', result.messageId)
    
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('❌ Failed to send auto-reply email:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return { success: false, error: errorMessage }
  }
}

// Test email configuration
export const testEmailConfig = async () => {
  try {
    console.log('🧪 Testing email configuration...')
    const transporter = createTransporter()
    
    // Verify SMTP connection
    await transporter.verify()
    console.log('✅ Email configuration is valid')
    
    return { success: true, message: 'Email configuration is valid' }
  } catch (error) {
    console.error('❌ Email configuration is invalid:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return { success: false, error: errorMessage }
  }
}

// Send test email
export const sendTestEmail = async (toEmail?: string) => {
  try {
    console.log('📧 Sending test email...')
    const transporter = createTransporter()
    
    const testMailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@siuji.com',
      to: toEmail || process.env.ADMIN_EMAIL || 'admin@siuji.com',
      subject: '🧪 Test Email dari SIUJI CMS',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <div style="background-color: #38b2ac; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="margin: 0;">🧪 Test Email</h2>
          </div>
          
          <div style="padding: 20px;">
            <p style="font-size: 16px; line-height: 1.6;">
              Ini adalah email test dari sistem SIUJI CMS.
            </p>
            
            <div style="background-color: #f0f8ff; padding: 15px; border-radius: 6px; border-left: 4px solid #38b2ac; margin: 20px 0;">
              <h4 style="margin-top: 0; color: #333;">📊 Informasi Test:</h4>
              <p style="margin: 5px 0;"><strong>Waktu:</strong> ${new Date().toLocaleString('id-ID')}</p>
              <p style="margin: 5px 0;"><strong>Server:</strong> ${process.env.SERVER_URL}</p>
              <p style="margin: 5px 0;"><strong>Environment:</strong> ${process.env.NODE_ENV}</p>
            </div>
            
            <p style="font-size: 14px; color: #666; line-height: 1.6;">
              Jika Anda menerima email ini, berarti konfigurasi email sudah bekerja dengan baik! 🎉
            </p>
          </div>
          
          <div style="padding: 15px; background-color: #f0f0f0; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px; color: #666;">
            Test Email dari SIUJI CMS - ${process.env.COMPANY_NAME || 'PT. Someah Kreatif Nusantara'}
          </div>
        </div>
      `
    }

    const result = await transporter.sendMail(testMailOptions)
    console.log('✅ Test email sent successfully:', result.messageId)
    
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('❌ Failed to send test email:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return { success: false, error: errorMessage }
  }
}
