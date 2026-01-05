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
 * Hook untuk fetch data waktu solat dari e-solat.gov.my
 * Negeri code: 1=Johor, 2=Kedah, 3=Kelantan, 4=Malacca, 5=N.Sembilan,
 *              6=Pahang, 7=Penang, 8=Perak, 9=Perlis, 10=Selangor,
 *              11=Terengganu, 12=Sabah, 13=Sarawak, 14=KL, 15=Labuan, 16=Putrajaya
 */
export function usePrayerTimes(stateCode: number, year: number = 2026, month: number = 2): PrayerTimesData {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PrayerTime[]>([]);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        setError(null);

        // Format: YYYY-MM
        const dateStr = `${year}-${String(month).padStart(2, "0")}`;
        
        // e-solat.gov.my API endpoint
        const url = `https://www.e-solat.gov.my/index.php?r=solat/api/getsoltable&zone=${stateCode}&month=${dateStr}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();

        // Parse data dari API
        if (result.prayerTime && Array.isArray(result.prayerTime)) {
          const prayerTimes: PrayerTime[] = result.prayerTime.map((item: any, index: number) => ({
            date: item.date || "",
            day: index + 1,
            imsak: item.imsak || "-",
            subuh: item.fajr || "-",
            syuruk: item.sunrise || "-",
            zohor: item.dhuhr || "-",
            asar: item.asr || "-",
            maghrib: item.maghrib || "-",
            isyak: item.isha || "-",
          }));

          setData(prayerTimes);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [stateCode, year, month]);

  return { loading, error, data };
}

/**
 * Daftar negeri Malaysia dengan kod
 */
export const MALAYSIA_STATES = [
  { code: 1, name: "Johor" },
  { code: 2, name: "Kedah" },
  { code: 3, name: "Kelantan" },
  { code: 4, name: "Melaka" },
  { code: 5, name: "Negeri Sembilan" },
  { code: 6, name: "Pahang" },
  { code: 7, name: "Penang" },
  { code: 8, name: "Perak" },
  { code: 9, name: "Perlis" },
  { code: 10, name: "Selangor" },
  { code: 11, name: "Terengganu" },
  { code: 12, name: "Sabah" },
  { code: 13, name: "Sarawak" },
  { code: 14, name: "Kuala Lumpur" },
  { code: 15, name: "Labuan" },
  { code: 16, name: "Putrajaya" },
];
