import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config.js'
import { seedLandingPageCollections } from './seedLandingPageCollections.js'

// Debug environment variables
console.log('🔍 Environment check:')
console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? '✅ Found' : '❌ Missing')
console.log('DATABASE_URI:', process.env.DATABASE_URI ? '✅ Found' : '❌ Missing')

// Show DATABASE_URI for debugging (hide password)
if (process.env.DATABASE_URI) {
  const dbUri = process.env.DATABASE_URI.replace(/:([^:@]*?)@/, ':***@')
  console.log('DATABASE_URI:', dbUri)
}

console.log('Current working directory:', process.cwd())

// Only show first 10 chars of secret for security
if (process.env.PAYLOAD_SECRET) {
  console.log('PAYLOAD_SECRET preview:', process.env.PAYLOAD_SECRET.substring(0, 10) + '...')
}

async function seed() {
  // Validate required environment variables
  if (!process.env.PAYLOAD_SECRET) {
    console.error('❌ PAYLOAD_SECRET is required')
    process.exit(1)
  }
  
  if (!process.env.DATABASE_URI) {
    console.error('❌ DATABASE_URI is required')
    process.exit(1)
  }

  // Validate DATABASE_URI format
  try {
    const dbUrl = new URL(process.env.DATABASE_URI)
    console.log('🔗 Database connection details:')
    console.log('   Host:', dbUrl.hostname)
    console.log('   Port:', dbUrl.port)
    console.log('   Database:', dbUrl.pathname.slice(1))
    console.log('   User:', dbUrl.username)
  } catch (error) {
    console.error('❌ Invalid DATABASE_URI format:', error)
    process.exit(1)
  }

  try {
    console.log('🚀 Initializing Payload...')
    const payload = await getPayload({ config })
    console.log('✅ Payload initialized successfully')

    console.log('🌱 Starting to seed all landing page collections...')
    await seedLandingPageCollections(payload)

    console.log('🎉 All landing page collections seeded successfully!')
    
  } catch (error) {
    console.error('❌ Error seeding landing page collections:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
      console.error('Stack trace:', error.stack)
    }
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

seed().catch((error) => {
  console.error('❌ Unhandled error in seed function:', error)
  process.exit(1)
})