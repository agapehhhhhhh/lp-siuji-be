import { testEmailConfig, sendTestEmail } from './src/services/emailService.js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function testEmailSetup() {
  console.log('🧪 Testing Email Setup...\n')
  
  // Test 1: Check environment variables
  console.log('📋 Environment Variables Check:')
  console.log('EMAIL_SERVICE:', process.env.EMAIL_SERVICE)
  console.log('EMAIL_HOST:', process.env.EMAIL_HOST)
  console.log('EMAIL_PORT:', process.env.EMAIL_PORT)
  console.log('EMAIL_USER:', process.env.EMAIL_USER)
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set' : '❌ Not set')
  console.log('EMAIL_FROM:', process.env.EMAIL_FROM)
  console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL)
  console.log()
  
  // Test 2: Test SMTP connection
  console.log('🔌 Testing SMTP Connection...')
  const configTest = await testEmailConfig()
  if (!configTest.success) {
    console.error('❌ SMTP configuration failed:', configTest.error)
    console.log('\n💡 Troubleshooting Tips:')
    console.log('1. Check your Gmail App Password (16 digits)')
    console.log('2. Make sure 2-Step Verification is enabled')
    console.log('3. Verify EMAIL_USER is your full Gmail address')
    console.log('4. Check if less secure app access is needed (not recommended)')
    return
  }
  console.log('✅ SMTP connection successful!')
  console.log()
  
  // Test 3: Send test email
  console.log('📧 Sending Test Email...')
  const emailTest = await sendTestEmail()
  if (emailTest.success) {
    console.log('✅ Test email sent successfully!')
    console.log('📨 Message ID:', emailTest.messageId)
    console.log('📬 Check your inbox at:', process.env.ADMIN_EMAIL)
  } else {
    console.error('❌ Failed to send test email:', emailTest.error)
  }
  console.log()
  
  console.log('🎉 Email setup test completed!')
}

// Run the test
testEmailSetup().catch(console.error)
