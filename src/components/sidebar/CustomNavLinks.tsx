'use client'

import React from 'react'

export default function CustomNavLinks() {
  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="border-t border-gray-200"></div>
      
      {/* Quick Info Section */}
      <div className="px-3">
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-3 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
            <span className="text-lg mr-2">🎓</span>
            SiUJI CMS
          </h4>
          <p className="text-xs text-gray-600 mb-3">
            Manage your landing page content efficiently
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2 rounded text-center">
              <div className="font-semibold text-blue-600">8+</div>
              <div className="text-gray-500">Sections</div>
            </div>
            <div className="bg-white p-2 rounded text-center">
              <div className="font-semibold text-green-600">Vue.js</div>
              <div className="text-gray-500">Frontend</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
