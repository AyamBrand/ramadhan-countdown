import { useState, useEffect } from "react";

export interface PrayerTime {
  date: string;
  day: number;
  imsak: string;
  subuh: string;
  syuruk: string;
  zohor: string;
  asar: string;
  maghrib: string;
  isyak: string;
}

export interface PrayerTimesData {
  loading: boolean;
  error: string | null;
  data: PrayerTime[];
}

/**
 * Daftar negeri dengan zon-zon (dari e-solat.gov.my)
 */
export const MALAYSIA_ZONES = {
  JHR: {
    name: "Johor",
    zones: [
      { code: "JHR01", name: "Pulau Aur dan Pulau Pemanggil" },
      { code: "JHR02", name: "Johor Bahru, Kota Tinggi, Mersing, Kulai" },
      { code: "JHR03", name: "Kluang, Pontian" },
      { code: "JHR04", name: "Batu Pahat, Muar, Segamat, Gemas Johor, Tangkak" },
    ],
  },
  KDH: {
    name: "Kedah",
    zones: [
      { code: "KDH01", name: "Kota Setar, Kubang Pasu, Pokok Sena" },
      { code: "KDH02", name: "Kuala Muda, Yan, Pendang" },
      { code: "KDH03", name: "Padang Terap, Sik" },
      { code: "KDH04", name: "Baling" },
      { code: "KDH05", name: "Bandar Baharu, Kulim" },
      { code: "KDH06", name: "Langkawi" },
      { code: "KDH07", name: "Puncak Gunung Jerai" },
    ],
  },
  KTN: {
    name: "Kelantan",
    zones: [
      { code: "KTN01", name: "Bachok, Kota Bharu, Machang, Pasir Mas, Pasir Puteh, Tanah Merah, Tumpat, Kuala Krai" },
      { code: "KTN02", name: "Gua Musang, Jeli, Lojing" },
    ],
  },
  MLK: {
    name: "Melaka",
    zones: [
      { code: "MLK01", name: "Seluruh Negeri Melaka" },
    ],
  },
  NGS: {
    name: "Negeri Sembilan",
    zones: [
      { code: "NGS01", name: "Tampin, Jempol" },
      { code: "NGS02", name: "Jelebu, Kuala Pilah, Rembau" },
      { code: "NGS03", name: "Port Dickson, Seremban" },
    ],
  },
  PHG: {
    name: "Pahang",
    zones: [
      { code: "PHG01", name: "Pulau Tioman" },
      { code: "PHG02", name: "Kuantan, Pekan, Muadzam Shah" },
      { code: "PHG03", name: "Jerantut, Temerloh, Maran, Bera, Chenor, Jengka" },
      { code: "PHG04", name: "Bentong, Lipis, Raub" },
      { code: "PHG05", name: "Genting Sempah, Janda Baik, Bukit Tinggi" },
      { code: "PHG06", name: "Cameron Highlands, Genting Higlands, Bukit Fraser" },
      { code: "PHG07", name: "Zon Khas Daerah Rompin" },
    ],
  },
  PLS: {
    name: "Perlis",
    zones: [
      { code: "PLS01", name: "Kangar, Padang Besar, Arau" },
    ],
  },
  PNG: {
    name: "Pulau Pinang",
    zones: [
      { code: "PNG01", name: "Seluruh Negeri Pulau Pinang" },
    ],
  },
  PRK: {
    name: "Perak",
    zones: [
      { code: "PRK01", name: "Tapah, Slim River, Tanjung Malim" },
      { code: "PRK02", name: "Kuala Kangsar, Sg. Siput, Ipoh, Batu Gajah, Kampar" },
      { code: "PRK03", name: "Lenggong, Pengkalan Hulu, Grik" },
      { code: "PRK04", name: "Temengor, Belum" },
      { code: "PRK05", name: "Kg Gajah, Teluk Intan, Bagan Datuk, Seri Iskandar, Beruas, Parit, Lumut, Sitiawan, Pulau Pangkor" },
      { code: "PRK06", name: "Selama, Taiping, Bagan Serai, Parit Buntar" },
      { code: "PRK07", name: "Bukit Larut" },
    ],
  },
  SBH: {
    name: "Sabah",
    zones: [
      { code: "SBH01", name: "Bahagian Sandakan (Timur), Bukit Garam, Semawang, Temanggong, Tambisan, Bandar Sandakan, Sukau" },
      { code: "SBH02", name: "Beluran, Telupid, Pinangah, Terusan, Kuamut, Bahagian Sandakan (Barat)" },
      { code: "SBH03", name: "Lahad Datu, Silabukan, Kunak, Sahabat, Semporna, Tungku, Bahagian Tawau (Timur)" },
      { code: "SBH04", name: "Bandar Tawau, Balong, Merotai, Kalabakan, Bahagian Tawau (Barat)" },
      { code: "SBH05", name: "Kudat, Kota Marudu, Pitas, Pulau Banggi, Bahagian Kudat" },
      { code: "SBH06", name: "Gunung Kinabalu" },
      { code: "SBH07", name: "Kota Kinabalu, Ranau, Kota Belud, Tuaran, Penampang, Papar, Putatan, Bahagian Pantai Barat" },
      { code: "SBH08", name: "Pensiangan, Keningau, Tambunan, Nabawan, Bahagian Pendalaman (Atas)" },
      { code: "SBH09", name: "Beaufort, Kuala Penyu, Sipitang, Tenom, Long Pasia, Membakut, Weston, Bahagian Pendalaman (Bawah)" },
    ],
  },
  SGR: {
    name: "Selangor",
    zones: [
      { code: "SGR01", name: "Gombak, Petaling, Sepang, Hulu Langat, Hulu Selangor, S.Alam" },
      { code: "SGR02", name: "Kuala Selangor, Sabak Bernam" },
      { code: "SGR03", name: "Klang, Kuala Langat" },
    ],
  },
  SWK: {
    name: "Sarawak",
    zones: [
      { code: "SWK01", name: "Limbang, Lawas, Sundar, Trusan" },
      { code: "SWK02", name: "Miri, Niah, Bekenu, Sibuti, Marudi" },
      { code: "SWK03", name: "Pandan, Belaga, Suai, Tatau, Sebauh, Bintulu" },
      { code: "SWK04", name: "Sibu, Mukah, Dalat, Song, Igan, Oya, Balingian, Kanowit, Kapit" },
      { code: "SWK05", name: "Sarikei, Matu, Julau, Rajang, Daro, Bintangor, Belawai" },
      { code: "SWK06", name: "Lubok Antu, Sri Aman, Roban, Debak, Kabong, Lingga, Engkelili, Betong, Spaoh, Pusa, Saratok" },
      { code: "SWK07", name: "Serian, Simunjan, Samarahan, Sebuyau, Meludam" },
      { code: "SWK08", name: "Kuching, Bau, Lundu, Sematan" },
      { code: "SWK09", name: "Zon Khas (Kampung Patarikan)" },
    ],
  },
  TRG: {
    name: "Terengganu",
    zones: [
      { code: "TRG01", name: "Kuala Terengganu, Marang, Kuala Nerus" },
      { code: "TRG02", name: "Besut, Setiu" },
      { code: "TRG03", name: "Hulu Terengganu" },
      { code: "TRG04", name: "Dungun, Kemaman" },
    ],
  },
  WLY: {
    name: "Wilayah Persekutuan",
    zones: [
      { code: "WLY01", name: "Kuala Lumpur, Putrajaya" },
      { code: "WLY02", name: "Labuan" },
    ],
  },
};

