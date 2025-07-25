import { Payload } from 'payload'

// Fungsi utama untuk melakukan seeding semua koleksi
export const seedLandingPageCollections = async (payloadInstance: Payload) => {
  try {
    console.log('🌱 Starting to seed all landing page collections...')

    // Menghapus data lama untuk memastikan data yang bersih (opsional, tapi direkomendasikan)
    console.log('🗑️ Clearing existing data...')
    await Promise.all([
      payloadInstance.delete({ collection: 'hero-section', where: {} }),
      payloadInstance.delete({ collection: 'about-section', where: {} }),
      payloadInstance.delete({ collection: 'why-choose-section', where: {} }),
      payloadInstance.delete({ collection: 'contact-section', where: {} }),
      payloadInstance.delete({ collection: 'features', where: {} }),
      payloadInstance.delete({ collection: 'testimonials', where: {} }),
      payloadInstance.delete({ collection: 'pricing-plans', where: {} }),
      payloadInstance.delete({ collection: 'faq', where: {} }),
      payloadInstance.delete({ collection: 'partners', where: {} }),
      payloadInstance.delete({ collection: 'platform-availability', where: {} }),
    ])
    console.log('✅ Existing data cleared.')

    // 1. Seed Hero Section (Global)
    console.log('Seeding Hero Section...')
    await payloadInstance.create({
      collection: 'hero-section',
      data: {
        title: 'Revolusikan Pendidikan Anda dengan SiUJI',
        subtitle: 'Platform Ujian Digital untuk Pembelajaran Modern',
        description: 'Transformasikan ujian tradisional menjadi pengalaman digital yang menarik. SiUJI memberdayakan pendidik untuk membuat, mengelola, dan memantau ujian online dengan wawasan real-time dan analitik komprehensif.',
        ctaText: 'Mulai Sekarang',
        ctaLink: '/register',
        features: [
          { feature: 'Pemantauan real-time' },
          { feature: 'Lingkungan ujian yang aman' },
          { feature: 'Analitik komprehensif' },
          { feature: 'Dukungan multi-platform' }
        ],
        isActive: true
      }
    })
    console.log('✅ Hero Section seeded')

    // 2. Seed About Section (Global)
    console.log('Seeding About Section...')
    await payloadInstance.create({
      collection: 'about-section',
      data: {
        title: 'Apa itu SIUJI?',
        subtitle: 'Solusi Pendidikan Digital Lengkap Anda',
        description: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'SIUJI adalah platform yang memungkinkan pendidik membuat kelas online dimana mereka dapat menyimpan materi kursus secara online; mengelola tugas, kuis dan ujian; memantau tenggat waktu; menilai hasil dan memberikan umpan balik kepada siswa semuanya dalam satu tempat.',
                    version: 1
                  }
                ]
              }
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1
          }
        },
        isActive: true
      }
    })
    console.log('✅ About Section seeded')

    // 3. Seed Why Choose Section (Global)
    console.log('Seeding Why Choose Section...')
    await payloadInstance.create({
      collection: 'why-choose-section',
      data: {
        title: 'Mengapa Memilih Kami?',
        subtitle: 'Rasakan Masa Depan Pendidikan Digital',
        points: [
          {
            title: 'Pemantauan Real-Time',
            description: 'Rangkul kekuatan pemantauan real-time dan kendalikan integritas ujian dengan teknologi proctoring canggih.'
          },
          {
            title: 'Akses Seumur Hidup',
            description: 'Materi dan hasil ujian tersimpan aman dan dapat diakses kapan saja, mendukung pembelajaran berkelanjutan.'
          },
          {
            title: 'Komunitas Besar',
            description: 'Terhubung, berkolaborasi, dan berbagi dengan rekan pendidik dan siswa, memperkaya pengalaman belajar.'
          }
        ],
        isActive: true
      }
    })
    console.log('✅ Why Choose Section seeded')

    // 4. Seed Contact Section (Global)
    console.log('Seeding Contact Section...')
    await payloadInstance.create({
      collection: 'contact-section',
      data: {
        title: 'Hubungi Kami!',
        subtitle: 'Siap Mentransformasi Pendidikan Anda?',
        description: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'Punya pertanyaan tentang SiUJI atau butuh solusi khusus? Tim kami siap membantu Anda mendigitalkan proses ujian.',
                    version: 1
                  }
                ]
              }
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1
          }
        },
        contactInfo: {
          address: 'Jl. Raya Bandung-Sumedang KM 21, Jatinangor, Sumedang, Jawa Barat 45363',
          phone: '+62 22 7796 8800',
          email: 'info@siuji.id',
          workingHours: 'Senin - Jumat: 09:00 - 18:00 WIB',
          whatsappNumber: '+62 812 3456 7890'
        },
        isActive: true
      }
    })
    console.log('✅ Contact Section seeded')

    // 5. Seed Features
    console.log('Seeding Features...')
    const featuresData = [
      {
        title: 'Sistem Ujian Cerdas',
        description: 'Sistem ujian bertenaga AI canggih dengan mekanisme anti-kecurangan dan kemampuan proctoring real-time.',
        position: 'left' as const,
        features: [{ feature: 'AI Proctoring' }, { feature: 'Penilaian Otomatis' }, { feature: 'Randomisasi Soal' }],
        isActive: true, order: 1
      },
      {
        title: 'Analitik Komprehensif',
        description: 'Dapatkan wawasan detail tentang kinerja siswa dengan alat analitik dan pelaporan komprehensif.',
        position: 'right' as const,
        features: [{ feature: 'Pelacakan Kinerja' }, { feature: 'Laporan Kustom' }, { feature: 'Visualisasi Data' }],
        isActive: true, order: 2
      }
    ];
    for (const feature of featuresData) {
      await payloadInstance.create({ collection: 'features', data: feature });
    }
    console.log(`✅ ${featuresData.length} Features seeded`);

    // 6. Seed Testimonials
    console.log('Seeding Testimonials...')
    const testimonialsData = [
      {
        name: 'Dr. Sarah Johnson', position: 'Guru Matematika', school: 'Jakarta International School',
        content: 'SiUJI telah mengubah cara kami melakukan ujian. Fitur pemantauan real-time memberi saya kepercayaan dalam menjaga integritas akademik.',
        rating: 5, isActive: true, order: 1
      },
      {
        name: 'Ahmad Rizki', position: 'Koordinator IT', school: 'SMA Negeri 1 Bandung',
        content: 'Platform ini sangat ramah pengguna dan analitik membantu kami memahami kinerja siswa lebih baik dari sebelumnya.',
        rating: 5, isActive: true, order: 2
      }
    ];
    for (const testimonial of testimonialsData) {
      await payloadInstance.create({ collection: 'testimonials', data: testimonial });
    }
    console.log(`✅ ${testimonialsData.length} Testimonials seeded`);

    // 7. Seed Pricing Plans
    console.log('Seeding Pricing Plans...')
    const pricingPlansData = [
      {
        name: 'Basic', price: 0, period: 'month' as const, currency: 'idr' as const, description: 'Untuk coba-coba dan penggunaan personal.',
        features: [{ feature: 'Hingga 50 siswa', isIncluded: true }, { feature: '2 Ujian per bulan', isIncluded: true }, { feature: 'Dukungan Email', isIncluded: true }],
        ctaText: 'Mulai Gratis', ctaLink: '/register?plan=basic', isActive: true, order: 1
      },
      {
        name: 'Pro', price: 500000, period: 'month' as const, currency: 'idr' as const, description: 'Solusi terbaik untuk sekolah dan institusi.',
        features: [{ feature: 'Siswa tak terbatas', isIncluded: true }, { feature: 'Ujian tak terbatas', isIncluded: true }, { feature: 'AI Proctoring', isIncluded: true }, { feature: 'Dukungan Prioritas', isIncluded: true }],
        ctaText: 'Pilih Pro', ctaLink: '/register?plan=pro', isPopular: true, badge: 'Paling Populer', isActive: true, order: 2
      },
      {
        name: 'Enterprise', price: 0, period: 'once' as const, currency: 'idr' as const, description: 'Solusi kustom untuk kebutuhan institusi besar.',
        features: [{ feature: 'Semua fitur Pro', isIncluded: true }, { feature: 'Server Khusus', isIncluded: true }, { feature: 'Manager Akun Khusus', isIncluded: true }],
        ctaText: 'Hubungi Sales', ctaLink: '/contact', isActive: true, order: 3
      }
    ];
    for (const plan of pricingPlansData) {
      await payloadInstance.create({ collection: 'pricing-plans', data: plan });
    }
    console.log(`✅ ${pricingPlansData.length} Pricing Plans seeded`);

    // 8. Seed FAQ - Simplified structure for seeding
    console.log('Seeding FAQ...')
    const faqData = [
      {
        question: 'Apa itu SiUJI?',
        category: 'general' as const,
        answer: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'SiUJI adalah platform ujian online komprehensif yang dirancang untuk membantu institusi pendidikan melakukan ujian secara efisien, aman, dan terukur.',
                    version: 1
                  }
                ]
              }
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1
          }
        },
        isActive: true,
        order: 1
      },
      {
        question: 'Bagaimana cara kerja fitur anti-kecurangan?',
        category: 'features' as const,
        answer: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'Kami menggunakan kombinasi AI proctoring, penguncian browser, dan randomisasi soal untuk meminimalkan potensi kecurangan selama ujian berlangsung.',
                    version: 1
                  }
                ]
              }
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1
          }
        },
        isActive: true,
        order: 2
      },
      {
        question: 'Apakah data saya aman?',
        category: 'technical' as const,
        answer: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'Tentu. Kami menggunakan enkripsi standar industri dan praktik keamanan terbaik untuk memastikan semua data Anda, termasuk soal dan jawaban siswa, tersimpan dengan aman.',
                    version: 1
                  }
                ]
              }
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1
          }
        },
        isActive: true,
        order: 3
      }
    ];
    for (const faq of faqData) {
      await payloadInstance.create({ collection: 'faq', data: faq as any });
    }
    console.log(`✅ ${faqData.length} FAQs seeded`);

    // 9. Seed Partners
    console.log('Seeding Partners...')
    const partnersData = [
      // NOTE: 'logo' field is omitted as it requires a media ID from an uploaded file.
      // You can manually add logos from the admin panel after seeding.
      { name: 'Universitas Pendidikan Digital', type: 'university' as const, website: 'https://upd.ac.id', location: 'Jakarta', isActive: true, order: 1, isFeatured: true },
      { name: 'SMA Cendekia Bangsa', type: 'school' as const, website: 'https://smacendekia.sch.id', location: 'Bandung', isActive: true, order: 2 }
    ];
    for (const partner of partnersData) {
      await payloadInstance.create({ collection: 'partners', data: partner });
    }
    console.log(`✅ ${partnersData.length} Partners seeded`);

    // 10. Seed Platform Availability
    console.log('Seeding Platform Availability...')
    await payloadInstance.create({
      collection: 'platform-availability',
      data: {
        sectionTitle: 'Kini SIUJI Sudah Tersedia di 3 Platform Berbeda',
        subtitle: 'Akses ujian online dimana saja dan kapan saja sesuai kebutuhan Anda',
        platforms: [
          {
            name: 'Aplikasi Web',
            slug: 'web',
            description: 'Akses penuh SiUJI melalui browser modern di desktop atau laptop Anda dengan pengalaman yang optimal.',
            mockupImage: null as any, // Placeholder, can be added later via admin
            isDefault: true,
            order: 1
          },
          {
            name: 'Android',
            slug: 'android',
            description: 'Ikuti ujian dengan mudah dari perangkat Android Anda kapan saja dan dimana saja.',
            mockupImage: null as any, // Placeholder, can be added later via admin
            isDefault: false,
            order: 2
          },
          {
            name: 'iOS',
            slug: 'ios',
            description: 'Segera hadir di perangkat iPhone dan iPad Anda untuk pengalaman ujian yang lebih fleksibel.',
            mockupImage: null as any, // Placeholder, can be added later via admin
            isDefault: false,
            order: 3
          }
        ],
        infoBanner: {
          text: 'Dapatkan akses lengkap ke semua platform SiUJI',
          buttonLabel: 'Mulai Sekarang',
          buttonLink: '/register',
          backgroundColor: '#4CC5BD'
        },
        isActive: true,
        order: 0
      }
    });
    console.log('✅ Platform Availability seeded');

    console.log('\n🎉 All collections seeded successfully!')
    console.log('\n📊 Summary:')
    console.log('- Hero Section: ✅')
    console.log('- About Section: ✅')
    console.log('- Why Choose Section: ✅')
    console.log('- Contact Section: ✅')
    console.log('- Features: ✅')
    console.log('- Testimonials: ✅')
    console.log('- Pricing Plans: ✅')
    console.log('- FAQ: ✅')
    console.log('- Partners: ✅')
    console.log('- Platform Availability: ✅')

  } catch (error) {
    console.error('❌ Error during seeding process:', error)
    throw error
  }
}
