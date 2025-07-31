'use client'

import { Link } from '@payloadcms/ui'
import React, { useState } from 'react'

export default function CustomSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/admin',
      icon: '🏠',
      description: 'Overview & Analytics'
    },
    {
      id: 'content',
      label: 'Content Sections',
      icon: '📝',
      description: 'Landing Page Content',
      submenu: [
        { label: 'Hero Section', href: '/admin/collections/hero-section', icon: '🌟', count: '1' },
        { label: 'About Section', href: '/admin/collections/about-section', icon: 'ℹ️', count: '1' },
        { label: 'Why Choose Us', href: '/admin/collections/why-choose-section', icon: '⭐', count: '3+' },
        { label: 'Features', href: '/admin/collections/features', icon: '🚀', count: '4+' },
        { label: 'Testimonials', href: '/admin/collections/testimonials', icon: '💬', count: '2+' },
        { label: 'Pricing Plans', href: '/admin/collections/pricing-plans', icon: '💰', count: '3' },
        { label: 'FAQ', href: '/admin/collections/frequently-asked-question', icon: '❓', count: '5+' },
        { label: 'Portfolio', href: '/admin/collections/portfolio-section', icon: '🎨', count: '6+' }
      ]
    },
    {
      id: 'media',
      label: 'Media Library',
      href: '/admin/collections/media',
      icon: '📸',
      description: 'Images & Files',
      count: '∞'
    },
    {
      id: 'users',
      label: 'User Management',
      href: '/admin/collections/users',
      icon: '👥',
      description: 'Admin Users',
      count: '2+'
    }
  ]

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id)
  }

  return (
    <div className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-72'} sticky top-0 z-40`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-teal-50">
        {!isCollapsed && (
          <div className="flex items-center">
            <span className="text-2xl mr-2">🎓</span>
            <div>
              <div className="text-lg font-bold text-gray-800">SiUJI CMS</div>
              <div className="text-xs text-gray-500">Content Management</div>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md hover:bg-gray-200 transition-colors"
        >
          <svg 
            className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <div className="p-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <div key={item.id} className="space-y-1">
              {item.submenu ? (
                // Dropdown Item
                <div>
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors text-left ${
                      activeDropdown === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{item.icon}</span>
                      {!isCollapsed && (
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                      )}
                    </div>
                    {!isCollapsed && (
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {/* Submenu */}
                  {activeDropdown === item.id && !isCollapsed && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.submenu.map((subItem, index) => (
                        <Link
                          key={index}
                          href={subItem.href}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors group"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{subItem.icon}</span>
                            <span className="text-sm font-medium">{subItem.label}</span>
                          </div>
                          {subItem.count && (
                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full group-hover:bg-blue-100 group-hover:text-blue-600">
                              {subItem.count}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Regular Item
                <Link
                  href={item.href}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{item.icon}</span>
                    {!isCollapsed && (
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    )}
                  </div>
                  {!isCollapsed && item.count && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full group-hover:bg-blue-100 group-hover:text-blue-600">
                      {item.count}
                    </span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Actions */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="space-y-2">
            <Link
              href="http://localhost:5173"
              target="_blank"
              className="flex items-center justify-center w-full p-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <span className="mr-2">🌐</span>
              View Frontend
            </Link>
            <div className="flex items-center justify-center text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              System Online
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
