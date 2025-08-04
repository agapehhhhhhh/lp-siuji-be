# 🚀 SIUJI Landing Page CMS - Setup Guide

## 📋 Prerequisites

- **Node.js** v18+ 
- **PostgreSQL** v13+
- **Git**

## 🔧 Environment Setup

### 1. Copy Environment File
```bash
cp .env.example .env
```

### 2. Configure Database

#### Option A: Local PostgreSQL
1. Install PostgreSQL locally
2. Create database:
   ```sql
   CREATE DATABASE siuji;
   ```
3. Update `.env`:
   ```properties
   DATABASE_URI=postgres://postgres:your_password@localhost:5432/siuji
   ```

#### Option B: Docker PostgreSQL
1. Use Docker Compose:
   ```bash
   docker-compose up -d postgres
   ```
2. Update `.env`:
   ```properties
   DATABASE_URI=postgres://postgres:your_password@db:5432/siuji
   ```

### 3. Generate Security Keys

Generate a secure Payload secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Update `.env`:
```properties
PAYLOAD_SECRET=your_generated_secret_here
```

### 4. Configure Email (Optional)

For Gmail App Password:
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Generate App Password
4. Update `.env`:
   ```properties
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_16_digit_app_password
   ADMIN_EMAIL=your_admin@gmail.com
   ```

### 5. Network Access (Optional)

For access from other devices on your network:
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Add to CORS_ORIGINS and CSRF_ORIGINS in `.env`:
   ```properties
   CORS_ORIGINS=http://localhost:5173,http://YOUR_IP:3000,http://YOUR_IP:5173
   CSRF_ORIGINS=http://localhost:5173,http://YOUR_IP:3000,http://YOUR_IP:5173
   ```

## 🚀 Installation & Running

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Seed Sample Data
```bash
npm run seed
```

### Generate Types
```bash
npm run generate:types
```

## 🌐 Access URLs

- **Admin Panel**: http://localhost:3000/admin
- **API**: http://localhost:3000/api
- **Frontend**: http://localhost:5173 (if running separately)

## 📧 Email Testing

Test email configuration:
```bash
npm run test:email
```

## 🔍 Troubleshooting

### Database Connection Issues
- Check PostgreSQL is running
- Verify connection string in `.env`
- Check firewall settings

### CORS Errors
- Add your frontend URL to CORS_ORIGINS
- Restart development server after changes

### Network Access Issues
- Add your network IP to CORS and CSRF origins
- Clear browser cache/cookies
- Check firewall settings

## 📚 Additional Resources

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
