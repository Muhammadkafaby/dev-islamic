# React Native Dev Islamic App

Ini adalah implementasi awal aplikasi Dev Islamic versi mobile menggunakan React Native dan React Navigation. Proyek ini menampilkan lima tab utama dan tema warna emerald dengan ikon bergaya islami.

## Fitur

- **Navigasi Tab**: Sholat, Quran, Jadwal, Komunitas, AI Assistant.
- **Penanda Waktu Sholat**: Otomatis mengambil lokasi pengguna dan menampilkan waktu sholat menggunakan API [Aladhan](https://aladhan.com/prayer-times-api).
- **AI Assistant**: Layar percakapan sederhana dengan API GPT untuk menjawab pertanyaan seputar Islam.
- **Ayat Harian**: Widget yang menampilkan ayat Al-Qur'an secara acak setiap kali dibuka.
- **Jadwal Hijriah**: Menampilkan tanggal hijriah hari ini pada menu Jadwal.
- **Halal Scanner & Mode Anak**: Akses dari tab Komunitas dengan navigasi terpisah.

## Menjalankan

Aplikasi ini dirancang agar mudah dijalankan menggunakan Expo CLI:

```bash
npm install -g expo-cli
cd react-native-app
expo start
```

Pastikan Anda menambahkan kunci OpenAI pada `AssistantScreen.tsx` sebelum menjalankan fitur AI.
