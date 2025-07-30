'use client'

import { Link } from '@payloadcms/ui'
import React from 'react'

export default function CustomDashboard() {
  const collections = [
    {
      name: "Users",
      slug: "users",
      icon: "👥",
      description: "Admin user management and permissions",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      count: "2+",
      status: "Active"
    },
    {
      name: "Media",
      slug: "media", 
      icon: "📸",
      description: "Images, files, and media assets",
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      count: "∞",
      status: "Ready"
    },
    {
      name: "Hero Sections",
      slug: "hero-section",
      icon: "🌟",
      description: "Main landing page hero content with CTA",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      count: "1 Global",
      status: "Active"
    },
    {
      name: "About Sections", 
      slug: "about-section",
      icon: "ℹ️",
      description: "Company information with carousel content",
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      count: "1 Global",
      status: "Active"
    },
    {
      name: "Why Choose Sections",
      slug: "why-choose-section",
      icon: "⭐",
      description: "Value proposition points with interactive features",
      color: "from-green-500 to-green-600", 
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      count: "Multiple Points",
      status: "Active"
    },
    {
      name: "Portfolio Sections",
      slug: "portfolio-section",
      icon: "🎨",
      description: "Showcase projects and portfolio items",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      count: "6+ Items",
      status: "Active"
    },
    {
      name: "Features",
      slug: "features",
      icon: "🚀",
      description: "Platform features with left/right positioning",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50", 
      borderColor: "border-purple-200",
      count: "4+ Items",
      status: "Active"
    },
    {
      name: "Testimonials",
      slug: "testimonials",
      icon: "💬",
      description: "User testimonials with avatars and details",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      count: "2+ Reviews",
      status: "Active"
    },
    {
      name: "Pricing Plans",
      slug: "pricing-plans",
      icon: "💰",
      description: "Subscription plans with features and pricing",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200", 
      count: "3 Plans",
      status: "Active"
    },
    {
      name: "Faqs",
      slug: "frequently-asked-question",
      icon: "❓",
      description: "Frequently asked questions with accordion",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      count: "5+ Questions",
      status: "Active"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Collections Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
        <div className="text-sm text-gray-500">
          {collections.length} total collections
        </div>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {collections.map((collection, index) => (
          <Link
            key={index}
            href={`/admin/collections/${collection.slug}`}
            className={`${collection.bgColor} ${collection.borderColor} border-l-4 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group block`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl">{collection.icon}</div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full bg-white ${collection.status === 'Active' ? 'text-green-600' : 'text-blue-600'}`}>
                  {collection.status}
                </span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-gray-900">
              {collection.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3 leading-relaxed">
              {collection.description}
            </p>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Items: {collection.count}</span>
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${collection.color}`}></div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="text-2xl mr-3">📊</div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{collections.length}</div>
              <div className="text-sm text-gray-500">Total Collections</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🌐</div>
            <div>
              <div className="text-2xl font-bold text-blue-600">Vue.js</div>
              <div className="text-sm text-gray-500">Frontend</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🗄️</div>
            <div>
              <div className="text-2xl font-bold text-green-600">PostgreSQL</div>
              <div className="text-sm text-gray-500">Database</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🚀</div>
            <div>
              <div className="text-2xl font-bold text-purple-600">CMS 3.0</div>
              <div className="text-sm text-gray-500">PayloadCMS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