/**
 * Convert Unix timestamp ke format HH:MM
 */
function formatTime(unixTimestamp: number): string {
  try {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  } catch {
    return "-";
  }
}

/**
 * Convert Unix timestamp ke format YYYY-MM-DD
 */
function formatDate(unixTimestamp: number): string {
  try {
    const date = new Date(unixTimestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  } catch {
    return "-";
  }
}

/**
 * Hook untuk fetch data waktu solat dari waktusolat.app API
 * API ini menyediakan data JAKIM-verified untuk seluruh Malaysia
 * Response menggunakan Unix timestamp yang perlu dikonversi ke HH:MM format
 */
export function usePrayerTimesCorrect(zoneCode: string, year: number = 2026, month: number = 2): PrayerTimesData {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PrayerTime[]>([]);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        setError(null);

        // waktusolat.app API endpoint - SOLAT V2
        // Endpoint: GET /v2/solat/{zone}
        // Response: { zone, year, month, prayers: [{day, hijri, fajr, syuruk, dhuhr, asr, maghrib, isha}] }
        // Waktu dalam format Unix timestamp
        const url = `https://api.waktusolat.app/v2/solat/${zoneCode}`;
        
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();

        // Parse data dari API waktusolat.app
        // Response structure: { zone, year, month, prayers: [...] }
        if (result && result.prayers && Array.isArray(result.prayers)) {
          const prayerTimes: PrayerTime[] = result.prayers.map((item: any) => ({
            date: formatDate(item.fajr), // Use fajr timestamp untuk date
            day: item.day,
            imsak: "-", // API tidak menyediakan imsak, gunakan fajr - 10 menit
            subuh: formatTime(item.fajr),
            syuruk: formatTime(item.syuruk),
            zohor: formatTime(item.dhuhr),
            asar: formatTime(item.asr),
            maghrib: formatTime(item.maghrib),
            isyak: formatTime(item.isha),
          }));

          setData(prayerTimes);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        console.error("Prayer times fetch error:", err);
        setError(err instanceof Error ? err.message : "Ralat tidak diketahui");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (zoneCode) {
      fetchPrayerTimes();
    }
  }, [zoneCode, year, month]);

  return { loading, error, data };
}
