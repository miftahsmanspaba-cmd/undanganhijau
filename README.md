# Vintage Botanica — Undangan Pernikahan Digital

Undangan pernikahan digital bertema **Vintage Botanica** yang responsif, ringan, dan siap diunggah ke GitHub serta di-deploy secara instan ke **Vercel** atau **Netlify**.

## Fitur Utama

- **Personalisasi Nama Tamu (`?to=Nama+Tamu`)**: Otomatis menampilkan nama tamu di sampul undangan dan mengisi formulir buku tamu.
- **Musik Latar Otomatis**: Dilengkapi synthesizer harpa/piano akustik bawaan (Web Audio API) yang langsung berputar saat tombol *Buka Undangan* ditekan, serta mendukung URL file MP3 kustom.
- **Hitung Mundur Acara & Kalender**: Hitung mundur waktu nyata (Hari, Jam, Menit, Detik) dengan tombol *Simpan di Google Calendar* dan unduhan pengingat `.ics`.
- **Navigasi Lokasi Terintegrasi Google Maps**: Peta interaktif `@vis.gl/react-google-maps` dengan pin lokasi, perhitungan rute dari lokasi asal/GPS via Routes API, serta tautan langsung ke aplikasi Google Maps.
- **Galeri Foto Elegan**: Grid foto editorial dengan Lightbox layar penuh dan navigasi keyboard.
- **Buku Tamu Digital Interaktif**: Formulir RSVP (Hadir, Masih Ragu, Berhalangan) beserta ucapan & doa dengan filter kategori.
- **Halaman Ucapan Terima Kasih & Pengelola Acara**: Kartu ucapan terima kasih yang siap cetak, rekening tanda kasih salin-cepat, generator tautan `?to=`, serta ekspor `index.html` mandiri tanpa library berat.

## Deployment Cepat (Vercel / Netlify)

1. Push repository ini ke GitHub.
2. Hubungkan repository ke **Vercel** atau **Netlify**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. (Opsional) Tambahkan Environment Variable `VITE_GOOGLE_MAPS_API_KEY` dengan API key Google Maps Platform yang telah dibatasi HTTP referrer domain Anda.
