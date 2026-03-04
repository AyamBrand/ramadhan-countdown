import { useEffect, useState } from "react";

/**
 * Hook untuk mendapatkan random kata hikmah umum
 * Kata hikmah akan berubah setiap kali app dibuka
 */
export function useRandomQuote(): string {
  const [quote, setQuote] = useState<string>("");

  const quotes = [
    "Kesabaran adalah kunci kejayaan, kebahagiaan, dan kedamaian hidup.",
    "Berbuat baik kepada orang lain adalah pelaburan terbaik untuk masa depan kita.",
    "Ilmu adalah cahaya yang menerangi jalan kehidupan kita menuju kejayaan.",
    "Jangan menunda-nunda kerja hari ini, kerana hari esok tidak dijamin untuk kita.",
    "Kejujuran adalah asas kepercayaan dan hubungan yang kuat dengan orang lain.",
    "Setiap masalah yang kita hadapi adalah ujian dan peluang untuk berkembang menjadi lebih baik.",
    "Bersyukur atas nikmat kecil akan membuka pintu untuk mendapatkan nikmat yang lebih besar.",
    "Kejayaan bukan hanya tentang wang, tetapi tentang kebahagiaan dan kepuasan hati.",
    "Menghormati ibu bapa adalah kewajiban yang akan membawa berkah dalam hidup kita.",
    "Pendidikan adalah pelaburan terbaik yang tidak akan pernah hilang atau dicuri.",
    "Jangan menilai orang lain berdasarkan penampilan, kerana hati adalah yang terpenting.",
    "Kerendahan hati adalah tanda kekuatan sejati, bukan kelemahan.",
    "Membantu orang lain tanpa mengharap balasan adalah amal yang paling mulia.",
    "Kesihatan adalah harta yang paling berharga, jaga dengan baik sebelum terlambat.",
    "Niat yang baik adalah permulaan dari setiap perbuatan yang bermakna dan bermanfaat.",
    "Jangan pernah menyerah pada impian anda, kerana kejayaan datang bagi yang gigih.",
    "Kebijaksanaan adalah hasil dari pengalaman dan pembelajaran yang berterusan.",
    "Cinta dan kasih sayang adalah bahasa universal yang dapat menyatukan semua orang.",
    "Kesilapan adalah guru terbaik, jangan takut untuk belajar dari kegagalan.",
    "Hidup adalah tentang perjalanan, bukan hanya tentang tujuan akhir.",
    "Keberanian adalah melakukan perkara yang betul walaupun takut dan kesukaran.",
    "Persahabatan yang tulus adalah harta karun yang lebih berharga daripada emas.",
    "Jangan mengeluh tentang masa lalu, fokus pada masa depan yang lebih baik.",
    "Ketekunan dan kerja keras adalah kunci untuk mencapai semua impian kita.",
    "Kerendahan hati dalam kejayaan adalah tanda watak yang mulia.",
    "Memberi adalah lebih berkah daripada menerima, kerana memberi membuat hati gembira.",
    "Setiap hari adalah peluang baru untuk menjadi versi terbaik daripada diri kita.",
    "Kepercayaan adalah hadiah yang diberikan dengan hati, jangan pernah mengkhianatinya.",
    "Hidup dengan tujuan dan makna adalah kunci untuk kebahagiaan sejati.",
    "Kebaikan yang kita lakukan hari ini akan menjadi kebahagiaan orang lain di masa depan.",
  ];

  useEffect(() => {
    // Pilih random quote setiap kali component mount
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return quote;
}
