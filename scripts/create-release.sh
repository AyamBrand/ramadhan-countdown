#!/bin/bash

# Script untuk create GitHub Release dan upload APK
# Usage: ./scripts/create-release.sh <version> <apk_path>

VERSION=$1
APK_PATH=$2

if [ -z "$VERSION" ] || [ -z "$APK_PATH" ]; then
    echo "Usage: ./scripts/create-release.sh <version> <apk_path>"
    echo "Example: ./scripts/create-release.sh v1.0.0 ./ramadhan-countdown.apk"
    exit 1
fi

# Check if APK exists
if [ ! -f "$APK_PATH" ]; then
    echo "Error: APK file not found at $APK_PATH"
    exit 1
fi

echo "Creating GitHub Release: $VERSION"
echo "APK file: $APK_PATH"

# Create release with gh CLI
gh release create "$VERSION" "$APK_PATH" \
    --title "Ramadhan Countdown $VERSION" \
    --notes "Aplikasi Android untuk mengira berapa hari, jam, minit, dan saat lagi sehingga 1 Ramadhan tiba.

**Features:**
- ⏱️ Real-time countdown (hari, jam, minit, saat)
- 📍 Prayer times (Imsak & Berbuka/Maghrib) untuk semua negeri Malaysia
- 🌙 Dark/Light mode support
- 🌐 Multi-language (Bahasa Malaysia & English)
- 🔔 Push notifications (customizable timing)
- 📱 Offline mode dengan 7-day cache
- 🎯 Share functionality untuk social media
- 📖 30 Kata Hikmah Ramadhan

**Download & Install:**
1. Download APK dari release ini
2. Transfer ke Android device anda
3. Enable 'Unknown sources' di Settings > Security
4. Tap APK file untuk install

**Data Source:**
Prayer times data dari JAKIM via api.waktusolat.app

**Developed by:**
©2026 Muktasyaf AnNamir
" \
    --draft=false

if [ $? -eq 0 ]; then
    echo "✅ Release created successfully!"
else
    echo "❌ Failed to create release"
    exit 1
fi
