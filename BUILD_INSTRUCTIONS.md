# Ramadhan Countdown - Build & Release Instructions

## Step 1: Build APK (Current Status)

Build command yang sedang running:
```bash
npx eas build --platform android --profile preview
```

**Expected output:**
- Build successful ✅
- APK file generated dan ready untuk download

---

## Step 2: Download APK from Expo Dashboard

1. Buka Expo dashboard: https://expo.dev/accounts/annamir2u/projects/ramadan-countdown
2. Cari latest build
3. Click "Download" untuk APK file
4. Save sebagai `ramadhan-countdown.apk`

---

## Step 3: Create GitHub Release

### Option A: Using GitHub CLI (Recommended)

```bash
# Ensure you're in project directory
cd C:\ramadhan-countdown-v1\ramadhan-countdown

# Create release with APK
gh release create v1.0.0 ./ramadhan-countdown.apk \
    --title "Ramadhan Countdown v1.0.0" \
    --notes "Aplikasi Android untuk mengira berapa hari, jam, minit, dan saat lagi sehingga 1 Ramadhan tiba."
```

### Option B: Using GitHub Web Interface

1. Buka repository: https://github.com/AyamBrand/ramadhan-countdown
2. Click "Releases" → "Create a new release"
3. Tag version: `v1.0.0`
4. Title: `Ramadhan Countdown v1.0.0`
5. Upload APK file
6. Publish release

---

## Step 4: Update README.md

1. Copy content dari `README_GITHUB.md`
2. Replace existing `README.md`
3. Commit dan push:
```bash
git add README.md
git commit -m "Update README with comprehensive documentation"
git push origin main
```

---

## Step 5: Make Repository Public (Optional)

1. Buka repository settings: https://github.com/AyamBrand/ramadhan-countdown/settings
2. Scroll to "Danger Zone"
3. Click "Change repository visibility"
4. Select "Public"
5. Confirm

---

## Step 6: Share & Distribute

**Share download link:**
```
https://github.com/AyamBrand/ramadhan-countdown/releases/tag/v1.0.0
```

**Or direct APK link:**
```
https://github.com/AyamBrand/ramadhan-countdown/releases/download/v1.0.0/ramadhan-countdown.apk
```

---

## Troubleshooting

### Build Failed
- Check Expo dashboard logs: https://expo.dev/accounts/annamir2u/projects/ramadan-countdown
- Common issues: Gradle errors, dependency conflicts
- Solution: Run `pnpm install` dan try again

### APK Installation Issues
- Enable "Unknown Sources" di Android Settings
- Ensure Android version 5.0+
- Check storage space (minimum 50MB)

### GitHub Release Issues
- Ensure `gh` CLI is installed: `npm install -g @github/cli`
- Login to GitHub: `gh auth login`
- Verify repository access

---

## Version Management

For future releases:
- Update version in `package.json` dan `app.config.ts`
- Create new build: `npx eas build --platform android --profile preview`
- Create GitHub release dengan new version tag
- Update README dengan changelog

---

**Questions?** Check Expo docs: https://docs.expo.dev/build/setup/
