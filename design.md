# Ramadan Countdown - Design Plan

## Overview
Aplikasi mudah alih untuk mengira berapa hari, jam, minit, dan saat lagi sehingga 1 Ramadhan tiba. Aplikasi ini direka bentuk untuk pengguna di Malaysia dengan fokus pada kesederhanaan dan kejelasan.

## Screen List

1. **Home Screen** - Skrin utama yang memaparkan countdown Ramadhan
2. **Settings Screen** - Tetapan untuk memilih lokasi/zon waktu (opsional)

## Primary Content and Functionality

### Home Screen
- **Countdown Timer**: Papar hari, jam, minit, dan saat yang tinggal sehingga 1 Ramadhan
- **Target Date**: Papar tarikh sasaran (18/19 Februari 2026)
- **Motivational Message**: Mesej inspiratif berkaitan Ramadhan
- **Visual Elements**: 
  - Ikon bulan sabit (crescent moon)
  - Warna tema Ramadhan (hijau, emas, putih)
  - Animasi halus untuk countdown

### Settings Screen
- Pilihan untuk menetapkan lokasi (untuk ketepatan waktu)
- Pilihan tema gelap/terang
- Maklumat tentang aplikasi

## Key User Flows

1. **User membuka aplikasi** → Home screen memaparkan countdown Ramadhan secara langsung
2. **User mengetik pada Settings** → Tetapan aplikasi (lokasi, tema)
3. **Countdown dikemas kini** → Setiap saat, countdown dikemas kini secara real-time

## Color Choices

| Elemen | Warna Terang | Warna Gelap | Kegunaan |
|--------|-------------|-----------|----------|
| Primary | #1F7A3D (Hijau Ramadhan) | #4ADE80 (Hijau Cerah) | Teks utama, butang |
| Background | #FFFFFF | #0F172A (Gelap) | Latar belakang skrin |
| Surface | #F0FDF4 (Hijau Muda) | #1E293B (Gelap Sederhana) | Kad countdown |
| Accent | #FCD34D (Emas) | #FCD34D (Emas) | Hiasan, ikon |
| Text | #111827 (Hitam Gelap) | #F1F5F9 (Putih) | Teks utama |
| Muted | #6B7280 (Abu-abu) | #94A3B8 (Abu-abu Terang) | Teks sekunder |

## Typography

- **Heading**: Font besar (32-48px) untuk countdown timer
- **Body**: Font sederhana (16-18px) untuk teks biasa
- **Caption**: Font kecil (12-14px) untuk label

## Layout Specifications

- **Portrait Orientation**: Semua skrin direka untuk orientasi potret (9:16)
- **One-Handed Usage**: Semua butang dan elemen interaktif diletakkan dalam jangkauan ibu jari
- **Padding**: 16px dari tepi skrin
- **Spacing**: 12-24px antara elemen

## Interaction Design

- **Countdown Update**: Dikemas kini setiap saat (real-time)
- **Haptic Feedback**: Getaran ringan pada ketukan butang
- **Smooth Animations**: Animasi halus untuk transisi dan perubahan nilai
