#  SIUJI CMS Backend

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-20.x-brightgreen.svg)
![Docker](https://img.shields.io/badge/docker-ready-blue.svg)
![Payload](https://img.shields.io/badge/payload-3.x-blue.svg)
![PostgreSQL](https://img.shields.io/badge/postgresql-15-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-ready-blue.svg)

Backend CMS untuk platform SIUJI yang dibangun dengan **Payload CMS 3.x** dan **Next.js**. Service ini menyediakan API untuk mengelola konten landing page SIUJI.

##  **Fitur**

-  **Authentication System** - User management dengan Payload CMS
-  **Rich Content Management** - Support untuk rich text, media upload
-  **TypeScript Support** - Type safety untuk better development
-  **Collections Management** - Manage Hero, FAQ, Testimonials, dll
-  **RESTful API** - API endpoints untuk frontend consumption
-  **GraphQL Support** - GraphQL API untuk query yang fleksibel
-  **Docker Ready** - Containerized untuk easy deployment

##  **Tech Stack**

- **CMS Framework**: Payload CMS 3.x
- **Runtime**: Node.js 20+ 
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **Authentication**: Payload Auth with JWT

##  **Quick Start**

### ** Development Mode**
```bash
# 1. Clone repository
git clone <repo-url>
cd siuji-cms

# 2. Setup environment
cp .env.example .env
npm run generate:secret

# 3. Install dependencies
npm install

# 4. Start with Docker
npm run docker:dev

# 5. Access CMS Admin
# http://localhost:3000/admin
```

### ** Production Mode**
```bash
# Start production
npm run docker:prod

# Access CMS
# http://localhost:3000/admin
```

##  **Prerequisites**

- [Docker & Docker Compose](https://www.docker.com/products/docker-desktop)
- [Node.js 20+](https://nodejs.org/) (untuk local development)
- [PostgreSQL 15+](https://www.postgresql.org/) (untuk local development)

##  **Development**

### **Environment Configuration**
```env
NODE_ENV=development
POSTGRES_DB=siuji_cms_db
POSTGRES_USER=siuji_cms_user
POSTGRES_PASSWORD=your-secure-password
DATABASE_URI=postgres://siuji_cms_user:your-password@db:5432/siuji_cms_db
PAYLOAD_SECRET=your-32-character-secret
SERVER_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:5173,http://localhost:8080
```

### **Available Commands**
```bash
# Development
npm run dev                 # Start development server
npm run docker:dev          # Start with Docker development
npm run seed               # Seed initial data

# Build & Production  
npm run build              # Build for production
npm run start              # Start production server
npm run docker:prod        # Start with Docker production

# Utils
npm run generate:secret    # Generate Payload secret
npm run generate:types     # Generate TypeScript types
npm run lint               # Run ESLint
npm run clean              # Clean build files

# Testing
npm test                   # Run all tests
npm run test:int           # Run integration tests
npm run test:e2e           # Run E2E tests

# Docker Management
npm run docker:down        # Stop containers
npm run docker:clean       # Clean containers & volumes
```

##  **API Endpoints**

### **Public API (No Auth)**
```bash
GET /api/hero-section           # Hero section content
GET /api/features               # Platform features  
GET /api/about-section          # About section
GET /api/faq                    # FAQ entries
GET /api/testimonials           # User testimonials
GET /api/pricing-plans          # Pricing plans
GET /api/partners               # Business partners
GET /api/contact-section        # Contact information
GET /api/media                  # Media files
```

### **Admin API (Auth Required)**
```bash
POST /api/users/login           # User login
POST /api/users/logout          # User logout
GET  /api/:collection           # List items
POST /api/:collection           # Create item
GET  /api/:collection/:id       # Get item
PATCH /api/:collection/:id      # Update item
DELETE /api/:collection/:id     # Delete item
```

### **GraphQL**
```bash
POST /api/graphql               # GraphQL endpoint
GET  /api/graphql-playground    # GraphQL playground (dev only)
```

##  **Project Structure**

```
src/
 collections/            # Payload collections
    AboutSection.ts     # About section content
    Features.ts         # Platform features
    HeroSection.ts      # Hero section
    FAQ.ts              # FAQ management
    Testimonials.ts     # User testimonials
    PricingPlans.ts     # Pricing plans
    ...
 app/                    # Next.js app router
    (frontend)/         # Frontend routes
    (payload)/          # CMS admin routes
 seeds/                  # Database seeding
    seedLandingPage.ts  # Main seeding script
    ...
 payload.config.ts       # Payload configuration
 payload-types.ts        # TypeScript types
```

##  **Authentication**

Default admin user (development):
- **Email**: admin@siuji.com
- **Password**: password123

 **Change default credentials in production!**

##  **Data Seeding**

```bash
# Seed development data
npm run seed

# Seed with Docker
docker-compose exec cms npm run seed
```

##  **Docker Configuration**

### **Development**
```yaml
# docker-compose.dev.yml
services:
  cms-dev:
    build: 
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
```

### **Production**
```yaml
# docker-compose.yml  
services:
  cms:
    build: 
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    restart: unless-stopped
```

##  **Testing**

```bash
# Run all tests
npm test

# Integration tests
npm run test:int

# E2E tests  
npm run test:e2e

# Watch mode
npm run test:watch
```

##  **Environment Variables**

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` |
| `PAYLOAD_SECRET` | Payload secret key | Required |
| `DATABASE_URI` | PostgreSQL connection | Required |
| `SERVER_URL` | Server URL | `http://localhost:3000` |
| `CORS_ORIGINS` | CORS allowed origins | `http://localhost:5173` |

##  **Contributing**

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Create Pull Request

##  **License**

Distributed under the MIT License. See `LICENSE` file for more information.

---

**Happy Coding! **
