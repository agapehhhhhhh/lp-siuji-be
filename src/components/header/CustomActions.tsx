'use client'

import { Link } from '@payloadcms/ui'
import React from 'react'

export default function CustomActions() {
  return (
    <div className="flex items-center space-x-3">
      {/* Frontend Link */}
      <Link
        href="http://localhost:5173"
        target="_blank"
        className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
      >
        <span>🌐</span>
        <span>Frontend</span>
      </Link>

      {/* Media Quick Access */}
      <Link
        href="/admin/collections/media"
        className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
      >
        <span>📁</span>
        <span>Media</span>
      </Link>

      {/* Status Indicator */}
      <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-md text-sm">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span>Online</span>
      </div>
    </div>
  )
}
