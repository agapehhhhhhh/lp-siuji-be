// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import HeroSection from './collections/HeroSection'
import AboutSection from './collections/AboutSection'
import WhyChooseSection from './collections/WhyChooseSection'
import PortfolioSection from './collections/PortfolioSection'
import { Features  } from './collections/Features'
import { Testimonials } from './collections/Testimonials'
import { PricingPlans } from './collections/PricingPlans'
import { FAQ } from './collections/FrequentlyAskedQuestion'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- SiUJI CMS',
    },
    dateFormat: 'dd/MM/yyyy',
    components: {
      actions: ['/components/header/CustomActions'],
      afterNavLinks: ['/components/sidebar/CustomNavLinks'],
      beforeDashboard: ['/components/WelcomeMessage'],
      graphics: {
        Logo: '/components/payload/Logo',
        Icon: '/components/payload/Icon',
      },
    }
  },
  cors: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:8080',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8080'
  ],
  csrf: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:8080',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8080'
  ],
  collections: [
    Users, 
    Media,
    // Landing Page Sections
    HeroSection,
    AboutSection,
    WhyChooseSection,
    PortfolioSection,
    Features, 
    Testimonials, 
    PricingPlans, 
    FAQ
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
