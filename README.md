# Vintage Botanica — Undangan Pernikahan Bismi & Rendi

Undangan pernikahan digital bertema **Vintage Botanica** yang responsif, ringan, dan siap di-deploy ke **GitHub Pages**, **Vercel**, atau **Netlify**.

## Cara Membuka / Deploy di GitHub Pages (Agar Tidak Blank)

File `index.html` utama di folder root adalah entry sumber Vite (`/src/main.tsx`) yang harus di-build terlebih dahulu. Tersedia tiga cara agar undangan tampil sempurna di GitHub Pages:

1. **Otomatis lewat GitHub Actions (Disarankan)**
   - Push seluruh project ke GitHub (`main` atau `master`).
   - Buka **Settings → Pages → Source**, pilih **GitHub Actions**.
   - Workflow `.github/workflows/deploy.yml` akan otomatis menjalankan `npm run build` dan menerbitkan folder `dist`.
2. **Langsung dari Branch (`docs/` folder)**
   - Jalankan `npm run build` (otomatis mengisi folder `docs/` dengan path relatif `./assets/...`).
   - Push ke GitHub, lalu buka **Settings → Pages → Deploy from a branch**, pilih branch `main` dan folder **`/docs`** (bukan `/ (root)`).
3. **Upload Hasil Build Manual**
   - Jalankan `npm run build`, lalu unggah seluruh isi folder `dist/` (atau `docs/`) ke repository GitHub Pages Anda.

## Deployment Cepat (Vercel / Netlify)

1. Push repository ini ke GitHub.
2. Hubungkan repository ke **Vercel** atau **Netlify**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. (Opsional) Tambahkan Environment Variable `VITE_GOOGLE_MAPS_API_KEY` dengan API key Google Maps Platform yang telah dibatasi HTTP referrer domain Anda.
