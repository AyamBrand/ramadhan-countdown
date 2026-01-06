import { useState, useEffect } from "react";
import axios from "axios";

interface PrayerTime {
  day: number;
  hijri: string;
  fajr: string;
  syuruk: string;
  zohor: string;
  asar: string;
  maghrib: string;
  isha: string;
}

interface PrayerTimesResponse {
  zone: string;
  year: number;
  month: number;
  month_number: number;
  last_updated: string | null;
  prayers: PrayerTime[];
}

const WAKTU_SOLAT_API = "https://api.waktusolat.app/v2/solat";

/**
 * Custom hook untuk fetch prayer times dari Waktu Solat API
 * Usage: const { prayerTimes, loading, error } = usePrayerTimesAPI("SGR01", 2026, 2);
 */
export function usePrayerTimesAPI(zone: string, year: number, month: number) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!zone) return;

    const fetchPrayerTimes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<PrayerTimesResponse>(
          `${WAKTU_SOLAT_API}/${zone}`,
          {
            params: {
              year,
              month,
            },
          }
        );

        if (response.data.prayers) {
          setPrayerTimes(response.data.prayers);
        }
      } catch (err) {
        console.error("Error fetching prayer times:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch prayer times");
        // Fallback ke dummy data kalau API fail
        setPrayerTimes(getDummyPrayerTimes());
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [zone, year, month]);

  return { prayerTimes, loading, error };
}

/**
 * Dummy prayer times untuk fallback kalau API fail
 */
function getDummyPrayerTimes(): PrayerTime[] {
  return [
    {
      day: 1,
      hijri: "1-1-1446",
      fajr: "05:30",
      syuruk: "06:50",
      zohor: "12:30",
      asar: "15:45",
      maghrib: "18:45",
      isha: "20:00",
    },
    {
      day: 2,
      hijri: "2-1-1446",
      fajr: "05:31",
      syuruk: "06:51",
      zohor: "12:31",
      asar: "15:46",
      maghrib: "18:46",
      isha: "20:01",
    },
    {
      day: 3,
      hijri: "3-1-1446",
      fajr: "05:32",
      syuruk: "06:52",
      zohor: "12:32",
      asar: "15:47",
      maghrib: "18:47",
      isha: "20:02",
    },
  ];
}

/**
 * Get today's prayer times dari array
 */
export function getTodayPrayerTime(prayerTimes: PrayerTime[], day: number): PrayerTime | undefined {
  return prayerTimes.find((p) => p.day === day);
}

/**
 * Format time string (e.g., "05:30" → "05:30 AM")
 */
export function formatPrayerTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour.toString().padStart(2, "0")}:${minutes} ${period}`;
}
