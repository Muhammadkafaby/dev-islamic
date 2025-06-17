# 🕌 Islamic Dev App

Aplikasi web Islamic yang komprehensif dengan berbagai fitur untuk membantu kehidupan spiritual Muslim sehari-hari. Dibangun dengan React, TypeScript, dan Tailwind CSS.

🌐 **Live Demo**: [islamic-dev.netlify.app](https://islamic-dev.netlify.app)

## ✨ Fitur Utama

### 🕐 Jadwal Shalat

- Menampilkan waktu shalat akurat berdasarkan lokasi
- Input kota untuk mendapatkan jadwal shalat
- Tampilan countdown waktu shalat berikutnya
- Interface yang bersih dan mudah dibaca

### 📖 Al-Quran

- Reader Al-Quran dengan teks Arab dan terjemahan
- Navigasi mudah antar surah dan ayat
- Font Arabic yang jernih dan mudah dibaca
- Antarmuka yang responsif untuk berbagai perangkat

### 🤲 Ayat Harian

- Menampilkan ayat Al-Quran pilihan setiap hari
- Terjemahan dalam Bahasa Indonesia
- Referensi surah dan nomor ayat yang lengkap

### 🎯 Doa Harian

- Koleksi doa-doa pilihan untuk keseharian
- Teks Arab dengan transliterasi
- Terjemahan yang mudah dipahami

### 🧭 Penunjuk Kiblat

- Fitur pencari arah kiblat berdasarkan lokasi
- Menggunakan geolokasi untuk akurasi maksimal
- Kompas digital yang interaktif

### 🌙 Puasa Sunnah

- Panduan jadwal puasa sunnah
- Informasi lengkap tentang berbagai jenis puasa sunnah
- Reminder dan motivasi untuk ibadah tambahan

## 🛠️ Teknologi yang Digunakan

### Frontend

- **React 18** - Library JavaScript untuk membangun UI
- **TypeScript** - Superset JavaScript dengan type safety
- **Vite** - Build tool yang cepat dan modern
- **Tailwind CSS** - Utility-first CSS framework

### UI/UX

- **Lucide React** - Icon library yang modern dan konsisten
- **Responsive Design** - Optimal di desktop, tablet, dan mobile
- **Dark/Light Mode** - Tema yang dapat disesuaikan (jika tersedia)

### APIs & Services

- **Islamic API** - Layanan data Islamic untuk jadwal shalat dan Al-Quran
- **Geolocation API** - Untuk fitur penunjuk kiblat

## 🚀 Instalasi dan Penggunaan

### Prasyarat

- Node.js (versi 16 atau lebih baru)
- npm atau yarn

### Instalasi Lokal

```bash
# Clone repository
git clone https://github.com/Muhammadkafaby/dev-islamic.git

# Masuk ke direktori project
cd dev-islamic

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

### Build Production

```bash
# Build untuk production
npm run build

# Preview build
npm run preview
```

## 📁 Struktur Project

```
dev-islamic/
├── src/
│   ├── components/          # React components
│   │   ├── DailyDua.tsx    # Komponen doa harian
│   │   ├── PrayerTimes.tsx # Komponen jadwal shalat
│   │   ├── QiblaFinder.tsx # Komponen penunjuk kiblat
│   │   ├── QuranReader.tsx # Komponen pembaca Al-Quran
│   │   ├── QuranVerse.tsx  # Komponen ayat harian
│   │   └── SunnahFasting.tsx # Komponen puasa sunnah
│   ├── data/               # Data statis
│   │   ├── duas.ts         # Data doa-doa
│   │   └── sunnahFasting.ts # Data puasa sunnah
│   ├── services/           # API services
│   │   └── islamicApi.ts   # Service untuk Islamic API
│   ├── types/              # TypeScript definitions
│   │   └── islamic.ts      # Type definitions
│   ├── App.tsx             # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                 # Static assets
├── package.json           # Dependencies dan scripts
├── tailwind.config.js     # Tailwind configuration
├── vite.config.ts         # Vite configuration
└── README.md              # Dokumentasi project
```

## 🎨 Fitur UI/UX

- **Design Modern**: Interface yang clean dan modern dengan menggunakan Tailwind CSS
- **Responsive**: Optimal di semua ukuran layar (mobile, tablet, desktop)
- **Intuitive Navigation**: Navigasi yang mudah dipahami dan user-friendly
- **Loading States**: Indikator loading untuk memberikan feedback kepada user
- **Error Handling**: Penanganan error yang baik dengan pesan yang informatif

## 🔧 Scripts

- `npm run dev` - Menjalankan development server
- `npm run build` - Build aplikasi untuk production
- `npm run preview` - Preview build production
- `npm run lint` - Menjalankan ESLint untuk code quality

## 🌟 Kontribusi

Kontribusi selalu diterima! Jika Anda ingin berkontribusi:

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 Todo / Roadmap

- [ ] Implementasi notifikasi waktu shalat
- [ ] Fitur bookmark ayat favorit
- [ ] Audio recitation Al-Quran
- [ ] Kalender Hijriah
- [ ] Fitur pencarian dalam Al-Quran
- [ ] Tema dark mode
- [ ] PWA (Progressive Web App) support
- [ ] Offline functionality

## 📄 Lisensi

Project ini dilisensikan di bawah [MIT License](LICENSE).

## 🤝 Dukungan

Jika Anda mengalami masalah atau memiliki saran, silakan:

- Buat [issue](https://github.com/Muhammadkafaby/dev-islamic/issues) di GitHub
- Hubungi developer melalui email

## 📞 Kontak

- **Website**: [islamic-dev.netlify.app](https://islamic-dev.netlify.app)
- **GitHub**: [github.com/Muhammadkafaby/dev-islamic](https://github.com/Muhammadkafaby/dev-islamic)

---

**Barakallahu fiikum** - Semoga aplikasi ini bermanfaat untuk kehidupan spiritual kita semua. 🤲
