import React from "react"

export default function WelcomeMessage() {
  const collections = [
    {
      name: "Hero Section",
      icon: "🏠",
      description: "Kelola konten utama landing page dengan CTA dan gambar hero",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      count: "1 Global",
      status: "Active"
    },
    {
      name: "About Section", 
      icon: "ℹ️",
      description: "Informasi tentang SiUJI dengan carousel dan rotating images",
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      count: "1 Global",
      status: "Active"
    },
    {
      name: "Why Choose Us",
      icon: "⭐",
      description: "Poin-poin keunggulan platform dengan icon dan side images",
      color: "from-green-500 to-green-600", 
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      count: "Multiple Points",
      status: "Active"
    },
    {
      name: "Features",
      icon: "🚀",
      description: "Fitur-fitur unggulan platform dengan positioning kiri/kanan",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50", 
      borderColor: "border-purple-200",
      count: "4+ Items",
      status: "Active"
    },
    {
      name: "Testimonials",
      icon: "💬",
      description: "Testimoni pengguna dengan avatar dan informasi lengkap",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      count: "2+ Reviews",
      status: "Active"
    },
    {
      name: "Pricing Plans",
      icon: "💰",
      description: "Paket harga dengan fitur dan CTA button",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200", 
      count: "3 Plans",
      status: "Active"
    },
    {
      name: "FAQ",
      icon: "❓",
      description: "Pertanyaan yang sering diajukan dengan accordion",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      count: "5+ Questions",
      status: "Active"
    },
    {
      name: "Portfolio",
      icon: "🎨",
      description: "Showcase proyek dan portfolio dengan kategori",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      count: "Multiple Items",
      status: "Active"
    },
    {
      name: "Media",
      icon: "📸",
      description: "Kelola gambar, file upload dengan metadata lengkap",
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      count: "Unlimited",
      status: "Ready"
    }
  ]

  const systemInfo = {
    cms: "PayloadCMS 3.0",
    database: "PostgreSQL", 
    environment: process.env.NODE_ENV || "development",
    server: "Next.js 15.3.2",
    frontend: "Vue.js 3 + Vite"
  }

  return (
    <div className="welcome-container p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 text-white p-8 rounded-xl shadow-lg mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              🎓 SiUJI Content Management System
            </h1>
            <p className="text-blue-100 text-lg mb-4">
              Kelola konten Landing Page SiUJI dengan mudah dan efisien
            </p>
            <div className="flex gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">📊 {collections.length} Collections</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🚀 {systemInfo.cms}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🗄️ {systemInfo.database}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-sm text-blue-100">Status: Online</div>
          </div>
        </div>
      </div>

      {/* Tips and Guidelines */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
          💡 Tips & Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-amber-700 mb-2">🎯 Content Best Practices</h4>
            <ul className="text-amber-700 space-y-1">
              <li>• Upload gambar dengan resolusi optimal (WebP format)</li>
              <li>• Gunakan deskripsi yang SEO-friendly</li>
              <li>• Atur order konten sesuai prioritas</li>
              <li>• Preview sebelum publish</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-amber-700 mb-2">🔧 Development Workflow</h4>
            <ul className="text-amber-700 space-y-1">
              <li>• Test perubahan di development</li>
              <li>• Sync dengan frontend Vue.js</li>
              <li>• Backup data sebelum update besar</li>
              <li>• Monitor performance API</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}