import { Payload } from 'payload'
import { seedMediaFiles } from './seedMedia' // pastikan path impor sesuai

// Fungsi utama untuk melakukan seeding semua koleksi
export const seedLandingPageCollections = async (payloadInstance: Payload) => {
  try {
    console.log('🌱 Starting to seed all landing page collections...')

    // 0) Bersihkan data lama agar idempotent
    console.log('🗑️ Clearing existing data...')
    await Promise.all([
      payloadInstance.delete({ collection: 'hero-section', where: {} }),
      payloadInstance.delete({ collection: 'about-section', where: {} }),
      payloadInstance.delete({ collection: 'why-choose-section', where: {} }),
      payloadInstance.delete({ collection: 'features', where: {} }),
      payloadInstance.delete({ collection: 'testimonials', where: {} }),
      payloadInstance.delete({ collection: 'pricing-plans', where: {} }),
      payloadInstance.delete({ collection: 'faq', where: {} }),
      payloadInstance.delete({ collection: 'portfolio-section', where: {} }),
    ])
    console.log('✅ Existing data cleared.')

    // 1) HERO SECTION — schema baru + ornaments + media upload (5 assets)
    console.log('Seeding Hero Section...')

    // import { seedMediaFiles } from './utils/seedMedia'

    let mediaMap = await seedMediaFiles(payloadInstance, [
      { key: 'book',    file: 'src/seeds/assets/book-floating.png',    alt: 'Book Floating' },
      { key: 'bookpen', file: 'src/seeds/assets/bookpen-floating.png', alt: 'Book & Pen Floating' },
      { key: 'pen',     file: 'src/seeds/assets/pen-floating.png',     alt: 'Pen Floating' },
      { key: 'pencil',  file: 'src/seeds/assets/pencil-floating.png',  alt: 'Pencil Floating' },
      { key: 'score',   file: 'src/seeds/assets/score-floating.png',   alt: 'Score Floating' },
      { key: 'realtime', file: 'src/seeds/assets/pemantauan-realtime.png', alt: 'Realtime' },
      { key: 'akses',    file: 'src/seeds/assets/akses-seumur-hidup.png',    alt: 'Akses' },
      { key: 'komunitas',    file: 'src/seeds/assets/komunitas-besar.png',    alt: 'Komunitas' },
      { key: 'skalabilitas',    file: 'src/seeds/assets/skalabilitas.png',    alt: 'Skalabilitas' },
    ])

    // Fallback kalau file salah ketik: score-floating.png
    if (!mediaMap['score']) {
      const fix = await seedMediaFiles(payloadInstance, [
        { key: 'score', file: 'src/seeds/assets/score-floating.png', alt: 'Score Floating (fixed)' },
      ])
      mediaMap = { ...mediaMap, ...fix }
    }

    // Helper ornaments
    const ornamentPresets = (prefix: string) => {
      const out: { name: string; image: string | null; position?: string }[] = []
      if (mediaMap['book'])   out.push({ name: `${prefix} Book`,   image: mediaMap['book'],   position: 'top-left' })
      if (mediaMap['pen'])    out.push({ name: `${prefix} Pen`,    image: mediaMap['pen'],    position: 'top-right' })
      if (mediaMap['pencil']) out.push({ name: `${prefix} Pencil`, image: mediaMap['pencil'], position: 'bottom-left' })
      if (mediaMap['score'])  out.push({ name: `${prefix} Score`,  image: mediaMap['score'],  position: 'bottom-right' })
      if (mediaMap['bookpen']) out.push({ name: `${prefix} Book & Pen`, image: mediaMap['bookpen'], position: 'center' })
      return out
    }

    const heroVariants = [
      {
        title: 'Ujian Online Aman, Skala Besar, dan Andal',
        subtitle: 'AI Proctoring, Lockdown Browser, dan Analitik Siap Produksi',
        ctaText: 'Coba Demo',
        heroImage: mediaMap['bookpen'] ?? null,
        isActive: false,
        ornaments: [
          ...(mediaMap['pen']   ? [{ name: 'Pen Accent',   image: mediaMap['pen'],   position: 'top-center' }] : []),
          ...(mediaMap['score'] ? [{ name: 'Score Accent', image: mediaMap['score'], position: 'bottom-right' }] : []),
          ...(mediaMap['book'] ? [{ name: 'Book Accent', image: mediaMap['book'], position: 'left-center' }] : []),
          ...(mediaMap['pencil'] ? [{ name: 'Pencil Accent', image: mediaMap['pencil'], position: 'right-center' }] : []),
          ...(mediaMap['bookpen'] ? [{ name: 'Book & Pen Accent', image: mediaMap['bookpen'], position: 'center' }] : []),
        ],
      },
    ]

    for (const hv of heroVariants) {
      await payloadInstance.create({ collection: 'hero-section', data: hv })
    }
    console.log(`✅ ${heroVariants.length} Hero variants seeded`)

    // 2) ABOUT SECTION — perluas slides & konfigurasi carousel
    console.log('Seeding About Section...')
    await payloadInstance.create({
      collection: 'about-section',
      data: {
        title: 'Apa itu SIUJI?',
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
                    text:
                      'SIUJI adalah platform yang memungkinkan pendidik membuat kelas online dimana mereka dapat menyimpan materi kursus secara online; mengelola tugas, kuis dan ujian; memantau tenggat waktu; menilai hasil dan memberikan umpan balik kepada siswa semuanya dalam satu tempat.',
                    version: 1,
                  },
                ],
              },
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    text:
                      'Platform dirancang untuk skala institusi dengan fokus pada keamanan, ketersediaan tinggi, dan kemudahan integrasi.',
                    version: 1,
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        slides: [
          {
            title: 'For Teacher',
            description:
              'Kelola materi, tugas, kuis, dan ujian; nilai otomatis & rubrik; pantau progres dengan analitik.',
            images: [],
            order: 0,
          },
          {
            title: 'For Student',
            description:
              'Akses materi, kerjakan tugas dan ujian dengan antarmuka sederhana dan ramah perangkat mobile.',
            images: [],
            order: 1,
          },
        ],
        rotatingImages: [],
        carouselConfig: {
          autoSlide: true,
          slideInterval: 4000,
          pauseOnHover: true,
        },
        isActive: true,
        order: 1,
      },
    })
    console.log('✅ About Section seeded')

    // 3) WHY CHOOSE — tambah variasi poin
    console.log('Seeding Why Choose Section...')
    await payloadInstance.create({
      collection: 'why-choose-section',
      data: {
        title: 'Mengapa Memilih Kami?',
        points: [
          {
            title: 'Pemantauan Real-Time',
            description:
              'Rangkul kekuatan pemantauan real-time dan kendalikan integritas ujian dengan teknologi proctoring canggih.',
            icon: mediaMap['realtime'] ? isNaN(Number(mediaMap['realtime'])) ? null : Number(mediaMap['realtime']) : null,
            sideImage: mediaMap['realtime'] ? isNaN(Number(mediaMap['realtime'])) ? null : Number(mediaMap['realtime']) : null,
          },
          {
            title: 'Akses Seumur Hidup',
            description:
              'Materi dan hasil ujian tersimpan aman dan dapat diakses kapan saja, mendukung pembelajaran berkelanjutan.',
            icon: mediaMap['akses'] ? isNaN(Number(mediaMap['akses'])) ? null : Number(mediaMap['akses']) : null,
            sideImage: mediaMap['akses'] ? isNaN(Number(mediaMap['akses'])) ? null : Number(mediaMap['akses']) : null,
          },
          {
            title: 'Komunitas Besar',
            description:
              'Terhubung, berkolaborasi, dan berbagi dengan rekan pendidik dan siswa, memperkaya pengalaman belajar.',
            icon: mediaMap['komunitas'] ? isNaN(Number(mediaMap['komunitas'])) ? null : Number(mediaMap['komunitas']) : null,
            sideImage: mediaMap['komunitas'] ? isNaN(Number(mediaMap['komunitas'])) ? null : Number(mediaMap['komunitas']) : null,
          },
          {
            title: 'Skalabilitas Teruji',
            description:
              'Arsitektur siap skala mendukung puluhan ribu peserta ujian paralel.',
            icon: mediaMap['skalabilitas'] ? isNaN(Number(mediaMap['skalabilitas'])) ? null : Number(mediaMap['skalabilitas']) : null,
            sideImage: mediaMap['skalabilitas'] ? isNaN(Number(mediaMap['skalabilitas'])) ? null : Number(mediaMap['skalabilitas']) : null,
          },
        ],
        isActive: true,
      },
    })
    console.log('✅ Why Choose Section seeded (dengan gambar icon & sideImage)')

    // 4) FEATURES — perbanyak item + alternating position
    console.log('Seeding Features...')
    const featuresData = [
      {
        title: 'Sistem Ujian Cerdas',
        description:
          'Sistem ujian bertenaga AI dengan mekanisme anti-kecurangan dan proctoring real-time, termasuk deteksi perilaku mencurigakan.',
        image: null,
        position: 'left' as const,
        isActive: true,
        order: 1,
      },
      {
        title: 'Analitik Komprehensif',
        description:
          'Wawasan detail performa siswa: distribusi nilai, ketuntasan, dan insight remedial.',
        image: null,
        position: 'right' as const,
        isActive: true,
        order: 2,
      },
      {
        title: 'Keamanan Berlapis',
        description:
          'Enkripsi tingkat enterprise, backup otomatis, dan pemulihan bencana.',
        image: null,
        position: 'left' as const,
        isActive: true,
        order: 3,
      },
      {
        title: 'Interface Ramah Pengguna',
        description:
          'Desain responsif dan aksesibilitas yang dioptimalkan untuk berbagai perangkat.',
        image: null,
        position: 'right' as const,
        isActive: true,
        order: 4,
      },
      {
        title: 'Bank Soal & Randomisasi',
        description:
          'Kelola bank soal terstruktur; randomisasi urutan soal & opsi untuk mengurangi kecurangan.',
        image: null,
        position: 'left' as const,
        isActive: true,
        order: 5,
      },
      {
        title: 'Penilaian Otomatis & Rubrik',
        description:
          'Dukungan auto-grading untuk pilihan ganda & isian singkat, serta rubrik untuk esai.',
        image: null,
        position: 'right' as const,
        isActive: true,
        order: 6,
      },
      {
        title: 'Mode Offline (Client-Side Cache)',
        description:
          'Tetap stabil di jaringan tidak ideal; jawaban disinkronkan saat koneksi pulih.',
        image: null,
        position: 'left' as const,
        isActive: true,
        order: 7,
      },
      {
        title: 'Integrasi SSO & LMS',
        description:
          'Integrasi dengan SSO (OAuth/SAML) dan sistem LMS/SIS kampus.',
        image: null,
        position: 'right' as const,
        isActive: true,
        order: 8,
      },
      {
        title: 'Monitoring Live Session',
        description:
          'Dashboard pengawas untuk memantau aktivitas peserta secara langsung.',
        image: null,
        position: 'left' as const,
        isActive: true,
        order: 9,
      },
      {
        title: 'Ekspor Laporan',
        description:
          'Ekspor PDF/CSV untuk kebutuhan akreditasi dan pelaporan institusi.',
        image: null,
        position: 'right' as const,
        isActive: true,
        order: 10,
      },
    ]
    for (const feature of featuresData) {
      await payloadInstance.create({ collection: 'features', data: feature })
    }
    console.log(`✅ ${featuresData.length} Features seeded`)

    // 5) TESTIMONIALS — variasi profesi & institusi
    console.log('Seeding Testimonials...')
    const testimonialsData = [
      {
        name: 'Dr. Sarah Johnson',
        position: 'Guru Matematika',
        school: 'Jakarta International School',
        content:
          'SiUJI telah mengubah cara kami melakukan ujian. Fitur pemantauan real-time memberi saya kepercayaan dalam menjaga integritas akademik.',
        avatar: null,
        testimonialTitle: 'Transformasi Digital yang Luar Biasa',
        isActive: true,
        order: 1,
        isFeatured: true,
      },
      {
        name: 'Ahmad Rizki',
        position: 'Koordinator IT',
        school: 'SMA Negeri 1 Bandung',
        content:
          'Platform ini sangat ramah pengguna dan analitik membantu kami memahami kinerja siswa lebih baik dari sebelumnya.',
        avatar: null,
        testimonialTitle: 'Solusi Terbaik untuk Institusi Pendidikan',
        isActive: true,
        order: 2,
        isFeatured: false,
      },
      {
        name: 'Prof. Dina Putri',
        position: 'Wakil Dekan Akademik',
        school: 'Universitas Nusantara',
        content:
          'Skalabilitas SiUJI terbukti saat ujian serentak ribuan mahasiswa. Stabil dan aman.',
        avatar: null,
        testimonialTitle: 'Stabil di Skala Besar',
        isActive: true,
        order: 3,
        isFeatured: true,
      },
      {
        name: 'Budi Pratama',
        position: 'Kepala Sekolah',
        school: 'SMA Harapan Bangsa',
        content:
          'Integrasi SSO memudahkan manajemen akun. Tim support responsif.',
        avatar: null,
        testimonialTitle: 'Integrasi Mulus',
        isActive: true,
        order: 4,
        isFeatured: false,
      },
      {
        name: 'Rina Kartika',
        position: 'Guru Bahasa Inggris',
        school: 'SMK Negeri 3 Yogyakarta',
        content:
          'Penilaian otomatis menghemat banyak waktu. Rubrik membantu objektivitas.',
        avatar: null,
        testimonialTitle: 'Efisiensi Penilaian',
        isActive: true,
        order: 5,
        isFeatured: false,
      },
      {
        name: 'Hendri Saputra',
        position: 'Admin Sistem',
        school: 'Politeknik Teknologi Bandung',
        content:
          'Audit log dan kontrol akses granular sangat membantu kepatuhan internal.',
        avatar: null,
        testimonialTitle: 'Keamanan & Kepatuhan',
        isActive: true,
        order: 6,
        isFeatured: false,
      },
      {
        name: 'Nur Aisyah',
        position: 'Mahasiswi',
        school: 'Universitas Maju',
        content:
          'Antarmuka sederhana dan mudah diakses dari ponsel. Sangat membantu saat ujian daring.',
        avatar: null,
        testimonialTitle: 'UX yang Bersahabat',
        isActive: true,
        order: 7,
        isFeatured: false,
      },
      {
        name: 'Andi Mahendra',
        position: 'Kepala Program Studi',
        school: 'STMIK Cendekia',
        content:
          'Laporan komprehensif mempermudah kami menyiapkan dokumen akreditasi.',
        avatar: null,
        testimonialTitle: 'Laporan Siap Akreditasi',
        isActive: true,
        order: 8,
        isFeatured: true,
      },
    ]
    for (const t of testimonialsData) {
      await payloadInstance.create({ collection: 'testimonials', data: t })
    }
    console.log(`✅ ${testimonialsData.length} Testimonials seeded`)

    // 6) PRICING PLANS — tambah paket Starter & Campus (yearly)
    console.log('Seeding Pricing Plans...')
    const pricingPlansData = [
      {
        name: 'Basic',
        price: 0,
        period: 'month' as const,
        currency: 'idr' as const,
        description: 'Untuk coba-coba dan penggunaan personal.',
        features: [
          { feature: 'Hingga 50 siswa', isIncluded: true },
          { feature: '2 Ujian per bulan', isIncluded: true },
          { feature: 'Dukungan Email', isIncluded: true },
        ],
        ctaText: 'Mulai Gratis',
        ctaLink: '/register?plan=basic',
        isPopular: false,
        badge: '',
        isActive: true,
        order: 1,
        limitations: [
          { limitation: 'Maksimal 50 siswa per kelas' },
          { limitation: 'Fitur analitik terbatas' },
        ],
      },
      {
        name: 'Starter',
        price: 150000,
        period: 'month' as const,
        currency: 'idr' as const,
        description: 'Cocok untuk sekolah kecil atau bimbel.',
        features: [
          { feature: 'Hingga 500 siswa', isIncluded: true },
          { feature: '20 Ujian per bulan', isIncluded: true },
          { feature: 'Bank Soal Dasar', isIncluded: true },
          { feature: 'Support Email & Chat', isIncluded: true },
        ],
        ctaText: 'Pilih Starter',
        ctaLink: '/register?plan=starter',
        isPopular: false,
        badge: 'Hemat',
        isActive: true,
        order: 2,
        limitations: [{ limitation: 'Tanpa AI Proctoring' }],
      },
      {
        name: 'Pro',
        price: 500000,
        period: 'month' as const,
        currency: 'idr' as const,
        description: 'Solusi terbaik untuk sekolah dan institusi.',
        features: [
          { feature: 'Siswa tak terbatas', isIncluded: true },
          { feature: 'Ujian tak terbatas', isIncluded: true },
          { feature: 'AI Proctoring', isIncluded: true },
          { feature: 'Dukungan Prioritas', isIncluded: true },
          { feature: 'Integrasi SSO/LMS', isIncluded: true },
        ],
        ctaText: 'Pilih Pro',
        ctaLink: '/register?plan=pro',
        isPopular: true,
        badge: 'Paling Populer',
        isActive: true,
        order: 3,
        limitations: [],
      },
      {
        name: 'Campus (Annual)',
        price: 4500000,
        period: 'year' as const,
        currency: 'idr' as const,
        description: 'Paket tahunan hemat untuk perguruan tinggi.',
        features: [
          { feature: 'Semua fitur Pro', isIncluded: true },
          { feature: 'Multi-Kampus & Sub-Instansi', isIncluded: true },
          { feature: 'Pelatihan Admin & Dosen', isIncluded: true },
        ],
        ctaText: 'Ajukan Penawaran',
        ctaLink: '/contact?plan=campus',
        isPopular: false,
        badge: 'Annual',
        isActive: true,
        order: 4,
        limitations: [],
      },
      {
        name: 'Enterprise',
        price: 0,
        period: 'year' as const,
        currency: 'idr' as const,
        description: 'Solusi kustom untuk kebutuhan institusi besar.',
        features: [
          { feature: 'Semua fitur Pro', isIncluded: true },
          { feature: 'Server Khusus', isIncluded: true },
          { feature: 'Manager Akun Khusus', isIncluded: true },
          { feature: 'SLA & Dukungan On-site', isIncluded: true },
        ],
        ctaText: 'Hubungi Sales',
        ctaLink: '/contact',
        isPopular: false,
        badge: 'Custom',
        isActive: true,
        order: 5,
        limitations: [],
      },
    ]
    for (const plan of pricingPlansData) {
      await payloadInstance.create({ collection: 'pricing-plans', data: plan })
    }
    console.log(`✅ ${pricingPlansData.length} Pricing Plans seeded`)

    // 7) FAQ — kategori disesuaikan dengan opsi select di schema
    console.log('Seeding FAQ...')
    const lexical = (text: string) => ({
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [{ type: 'text', text, version: 1 }],
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    })

    // HANYA gunakan kategori ini: 'general' | 'features' | 'technical' | 'pricing' | 'account' | 'support'
    const faqData = [
      {
        question: 'Apa itu SiUJI?',
        category: 'general' as const,
        answer: lexical(
          'SiUJI adalah platform ujian online komprehensif yang dirancang untuk membantu institusi pendidikan melakukan ujian secara efisien, aman, dan terukur.'
        ),
        tags: [{ tag: 'platform' }, { tag: 'ujian online' }, { tag: 'pendidikan' }],
        isActive: true,
        isFeatured: true,
        order: 1,
      },
      {
        question: 'Bagaimana cara kerja fitur anti-kecurangan?',
        category: 'features' as const, // was: features (valid)
        answer: lexical(
          'Kami menggunakan kombinasi AI proctoring, penguncian browser, dan randomisasi soal untuk meminimalkan potensi kecurangan selama ujian berlangsung.'
        ),
        tags: [{ tag: 'anti-kecurangan' }, { tag: 'proctoring' }, { tag: 'keamanan' }],
        isActive: true,
        isFeatured: true,
        order: 2,
      },
      {
        question: 'Apakah data saya aman?',
        category: 'technical' as const, // menggantikan "security"
        answer: lexical(
          'Kami menerapkan enkripsi standar industri, backup rutin, dan praktik keamanan terbaik untuk melindungi soal, jawaban, serta hasil ujian.'
        ),
        tags: [{ tag: 'keamanan data' }, { tag: 'enkripsi' }, { tag: 'privasi' }],
        isActive: true,
        isFeatured: false,
        order: 3,
      },
      {
        question: 'Apakah SiUJI mendukung integrasi SSO dan LMS?',
        category: 'features' as const, // menggantikan "integration"
        answer: lexical(
          'Ya. Kami mendukung SSO (OAuth2/SAML) serta integrasi LMS/SIS melalui API dan webhook untuk sinkronisasi kelas, peserta, dan nilai.'
        ),
        tags: [{ tag: 'SSO' }, { tag: 'LMS' }, { tag: 'integrasi' }],
        isActive: true,
        isFeatured: false,
        order: 4,
      },
      {
        question: 'Bagaimana skema harga untuk sekolah kecil?',
        category: 'pricing' as const, // menggantikan "billing"
        answer: lexical(
          'Gunakan paket Starter untuk kebutuhan sekolah kecil/bimbel. Detail harga dan benefit tersedia pada halaman Pricing.'
        ),
        tags: [{ tag: 'harga' }, { tag: 'starter' }],
        isActive: true,
        isFeatured: false,
        order: 5,
      },
      {
        question: 'Bisakah mengimpor bank soal dari CSV/Excel?',
        category: 'features' as const,
        answer: lexical(
          'Ya, tersedia impor/ekspor bank soal (CSV/Excel) beserta metadata topik dan tingkat kesulitan.'
        ),
        tags: [{ tag: 'bank soal' }, { tag: 'csv' }, { tag: 'excel' }],
        isActive: true,
        isFeatured: false,
        order: 6,
      },
      {
        question: 'Apa itu AI Proctoring di SiUJI?',
        category: 'features' as const,
        answer: lexical(
          'AI Proctoring mendeteksi anomali seperti perpindahan tab berlebih, aktivitas mencurigakan, dan pola perilaku tidak wajar selama ujian.'
        ),
        tags: [{ tag: 'AI' }, { tag: 'proctoring' }],
        isActive: true,
        isFeatured: false,
        order: 7,
      },
      {
        question: 'Bagaimana dukungan saat ujian massal?',
        category: 'support' as const, // valid
        answer: lexical(
          'Kami menyediakan channel prioritas, health-check pra-ujian, serta monitoring aktif ketika ujian massal berlangsung.'
        ),
        tags: [{ tag: 'support' }, { tag: 'mass exam' }],
        isActive: true,
        isFeatured: false,
        order: 8,
      },
      {
        question: 'Apakah tersedia mode offline?',
        category: 'technical' as const,
        answer: lexical(
          'Jawaban peserta tetap tersimpan sementara di perangkat (client-side) dan akan disinkronkan otomatis saat koneksi pulih.'
        ),
        tags: [{ tag: 'offline' }, { tag: 'sinkronisasi' }],
        isActive: true,
        isFeatured: false,
        order: 9,
      },
      {
        question: 'Bagaimana kebijakan refund dan pembatalan?',
        category: 'pricing' as const, // menggantikan "billing"
        answer: lexical(
          'Kebijakan refund mengacu pada perjanjian layanan. Silakan hubungi tim sales/akun Anda untuk penjelasan lebih rinci.'
        ),
        tags: [{ tag: 'billing' }, { tag: 'refund' }],
        isActive: true,
        isFeatured: false,
        order: 10,
      },
      {
        question: 'Apakah tersedia audit log aktivitas pengguna?',
        category: 'technical' as const, // menggantikan "security"
        answer: lexical(
          'Semua aktivitas penting seperti login, pembuatan ujian, perubahan nilai, dan akses data tercatat di audit log.'
        ),
        tags: [{ tag: 'audit' }, { tag: 'observability' }],
        isActive: true,
        isFeatured: false,
        order: 11,
      },
      {
        question: 'Bagaimana cara mengatasi peserta gagal submit?',
        category: 'support' as const, // menggantikan "troubleshooting"
        answer: lexical(
          'Peserta dapat melakukan re-submit selama waktu ujian aktif. Admin dapat memicu re-sync dari panel jika diperlukan.'
        ),
        tags: [{ tag: 'submit' }, { tag: 'resync' }],
        isActive: true,
        isFeatured: false,
        order: 12,
      },
      {
        question: 'Apakah mendukung pengelolaan multi-kampus?',
        category: 'features' as const, // menggantikan "features" (valid)
        answer: lexical(
          'Paket Campus/Enterprise mendukung multi-kampus, kebijakan terpisah per unit, dan pelaporan teragregasi.'
        ),
        tags: [{ tag: 'multi-campus' }, { tag: 'enterprise' }],
        isActive: true,
        isFeatured: false,
        order: 13,
      },
      {
        question: 'Bagaimana perlindungan soal dari kebocoran?',
        category: 'technical' as const, // menggantikan "security"
        answer: lexical(
          'Soal disimpan terenkripsi, akses berbasis peran, serta watermark dinamis untuk meminimalkan kebocoran konten.'
        ),
        tags: [{ tag: 'enkripsi' }, { tag: 'watermark' }],
        isActive: true,
        isFeatured: false,
        order: 14,
      },
      {
        question: 'Apakah ada API publik untuk integrasi?',
        category: 'features' as const, // menggantikan "integration"
        answer: lexical(
          'Tersedia API untuk data peserta, kelas, nilai, dan hasil ujian. Dokumentasi dapat diminta melalui tim support.'
        ),
        tags: [{ tag: 'API' }, { tag: 'integrasi' }],
        isActive: true,
        isFeatured: false,
        order: 15,
      },
    ]

    for (const faq of faqData) {
      await payloadInstance.create({ collection: 'faq', data: faq as any })
    }
    console.log(`✅ ${faqData.length} FAQs seeded`)

    // 8) PORTFOLIO SECTION — lebih dari satu untuk fleksibilitas pengurutan
    console.log('Seeding Portfolio Section...')
    const portfolios = [
      {
        title: 'Dipercaya oleh Institusi Terkemuka',
        logos: [],
        isActive: true,
        order: 1,
      },
      {
        title: 'Partner & Kolaborator',
        logos: [],
        isActive: true,
        order: 2,
      },
    ]
    for (const pf of portfolios) {
      await payloadInstance.create({ collection: 'portfolio-section', data: pf })
    }
    console.log(`✅ ${portfolios.length} Portfolio sections seeded`)

    console.log('\n🎉 All collections seeded successfully!')
    console.log('\n📊 Summary:')
    console.log(`- Hero Section: ${heroVariants.length} records ✅`)
    console.log('- About Section: ✅')
    console.log('- Why Choose Section: ✅')
    console.log(`- Features: ${featuresData.length} ✅`)
    console.log(`- Testimonials: ${testimonialsData.length} ✅`)
    console.log(`- Pricing Plans: ${pricingPlansData.length} ✅`)
    console.log(`- FAQ: ${faqData.length} ✅`)
    console.log(`- Portfolio Section: ${portfolios.length} ✅`)
  } catch (error) {
    console.error('❌ Error during seeding process:', error)
    throw error
  }
}
