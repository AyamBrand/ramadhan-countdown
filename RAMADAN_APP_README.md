# Ramadan Countdown - Aplikasi Android

Aplikasi mudah alih untuk mengira berapa hari, jam, minit, dan saat lagi sehingga 1 Ramadhan tiba. Aplikasi ini direka khusus untuk pengguna di Malaysia dengan antara muka yang menarik dan tema Ramadhan yang indah.

## Ciri-Ciri Utama

- **Countdown Real-Time**: Papar countdown yang dikemas kini setiap saat
- **Tema Ramadhan**: Warna hijau (#1F7A3D) dan emas (#FCD34D) yang sesuai dengan tema Ramadhan
- **Dark Mode**: Sokongan penuh untuk mode gelap dan terang
- **Responsive Design**: Reka bentuk yang sesuai untuk semua saiz peranti Android
- **Tarikh Tepat**: Menggunakan tarikh jangkaan 18 Februari 2026 sebagai sasaran

## Struktur Aplikasi

```
app/
├── (tabs)/
│   ├── _layout.tsx       ← Konfigurasi tab bar
│   └── index.tsx         ← Home screen dengan countdown
components/
├── countdown-display.tsx ← Komponen papar countdown
└── screen-container.tsx  ← Wrapper untuk SafeArea
hooks/
├── use-countdown.ts      ← Hook untuk logik countdown
└── use-countdown.test.ts ← Unit tests
assets/images/
├── icon.png              ← App icon (bulan sabit)
├── splash-icon.png       ← Splash screen icon
└── favicon.png           ← Web favicon
```

## Cara Menggunakan

### Memulakan Aplikasi

1. **Pasang dependencies**:
   ```bash
   pnpm install
   ```

2. **Jalankan dev server**:
   ```bash
   pnpm dev
   ```

3. **Buka di Android**:
   - Scan QR code yang ditunjukkan di terminal menggunakan Expo Go
   - Atau jalankan: `pnpm android`

4. **Buka di Web**:
   - Aplikasi akan terbuka secara automatik di `http://localhost:8081`

### Menjalankan Tests

```bash
pnpm test
```

Semua unit tests untuk countdown logic akan dijalankan dan sepatutnya lulus.

## Penyesuaian

### Menukar Tarikh Sasaran

Jika anda ingin menukar tarikh sasaran (contohnya untuk tahun depan), ubah tarikh dalam `hooks/use-countdown.ts`:

```typescript
// Tukar baris ini:
const targetDate = new Date(2026, 1, 18, 0, 0, 0).getTime();

// Kepada:
const targetDate = new Date(2027, 1, 8, 0, 0, 0).getTime(); // 2027
```

### Menukar Warna Tema

Warna tema ditakrifkan dalam `theme.config.js`. Anda boleh mengubah warna utama:

```javascript
primary: { light: '#1F7A3D', dark: '#4ADE80' }, // Hijau Ramadhan
accent: { light: '#FCD34D', dark: '#FCD34D' },  // Emas
```

## Teknologi yang Digunakan

- **React Native 0.81** - Framework untuk aplikasi mudah alih
- **Expo SDK 54** - Platform untuk membangun aplikasi React Native
- **TypeScript 5.9** - Bahasa pemrograman yang aman
- **NativeWind 4** - Tailwind CSS untuk React Native
- **Expo Router 6** - Sistem navigasi
- **Vitest** - Framework untuk unit testing

## Struktur Countdown

Countdown memaparkan empat komponen utama:

| Komponen | Julat | Contoh |
|----------|-------|--------|
| Hari | 0-∞ | 48 |
| Jam | 0-23 | 12 |
| Minit | 0-59 | 30 |
| Saat | 0-59 | 45 |

Apabila tarikh sasaran telah dicapai, aplikasi akan memaparkan mesej "Selamat Datang Ramadhan!" dengan emoji bulan sabit.

## Arahan Pembangunan Lanjut

### Menambah Fitur Baru

1. Buat komponen baru dalam `components/`
2. Gunakan `ScreenContainer` untuk SafeArea handling
3. Gunakan Tailwind classes untuk styling
4. Uji dengan `pnpm test`

### Menambah Screen Baru

1. Buat fail baru dalam `app/(tabs)/`
2. Daftarkan dalam `app/(tabs)/_layout.tsx`
3. Tambah icon mapping dalam `components/ui/icon-symbol.tsx`

## Sokongan dan Bantuan

Untuk soalan atau masalah, sila semak:
- Dokumentasi Expo: https://docs.expo.dev
- NativeWind: https://www.nativewind.dev
- React Native: https://reactnative.dev

## Lesen

Aplikasi ini dibina dengan Expo dan React Native. Sila rujuk lesen masing-masing untuk maklumat lebih lanjut.

---

**Dibuat dengan ❤️ untuk menyambut Ramadhan**
