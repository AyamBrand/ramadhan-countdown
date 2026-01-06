import { useLanguageContext } from "@/lib/language-provider";
import ms from "@/locales/ms.json";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

type TranslationKeys = typeof ms;

const translations: Record<"ms" | "en" | "ar", TranslationKeys> = {
  ms,
  en,
  ar,
};

/**
 * Custom hook untuk mendapatkan translation berdasarkan language yang dipilih
 * Usage: const t = useTranslation(); t('countdown.days')
 */
export function useTranslation() {
  const { language } = useLanguageContext();

  /**
   * Mendapatkan translation value berdasarkan key path
   * Contoh: t('countdown.days') → "HARI" atau "DAYS"
   */
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language as "ms" | "en" | "ar"];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return key jika tidak ditemukan
      }
    }

    return typeof value === "string" ? value : key;
  };



  return t;
}
