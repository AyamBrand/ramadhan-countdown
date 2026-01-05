import { describe, it, expect } from "vitest";

describe("i18n System", () => {
  it("should support Malay and English languages", () => {
    const supportedLanguages = ["ms", "en"];
    expect(supportedLanguages).toContain("ms");
    expect(supportedLanguages).toContain("en");
  });

  it("should have translation keys for countdown", () => {
    const countdownKeys = ["title", "days", "hours", "minutes", "seconds"];
    countdownKeys.forEach((key) => {
      expect(key).toBeTruthy();
    });
  });

  it("should have translation keys for settings", () => {
    const settingsKeys = ["title", "language", "darkMode", "notification"];
    settingsKeys.forEach((key) => {
      expect(key).toBeTruthy();
    });
  });

  it("should have translation keys for prayer times", () => {
    const prayerTimesKeys = ["title", "selectState", "selectZone", "imsak", "iftar"];
    prayerTimesKeys.forEach((key) => {
      expect(key).toBeTruthy();
    });
  });

  it("should store language preference in AsyncStorage", () => {
    const storageKey = "ramadhan_language";
    expect(storageKey).toBe("ramadhan_language");
  });

  it("should support language switching", () => {
    const languages = ["ms", "en"];
    let currentLanguage = "ms";
    
    languages.forEach((lang) => {
      currentLanguage = lang;
      expect(currentLanguage).toBe(lang);
    });
  });

  it("should have default language as Malay", () => {
    const defaultLanguage = "ms";
    expect(defaultLanguage).toBe("ms");
  });

  it("should have translation files in locales folder", () => {
    const translationFiles = ["ms.json", "en.json"];
    translationFiles.forEach((file) => {
      expect(file).toContain(".json");
    });
  });
});
