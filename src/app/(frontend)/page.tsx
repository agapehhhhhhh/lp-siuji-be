import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="siuji-home">
      {/* Background SVG Shape */}
      <div className="shape-svg">
        <svg viewBox="0 0 1440 800" preserveAspectRatio="none">
          <path
            d="M960,0 C1180,200 1220,600 1440,800 L1440,0 L0,0 Z"
            fill="#4CC5BD"
          />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating book">📚</div>
        <div className="floating file">📄</div>
        <div className="floating pencil">✏️</div>
        <div className="floating monitor">💻</div>
      </div>

      <div className="container">
        {/* Main Content */}
        <main className="main-content">
          <div className="hero-section">
            <div className="hero-text">
              <h1>
                {!user && (
                  <>
                    Selamat datang di <span className="highlight">SiUJI CMS</span>
                  </>
                )}
                {user && (
                  <>
                    Selamat datang kembali, <span className="highlight">{user.email}</span>
                  </>
                )}
              </h1>
              <p className="hero-subtitle">
                Platform manajemen konten untuk SIUJI - Sistem Ujian Online yang modern, 
                aman, dan mudah digunakan. Kelola konten landing page Anda dengan mudah.
              </p>
              
              <div className="action-buttons">
                <a
                  className="btn-primary"
                  href={payloadConfig.routes.admin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>🚀</span>
                  Buka Admin Panel
                </a>
                <a
                  className="btn-secondary"
                  href="/api/docs"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>📖</span>
                  API Documentation
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-container">
                <div className="dashboard-preview">
                  <div className="preview-header">
                    <div className="preview-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="preview-title">SiUJI Admin</span>
                  </div>
                  <div className="preview-content">
                    <div className="preview-sidebar">
                      <div className="sidebar-item active">📊 Dashboard</div>
                      <div className="sidebar-item">🏠 Hero Section</div>
                      <div className="sidebar-item">✨ Features</div>
                      <div className="sidebar-item">❓ FAQ</div>
                      <div className="sidebar-item">💬 Testimonials</div>
                    </div>
                    <div className="preview-main">
                      <div className="preview-card"></div>
                      <div className="preview-card"></div>
                      <div className="preview-card small"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
