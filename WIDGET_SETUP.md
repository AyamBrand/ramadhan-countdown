# Android Widget Setup - Ramadan Countdown

Panduan lengkap untuk setup dan build Android widget untuk aplikasi Ramadan Countdown.

## Struktur Widget

Widget ini adalah **Android App Widget** dengan ukuran medium (4x4) yang memaparkan:
- Hari tinggal sehingga Ramadhan
- Jam tinggal
- Minit tinggal
- Tap untuk buka aplikasi

## File-File Widget

```
android/
├── app/src/main/
│   ├── java/com/manus/ramadancountdown/widget/
│   │   └── RamadanCountdownWidget.java    ← Widget Provider
│   ├── res/
│   │   ├── layout/
│   │   │   └── widget_ramadan_countdown.xml  ← Widget UI Layout
│   │   ├── xml/
│   │   │   └── widget_ramadan_countdown_info.xml  ← Widget Configuration
│   │   ├── drawable/
│   │   │   └── widget_background.xml  ← Widget Background Style
│   │   └── values/
│   │       └── strings.xml  ← Widget Strings
│   └── AndroidManifest.xml  ← Widget Registration
```

## Cara Build dan Test

### 1. Persediaan Awal

Pastikan anda sudah:
- Pasang Android Studio
- Pasang Android SDK (API level 24 atau lebih tinggi)
- Pasang Java Development Kit (JDK 11 atau lebih tinggi)

### 2. Build APK dengan Widget

```bash
# Dari root directory projek
cd android

# Build APK
./gradlew assembleDebug

# APK akan berada di: android/app/build/outputs/apk/debug/app-debug.apk
```

### 3. Install dan Test di Emulator/Device

```bash
# Install APK
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Atau gunakan Expo untuk build:
eas build --platform android --profile preview
```

### 4. Tambah Widget ke Homescreen

1. Buka emulator atau device Android
2. Tekan lama pada homescreen kosong
3. Pilih "Widgets"
4. Cari "Ramadan Countdown Widget"
5. Drag ke homescreen
6. Widget akan muncul dan memaparkan countdown

## Cara Widget Berfungsi

### Update Frequency
- Widget dikemas kini setiap **60 saat** (boleh diubah dalam `widget_ramadan_countdown_info.xml`)
- Countdown dikira berdasarkan timezone Malaysia (Asia/Kuala_Lumpur)

### Click Handler
- Ketika user tap widget, aplikasi akan dibuka
- Intent flag: `FLAG_ACTIVITY_NEW_TASK | FLAG_ACTIVITY_CLEAR_TASK`

### Countdown Logic
- Target: 18 Februari 2026 00:00:00
- Jika sudah melewati: Widget akan menunjukkan 0 hari, 0 jam, 0 minit

## Penyesuaian Widget

### Menukar Tarikh Sasaran

Edit `RamadanCountdownWidget.java`:

```java
// Tukar baris ini:
targetCalendar.set(2026, Calendar.FEBRUARY, 18, 0, 0, 0);

// Kepada (contoh 2027):
targetCalendar.set(2027, Calendar.FEBRUARY, 8, 0, 0, 0);
```

### Menukar Update Frequency

Edit `widget_ramadan_countdown_info.xml`:

```xml
<!-- Tukar dari 60000ms (60 saat) kepada nilai lain -->
android:updatePeriodMillis="60000"

<!-- Contoh: 30 saat -->
android:updatePeriodMillis="30000"

<!-- Contoh: 5 minit -->
android:updatePeriodMillis="300000"
```

### Menukar Warna Widget

Edit `widget_ramadan_countdown.xml` dan `widget_background.xml`:

```xml
<!-- Warna hijau Ramadhan -->
android:textColor="#1F7A3D"

<!-- Warna latar belakang -->
<solid android:color="#F0FDF4" />
```

## Troubleshooting

### Widget tidak muncul di widget list
- Pastikan `AndroidManifest.xml` sudah didaftarkan dengan betul
- Restart device atau emulator
- Pastikan app sudah diinstall dengan betul

### Widget tidak update countdown
- Pastikan `updatePeriodMillis` tidak terlalu kecil (minimum 30 saat)
- Periksa timezone di device (pastikan set ke Asia/Kuala_Lumpur)
- Restart widget dengan remove dan add semula

### Click pada widget tidak buka app
- Pastikan `MainActivity.class` ada dalam package
- Periksa `PendingIntent` flags di `RamadanCountdownWidget.java`

## Resources

- [Android App Widgets Documentation](https://developer.android.com/guide/topics/appwidgets)
- [RemoteViews API](https://developer.android.com/reference/android/widget/RemoteViews)
- [AppWidgetProvider](https://developer.android.com/reference/android/appwidget/AppWidgetProvider)

---

**Nota:** Widget ini memerlukan native Android build. Jika anda menggunakan Expo managed workflow, anda perlu menggunakan EAS Build atau membuat custom development client.
