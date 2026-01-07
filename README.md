\# Ramadhan Countdown



Aplikasi Android untuk mengira berapa hari, jam, minit, dan saat lagi sehingga 1 Ramadhan tiba. Dilengkapi dengan jadual waktu imsak dan berbuka untuk semua negeri Malaysia, notifikasi push, dark mode, dan sokongan multi-bahasa.



\## 🎯 Features



\- \*\*⏱️ Real-time Countdown\*\* - Papar hari, jam, minit, dan saat sehingga 1 Ramadhan

\- \*\*📍 Prayer Times\*\* - Jadual Imsak \& Berbuka/Maghrib untuk semua 16 negeri + WP Malaysia

\- \*\*🌙 Dark/Light Mode\*\* - Automatic theme switching berdasarkan system settings

\- \*\*🌐 Multi-language\*\* - Sokongan Bahasa Malaysia dan English

\- \*\*🔔 Push Notifications\*\* - Customizable reminder 5/10/15 minit sebelum Imsak \& Berbuka

\- \*\*📱 Offline Mode\*\* - Berfungsi tanpa internet dengan 7-day cache untuk prayer times

\- \*\*🎯 Share Feature\*\* - Kongsi aplikasi ke WhatsApp, Telegram, dan social media lain

\- \*\*📖 Inspirational Quotes\*\* - 30 Kata Hikmah Ramadhan yang ditampilkan secara random



\## 📥 Installation



\### Method 1: Direct APK Download (Recommended)



1\. \*\*Download APK\*\* dari \[GitHub Releases](https://github.com/AyamBrand/ramadhan-countdown/releases )

2\. \*\*Transfer ke Android device\*\* anda

3\. \*\*Enable Unknown Sources:\*\*

&nbsp;  - Buka Settings → Security → Unknown Sources → Enable

4\. \*\*Install APK:\*\*

&nbsp;  - Tap file APK dan pilih Install

5\. \*\*Buka aplikasi\*\* dan mulai gunakan!



\### Method 2: Build dari Source



\\`\\`\\`bash

\# Clone repository

git clone https://github.com/AyamBrand/ramadhan-countdown.git

cd ramadhan-countdown



\# Install dependencies

pnpm install



\# Run development server

pnpm dev



\# Build APK

npx eas build --platform android --profile preview

\\`\\`\\`


### Method 3: Test on iOS with Expo Go (No App Store Wait!)

Pengguna iOS boleh test aplikasi sekarang menggunakan **Expo Go** tanpa perlu menunggu versi App Store.

#### Cara Menggunakan:

1. **Install Expo Go** dari Apple App Store
2. **Buka aplikasi Ramadhan Countdown:**
   - Scan QR code, ATAU
   - Buka link: https://expo.dev/preview/update?message=Update+README+with+comprehensive+documentation&updateRuntimeVersion=1.0.0&createdAt=2026-01-07T00%3A57%3A35.942Z&slug=exp&projectId=c4a65723-0ed3-4dd0-9b0b-89b8bf172457&group=12cde052-68ea-4cb9-889b-5d42cc5119de

3. **Nikmati aplikasi** - Semua fitur tersedia!

**Catatan:** Expo Go memerlukan internet untuk memuat aplikasi. Setelah dimuat, mod offline akan berfungsi dengan cache data.

Untuk panduan lengkap pengguna iOS, lihat **`iOS_GUIDE_MS.md`**



\## 🚀 Usage



\### Home Screen

\- Papar countdown real-time sehingga 1 Ramadhan

\- Motivational quotes yang berubah setiap kali app dibuka

\- Credit kepada developer dan link website



\### Prayer Times (Jadual )

1\. Pilih negeri dari dropdown

2\. Pilih zon berdasarkan lokasi anda

3\. Lihat jadual Imsak \& Berbuka untuk 30 hari Ramadhan

4\. Data automatically cached untuk offline access



\### Settings

\- \*\*Theme Toggle\*\* - Switch antara Light/Dark mode

\- \*\*Language\*\* - Pilih Bahasa Malaysia atau English

\- \*\*Notifications\*\* - Enable/disable dan set reminder timing

\- \*\*About\*\* - Maklumat aplikasi dan credit

\- \*\*Share\*\* - Kongsi aplikasi ke social media

\- \*\*Exit\*\* - Keluar dari aplikasi



\## 🔧 Technical Stack



\- \*\*Framework:\*\* React Native dengan Expo SDK 54

\- \*\*Language:\*\* TypeScript

\- \*\*UI:\*\* NativeWind (Tailwind CSS for React Native)

\- \*\*State Management:\*\* React Context API + AsyncStorage

\- \*\*API:\*\* Waktu Solat API (api.waktusolat.app) untuk prayer times

\- \*\*Notifications:\*\* expo-notifications

\- \*\*Testing:\*\* Vitest (55+ unit tests)

\- \*\*Build:\*\* EAS (Expo Application Services)



\## 📊 Data Source



Prayer times data diambil dari \*\*JAKIM\*\* (Jabatan Kemajuan Islam Malaysia) melalui \[Waktu Solat API](https://api.waktusolat.app ).



\*\*Zones Supported:\*\* 70+ zones di 16 negeri + 3 Wilayah Persekutuan Malaysia



\## 🌐 Supported Languages



\- 🇲🇾 \*\*Bahasa Malaysia\*\* (Default)

\- 🇬🇧 \*\*English\*\*



\## 📱 Supported Devices



\- \*\*Android:\*\* 5.0+ (API 21+)

\- \*\*Minimum RAM:\*\* 100MB

\- \*\*Storage:\*\* ~50MB



\## 🔐 Privacy \& Permissions



\- \*\*POST\_NOTIFICATIONS\*\* - Untuk push notifications (optional, dapat disabled di Settings)

\- \*\*No data collection\*\* - Semua data disimpan locally di device anda

\- \*\*No internet required\*\* - Aplikasi boleh digunakan offline



\## 🐛 Known Issues



\- Widget feature removed (library compatibility issues dengan EAS build)

\- iOS build belum disediakan (Android primary target)



\## 📝 Changelog



\### v1.0.0 (January 2026)

\- Initial release

\- Full countdown functionality

\- Prayer times integration

\- Multi-language support

\- Dark mode

\- Push notifications

\- Offline mode

\- Share functionality



\## 🤝 Contributing



Untuk bug reports atau feature requests, sila buka \[GitHub Issues](https://github.com/AyamBrand/ramadhan-countdown/issues ).



\## 📄 License



Proprietary - All rights reserved ©2026 Muktasyaf AnNamir



\## 👨‍💻 Developer



\*\*Muktasyaf AnNamir\*\*

\- Website: https://www.annamir.my

\- GitHub: \[@AyamBrand](https://github.com/AyamBrand )



---



\*\*Selamat Berpuasa! 🌙\*\*



Semoga aplikasi ini membantu anda dalam persiapan dan menjalankan ibadah Ramadhan dengan lebih baik.



