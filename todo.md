# Ramadan Countdown - Project TODO

## Core Features
- [x] Countdown timer yang mengira hari, jam, minit, saat sehingga 1 Ramadhan
- [x] Papar tarikh sasaran (18/19 Februari 2026)
- [ ] Animasi countdown yang halus
- [ ] Ikon bulan sabit dan elemen visual Ramadhan
- [x] Tema warna Ramadhan (hijau, emas, putih)

## UI/UX
- [x] Home screen dengan countdown timer
- [ ] Settings screen untuk lokasi dan tema
- [x] Responsive design untuk semua saiz peranti
- [x] Dark mode support

## Polish & Optimization
- [ ] Haptic feedback pada interaksi
- [ ] Smooth animations
- [ ] Performance optimization
- [x] Testing pada Android dan web

## Deployment
- [x] Generate app logo dan icon
- [x] Update app.config.ts dengan branding
- [ ] Final testing
- [ ] Checkpoint untuk deployment

## Widget Android
- [x] Membuat Android App Widget (medium size 4x4) - REMOVED (library incompatible dengan EAS build)
- [x] Memaparkan countdown (hari, jam, minit, saat) - REMOVED
- [x] Tap widget untuk buka aplikasi - REMOVED
- [x] Update widget setiap minit - REMOVED
- [x] Styling widget dengan tema Ramadhan - REMOVED
- [x] Tajuk widget "Kiraan Ramadhan" - REMOVED

## Requirement Pengguna
- [x] Link website dengan redirect ke https://mylink.la/annamir
- [x] Credit nama: Dibangunkan oleh: ©2026 Muktasyaf AnNamir
- [x] Buang Home button, ganti dengan Exit button
- [x] Ubah App Name ke "Ramadhan Countdown"
- [x] Random motivational quotes (10 varian)
- [x] Widget dengan saat dan tajuk "Kiraan Ramadhan"

## Halaman Jadual Imsak/Berbuka
- [x] Membuat halaman baru untuk jadual imsak/berbuka
- [x] Integrasi dengan e-solat.gov.my API
- [x] Pilihan negeri untuk seluruh Malaysia
- [x] Senarai harian jadual (1-30 Ramadhan)
- [x] Theme toggle button (Bulan/Matahari)
- [x] Dark/Light mode support
- [x] Halaman Settings dengan theme toggle
- [x] Tab navigation (Home, Jadual, Tetapan)


## Bug Fixes
- [x] Fix API fetch error - guna waktusolat.app API yang benar
- [x] Tampilkan semua negeri (16 negeri + WP)
- [x] Tambah pilihan zon untuk setiap negeri (70+ zon)
- [x] Parse Unix timestamp dari API ke HH:MM format


## Fixes & Improvements
- [x] Fix warna "BERBUKA" di night mode (pastikan readable)
- [x] Buang tab Kalender (tidak menarik)
- [x] Ubah warna warning dark ke #FCD34D untuk readable
- [x] Tambah warna berbuka light/dark mode berbeza untuk kontras
- [x] Fix zone selector button text color di light/dark mode
- [x] Tambah 30 Kata Hikmah Ramadhan dengan random display

## Background Pattern
- [ ] Inject Islamic pattern tiles ke aplikasi
- [ ] Set opacity rendah (15-20%) untuk subtle effect
- [ ] Add solid background color atau gradient
- [ ] Test di light dan dark mode


## Build & Deployment (Current)
- [x] Fix eas.json configuration - remove invalid serviceAccount field
- [x] Add EAS project ID ke app.config.ts
- [ ] Complete Android APK build via EAS
- [ ] Download APK from Expo dashboard
- [ ] Create GitHub Release
- [ ] Upload APK to GitHub Release
- [ ] Make repository public
- [ ] Add comprehensive README dengan download instructions


## Pending Changes (Waiting for User)
- [ ] User akan update beberapa bahagian lain
- [ ] Push all changes ke GitHub
- [ ] Build APK v1.0.1 dengan bug fixes
- [ ] Create GitHub Release v1.0.1
- [ ] Update README dengan iOS Expo Go option
