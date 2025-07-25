# 📚 SiUJI CMS Backend - API Documentation

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![PayloadCMS](https://img.shields.io/badge/PayloadCMS-3.47.0-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black.svg)

Dokumentasi lengkap untuk SiUJI CMS Backend API yang menyediakan endpoints untuk mengelola konten landing page.

## 🌐 Base URL

```
Development: http://localhost:3000
Production: https://your-domain.com
```

## 🔐 Authentication

SiUJI CMS menggunakan JWT-based authentication untuk admin endpoints.

### Login Admin
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "admin@siuji.com",
  "password": "your-password"
}
```

**Response:**
```json
{
  "user": {
    "id": "64f123...",
    "email": "admin@siuji.com",
    "roles": ["admin"]
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "exp": 1234567890
}
```

### Logout
```http
POST /api/users/logout
Authorization: Bearer {token}
```

## 📋 Collections & Endpoints

### 1. 🏠 Hero Section
**Slug:** `hero-section`

#### Get Hero Section
```http
GET /api/hero-section
```

**Response:**
```json
{
  "docs": [
    {
      "id": "64f123...",
      "title": "Platform Ujian Online Modern untuk Pendidikan Indonesia",
      "subtitle": "Revolusi Cara Belajar dan Mengajar",
      "description": "SiUJI menyediakan platform ujian online yang modern...",
      "ctaText": "Mulai Sekarang",
      "ctaUrl": "/register",
      "backgroundImage": {
        "id": "64f456...",
        "url": "/media/hero-bg.jpg",
        "alt": "Hero Background"
      },
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "totalDocs": 1,
  "page": 1,
  "totalPages": 1
}
```

#### Create/Update Hero Section (Admin)
```http
POST /api/hero-section
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Platform Ujian Online Modern",
  "subtitle": "Revolusi Cara Belajar",
  "description": "SiUJI menyediakan platform ujian online...",
  "ctaText": "Mulai Sekarang",
  "ctaUrl": "/register",
  "backgroundImage": "64f456...",
  "isActive": true
}
```

### 2. ⭐ Features
**Slug:** `features`

#### Get All Features
```http
GET /api/features?sort=order&where[isActive][equals]=true
```

**Response:**
```json
{
  "docs": [
    {
      "id": "64f789...",
      "title": "Ujian Online Real-time",
      "description": "Sistem ujian online dengan monitoring real-time dan anti-cheating",
      "icon": {
        "url": "/media/icon-exam.svg",
        "alt": "Exam Icon"
      },
      "image": {
        "url": "/media/feature-exam.jpg",
        "alt": "Online Exam Feature"
      },
      "order": 1,
      "isActive": true,
      "category": "core",
      "features": [
        "Timer otomatis",
        "Multiple choice questions",
        "Essay questions support"
      ]
    }
  ],
  "totalDocs": 6,
  "page": 1,
  "totalPages": 1
}
```

### 3. ℹ️ About Section
**Slug:** `about-section`

#### Get About Section
```http
GET /api/about-section
```

**Response:**
```json
{
  "docs": [
    {
      "id": "64f321...",
      "title": "Tentang SiUJI",
      "subtitle": "Platform Ujian Online Terpercaya",
      "description": "SiUJI adalah platform ujian online yang dirancang khusus...",
      "image": {
        "url": "/media/about-image.jpg",
        "alt": "About SiUJI"
      },
      "stats": [
        {
          "label": "Pengguna Aktif",
          "value": "10,000+",
          "icon": "users"
        },
        {
          "label": "Ujian Selesai",
          "value": "50,000+",
          "icon": "check-circle"
        }
      ],
      "isActive": true
    }
  ]
}
```

### 4. ❓ FAQ (Frequently Asked Questions)
**Slug:** `faq`

#### Get All FAQ
```http
GET /api/faq?sort=order&where[isActive][equals]=true
```

**Response:**
```json
{
  "docs": [
    {
      "id": "64f654...",
      "question": "Bagaimana cara mendaftar di SiUJI?",
      "answer": "Anda dapat mendaftar dengan mengklik tombol 'Daftar'...",
      "category": "registration",
      "order": 1,
      "isActive": true,
      "tags": ["pendaftaran", "akun"]
    }
  ],
  "totalDocs": 8,
  "page": 1,
  "totalPages": 1
}
```

### 5. 💬 Testimonials
**Slug:** `testimonials`

#### Get All Testimonials
```http
GET /api/testimonials?sort=-createdAt&where[isActive][equals]=true&limit=6
```

**Response:**
```json
{
  "docs": [
    {
      "id": "64f987...",
      "name": "Dr. Ahmad Sutrisno",
      "position": "Kepala Sekolah",
      "institution": "SMA Negeri 1 Jakarta",
      "testimonial": "SiUJI sangat membantu kami dalam melaksanakan ujian online...",
      "rating": 5,
      "avatar": {
        "url": "/media/avatar-ahmad.jpg",
        "alt": "Dr. Ahmad Sutrisno"
      },
      "isActive": true,
      "featured": true,
      "createdAt": "2024-01-10T14:20:00.000Z"
    }
  ],
  "totalDocs": 12,
  "page": 1,
  "totalPages": 2
}
```

### 6. 💰 Pricing Plans
**Slug:** `pricing-plans`

#### Get All Pricing Plans
```http
GET /api/pricing-plans?sort=order&where[isActive][equals]=true
```

**Response:**
```json
{
  "docs": [
    {
      "id": "64f246...",
      "name": "Basic",
      "description": "Paket dasar untuk sekolah kecil",
      "price": 500000,
      "currency": "IDR",
      "billingPeriod": "monthly",
      "features": [
        "Hingga 100 siswa",
        "Ujian tidak terbatas",
        "Laporan basic",
        "Support email"
      ],
      "isPopular": false,
      "isActive": true,
      "order": 1,
      "ctaText": "Pilih Paket",
      "ctaUrl": "/register?plan=basic"
    },
    {
      "id": "64f247...",
      "name": "Professional",
      "description": "Paket lengkap untuk sekolah menengah",
      "price": 1000000,
      "currency": "IDR",
      "billingPeriod": "monthly",
      "features": [
        "Hingga 500 siswa",
        "Ujian tidak terbatas",
        "Laporan advanced",
        "Anti-cheating system",
        "Support prioritas"
      ],
      "isPopular": true,
      "isActive": true,
      "order": 2
    }
  ]
}
```

### 7. 🤝 Partners
**Slug:** `partners`

#### Get All Partners
```http
GET /api/partners?where[isActive][equals]=true&sort=order
```

**Response:**
```json
{
  "docs": [
    {
      "id": "64f135...",
      "name": "Kemendikbud RI",
      "description": "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi",
      "logo": {
        "url": "/media/logo-kemendikbud.png",
        "alt": "Logo Kemendikbud"
      },
      "website": "https://www.kemdikbud.go.id",
      "partnerType": "government",
      "isActive": true,
      "order": 1
    }
  ]
}
```

### 8. 📞 Contact Section
**Slug:** `contact-section`

#### Get Contact Information
```http
GET /api/contact-section
```

**Response:**
```json
{
  "docs": [
    {
      "id": "64f468...",
      "title": "Hubungi Kami",
      "subtitle": "Tim support siap membantu Anda 24/7",
      "email": "support@siuji.com",
      "phone": "+62 21 1234 5678",
      "whatsapp": "+62 812 3456 7890",
      "address": "Jl. Teknologi No. 123, Jakarta Selatan",
      "workingHours": "Senin - Jumat: 08:00 - 17:00 WIB",
      "socialMedia": [
        {
          "platform": "facebook",
          "url": "https://facebook.com/siuji.official",
          "icon": "facebook"
        },
        {
          "platform": "instagram", 
          "url": "https://instagram.com/siuji.official",
          "icon": "instagram"
        }
      ],
      "isActive": true
    }
  ]
}
```

### 9. 💼 Portfolio Section
**Slug:** `portfolio-section`

#### Get Portfolio
```http
GET /api/portfolio-section?where[isActive][equals]=true&sort=-createdAt
```

### 10. 🎯 Why Choose Section
**Slug:** `why-choose-section`

#### Get Why Choose Content
```http
GET /api/why-choose-section
```

### 11. 🌐 Platform Availability
**Slug:** `platform-availability`

#### Get Platform Info
```http
GET /api/platform-availability
```

### 12. 📁 Media
**Slug:** `media`

#### Get Media Files
```http
GET /api/media?limit=20&page=1
```

#### Upload Media (Admin)
```http
POST /api/media
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: [binary data]
alt: "Image description"
```

## 🔍 GraphQL API

### GraphQL Endpoint
```http
POST /api/graphql
Content-Type: application/json

{
  "query": "query GetHeroSection { HeroSection { docs { id title subtitle description } } }"
}
```

### GraphQL Playground (Development)
```
http://localhost:3000/api/graphql-playground
```

## 📊 Query Parameters

### Pagination
```http
GET /api/features?page=1&limit=10
```

### Sorting
```http
GET /api/testimonials?sort=-createdAt
GET /api/features?sort=order
```

### Filtering
```http
GET /api/features?where[isActive][equals]=true
GET /api/testimonials?where[rating][gte]=4
GET /api/faq?where[category][equals]=registration
```

### Select Fields
```http
GET /api/features?select=title,description,image
```

### Populate Relations
```http
GET /api/features?populate=icon,image
```

## 🚨 Error Responses

### 400 Bad Request
```json
{
  "errors": [
    {
      "message": "Validation failed",
      "field": "title",
      "value": ""
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "errors": [
    {
      "message": "Unauthorized",
      "code": "UNAUTHORIZED"
    }
  ]
}
```

### 404 Not Found
```json
{
  "errors": [
    {
      "message": "Document not found",
      "code": "NOT_FOUND"
    }
  ]
}
```

### 500 Internal Server Error
```json
{
  "errors": [
    {
      "message": "Internal server error",
      "code": "INTERNAL_ERROR"
    }
  ]
}
```

## 🛠️ Implementation Examples

### Frontend Integration (Vue.js/React)

#### Service Layer
```javascript
// services/api.js
import axios from 'axios'

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const siujiAPI = {
  // Hero Section
  getHeroSection: () => api.get('/api/hero-section'),
  
  // Features
  getFeatures: (params = {}) => api.get('/api/features', { params }),
  
  // FAQ
  getFAQ: (params = {}) => api.get('/api/faq', { params }),
  
  // Testimonials
  getTestimonials: (params = {}) => api.get('/api/testimonials', { params }),
  
  // Pricing
  getPricingPlans: () => api.get('/api/pricing-plans?where[isActive][equals]=true&sort=order'),
  
  // Contact
  getContactInfo: () => api.get('/api/contact-section'),
  
  // Auth
  login: (credentials) => api.post('/api/users/login', credentials),
  logout: () => api.post('/api/users/logout')
}
```

#### Vue.js Composable
```javascript
// composables/useSiujiAPI.js
import { ref, onMounted } from 'vue'
import { siujiAPI } from '@/services/api'

export function useHeroSection() {
  const heroData = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchHeroSection = async () => {
    try {
      loading.value = true
      const response = await siujiAPI.getHeroSection()
      heroData.value = response.data.docs[0]
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchHeroSection()
  })

  return {
    heroData,
    loading,
    error,
    refetch: fetchHeroSection
  }
}

export function useFeatures() {
  const features = ref([])
  const loading = ref(false)

  const fetchFeatures = async () => {
    try {
      loading.value = true
      const response = await siujiAPI.getFeatures({
        'where[isActive][equals]': true,
        sort: 'order'
      })
      features.value = response.data.docs
    } catch (err) {
      console.error('Error fetching features:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    features,
    loading,
    fetchFeatures
  }
}
```

#### React Hook
```javascript
// hooks/useSiujiAPI.js
import { useState, useEffect } from 'react'
import { siujiAPI } from '../services/api'

export function useHeroSection() {
  const [heroData, setHeroData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHeroSection = async () => {
      try {
        setLoading(true)
        const response = await siujiAPI.getHeroSection()
        setHeroData(response.data.docs[0])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroSection()
  }, [])

  return { heroData, loading, error }
}
```

### Component Examples

#### Vue.js Component
```vue
<!-- components/HeroSection.vue -->
<template>
  <section class="hero-section">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="heroData" class="hero-content">
      <h1>{{ heroData.title }}</h1>
      <h2>{{ heroData.subtitle }}</h2>
      <p>{{ heroData.description }}</p>
      <a :href="heroData.ctaUrl" class="cta-button">
        {{ heroData.ctaText }}
      </a>
    </div>
  </section>
</template>

<script setup>
import { useHeroSection } from '@/composables/useSiujiAPI'

const { heroData, loading, error } = useHeroSection()
</script>
```

#### React Component
```jsx
// components/HeroSection.jsx
import React from 'react'
import { useHeroSection } from '../hooks/useSiujiAPI'

export default function HeroSection() {
  const { heroData, loading, error } = useHeroSection()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!heroData) return null

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>{heroData.title}</h1>
        <h2>{heroData.subtitle}</h2>
        <p>{heroData.description}</p>
        <a href={heroData.ctaUrl} className="cta-button">
          {heroData.ctaText}
        </a>
      </div>
    </section>
  )
}
```

## 🔒 Security Best Practices

1. **Always validate data** on both frontend and backend
2. **Use HTTPS** in production
3. **Implement CORS** properly
4. **Rate limiting** for API endpoints
5. **Sanitize user inputs**
6. **Regular security updates**

## 📝 Development Workflow

1. **Start CMS Backend:**
   ```bash
   cd LandingPage-SIUJI-CMS
   npm run dev
   ```

2. **Access Admin Panel:**
   ```
   http://localhost:3000/admin
   ```

3. **Test API Endpoints:**
   ```bash
   curl http://localhost:3000/api/hero-section
   ```

4. **Frontend Development:**
   ```bash
   cd LandingPage-SIUJI-Frontend
   npm run dev
   ```

## 🚀 Production Deployment

1. **Environment Variables:**
   ```env
   NODE_ENV=production
   PAYLOAD_SECRET=your-production-secret
   DATABASE_URI=your-production-db-uri
   SERVER_URL=https://cms.siuji.com
   ```

2. **Docker Deployment:**
   ```bash
   npm run docker:prod
   ```

3. **CORS Configuration:**
   ```javascript
   CORS_ORIGINS=https://siuji.com,https://www.siuji.com
   ```

---

**📞 Support:** support@siuji.com  
**📚 Documentation:** [docs.siuji.com](https://docs.siuji.com)  
**🐛 Issues:** [github.com/siuji/issues](https://github.com/siuji/issues)
