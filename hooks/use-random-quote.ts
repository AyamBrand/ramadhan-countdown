import { useEffect, useState } from "react";

/**
 * Hook untuk mendapatkan random kata hikmah tentang Ramadhan
 * Kata hikmah akan berubah setiap kali app dibuka
 */
export function useRandomQuote(): string {
  const [quote, setQuote] = useState<string>("");

  const quotes = [
    "Ramadhan adalah bulan berkah, bulan ampunan, dan bulan pembebasan dari neraka.",
    "Puasa adalah perisai, maka apabila salah seorang di antara kamu berpuasa, janganlah berbuat keji dan janganlah berteriak.",
    "Dalam Ramadhan, pintu-pintu surga dibuka dan pintu-pintu neraka ditutup, serta syaitan-syaitan dirantai.",
    "Barangsiapa yang berpuasa Ramadhan dengan iman dan mengharap pahala dari Allah, maka dihapuskan dosa-dosanya yang telah lalu.",
    "Makanan dan minuman yang halal adalah kunci keberkatan hidup kita, terutama saat berpuasa.",
    "Ramadhan adalah kesempatan emas untuk mendekatkan diri kepada Allah dan memperbaiki akhlak.",
    "Jangan sia-siakan Ramadhan dengan hal-hal yang tidak bermanfaat, manfaatkan setiap detik untuk ibadah.",
    "Orang yang berpuasa akan merasakan kesulitan lapar dan haus, sehingga dapat merasakan penderitaan orang-orang yang kurang mampu.",
    "Berbagi rezeki kepada yang membutuhkan di bulan Ramadhan akan mendapat pahala berlipat ganda.",
    "Niat yang ikhlas adalah fondasi dari setiap ibadah, termasuk puasa di bulan Ramadhan.",
    "Ramadhan mengajarkan kita untuk sabar, disiplin, dan mengendalikan hawa nafsu.",
    "Setiap detik di bulan Ramadhan adalah peluang untuk bertaubat dan memulai hidup yang lebih baik.",
    "Doa di bulan Ramadhan, terutama saat berbuka, memiliki kekuatan yang luar biasa untuk dikabulkan.",
    "Membaca Al-Quran di bulan Ramadhan adalah ibadah yang sangat mulia dan penuh berkah.",
    "Jangan lupa untuk menjaga silaturahmi dengan keluarga dan teman-teman di bulan Ramadhan.",
    "Ramadhan adalah bulan untuk mengevaluasi diri dan memperbaiki kesalahan-kesalahan yang telah kita lakukan.",
    "Orang yang berpuasa akan mendapatkan doa dari malaikat hingga berbuka puasa.",
    "Kesabaran dalam menghadapi godaan dan tantangan di bulan Ramadhan akan memperkuat iman kita.",
    "Berbuka puasa dengan makanan sederhana namun dengan rasa syukur lebih bernilai daripada makanan mewah tanpa rasa syukur.",
    "Ramadhan adalah waktu yang tepat untuk meninggalkan kebiasaan-kebiasaan buruk dan memulai hidup yang lebih bermakna.",
    "Setiap puasa yang kita lakukan adalah investasi untuk akhirat yang lebih baik.",
    "Jangan sampai perut kita kenyang tetapi hati kita tetap kosong dari keimanan di bulan Ramadhan.",
    "Ramadhan mengajarkan kita untuk menghargai nikmat-nikmat yang Allah berikan kepada kita.",
    "Orang yang berpuasa dengan tulus ikhlas akan merasakan kedamaian dan ketenangan dalam hatinya.",
    "Ramadhan adalah bulan untuk memperkuat hubungan kita dengan Allah melalui ibadah dan doa.",
    "Jangan sia-siakan kesempatan di bulan Ramadhan untuk meminta maaf dan memberikan maaf kepada orang lain.",
    "Puasa bukan hanya tentang menahan lapar dan haus, tetapi juga tentang menahan lisan dari perkataan yang tidak baik.",
    "Ramadhan adalah bulan untuk belajar dari kesalahan-kesalahan masa lalu dan tidak mengulanginya di masa depan.",
    "Setiap hari di bulan Ramadhan adalah kesempatan baru untuk menjadi lebih baik dari hari sebelumnya.",
    "Ramadhan adalah hadiah dari Allah untuk kita, manfaatkan dengan sebaik-baiknya untuk mendekatkan diri kepada-Nya.",
  ];

  useEffect(() => {
    // Pilih random quote setiap kali component mount
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return quote;
}
