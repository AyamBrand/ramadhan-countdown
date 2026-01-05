import { useEffect, useState } from "react";

/**
 * Hook untuk mendapatkan random motivational quote tentang Ramadhan
 * Quote akan berubah setiap kali app dibuka
 */
export function useRandomQuote(): string {
  const [quote, setQuote] = useState<string>("");

  const quotes = [
    "🌙 Ramadhan adalah bulan berkah penuh dengan kebaikan dan ampunan.",
    "✨ Bulan Ramadhan adalah kesempatan emas untuk memperbaiki diri dan mendekatkan diri kepada Allah.",
    "💚 Setiap hari dalam Ramadhan adalah peluang baru untuk berbuat kebaikan.",
    "🤲 Ramadhan mengajarkan kita tentang kesabaran, keikhlasan, dan kepedulian kepada sesama.",
    "📖 Bacalah Al-Quran dengan penuh khusyuk dan renungan di bulan Ramadhan.",
    "🕌 Ramadhan adalah bulan untuk memperkuat ikatan keluarga dan persahabatan.",
    "🌟 Manfaatkan setiap momen Ramadhan untuk meningkatkan ibadah dan amal soleh.",
    "💪 Berpuasa bukan hanya tentang menahan lapar, tetapi menahan hawa nafsu.",
    "🤝 Ramadhan adalah waktu untuk saling memaafkan dan memulai dari awal.",
    "🌠 Malam Lailatul Qadr dalam Ramadhan lebih baik daripada seribu bulan.",
  ];

  useEffect(() => {
    // Pilih random quote setiap kali component mount
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return quote;
}
