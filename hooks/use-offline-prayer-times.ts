import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePrayerTimesAPI } from "./use-prayer-times-api";

interface CachedPrayerData {
  zone: string;
  year: number;
  month: number;
  data: any[];
  timestamp: number;
}

/**
 * Custom hook untuk offline prayer times dengan caching
 * Menyimpan data prayer times ke AsyncStorage untuk akses offline
 */
export function useOfflinePrayerTimes(zone: string, year: number, month: number) {
  const { prayerTimes: apiData, loading: apiLoading, error: apiError } = usePrayerTimesAPI(zone, year, month);
  const [cachedData, setCachedData] = useState<any[]>([]);
  const [isOffline, setIsOffline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const CACHE_KEY = `prayer_times_${zone}_${year}_${month}`;
  const CACHE_EXPIRY_DAYS = 7; // Cache valid for 7 days

  // Load cached data on mount
  useEffect(() => {
    loadCachedData();
  }, [zone, year, month]);

  // Save API data to cache when available
  useEffect(() => {
    if (apiData && apiData.length > 0 && !apiError) {
      saveCacheData(apiData);
    }
  }, [apiData, apiError]);

  const loadCachedData = async () => {
    try {
      setLoading(true);
      const cached = await AsyncStorage.getItem(CACHE_KEY);

      if (cached) {
        const parsedCache: CachedPrayerData = JSON.parse(cached);
        const cacheAge = Date.now() - parsedCache.timestamp;
        const cacheExpiry = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

        if (cacheAge < cacheExpiry) {
          setCachedData(parsedCache.data);
          setIsOffline(true);
          setError(null);
        } else {
          // Cache expired, clear it
          await AsyncStorage.removeItem(CACHE_KEY);
          setCachedData([]);
          setIsOffline(false);
        }
      }
    } catch (err) {
      console.error("Error loading cached prayer times:", err);
      setError("Gagal memuatkan data cache");
    } finally {
      setLoading(false);
    }
  };

  const saveCacheData = async (data: any[]) => {
    try {
      const cacheData: CachedPrayerData = {
        zone,
        year,
        month,
        data,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      setCachedData(data);
      setIsOffline(false);
    } catch (err) {
      console.error("Error saving prayer times cache:", err);
    }
  };

  const clearCache = async () => {
    try {
      await AsyncStorage.removeItem(CACHE_KEY);
      setCachedData([]);
      setIsOffline(false);
    } catch (err) {
      console.error("Error clearing cache:", err);
    }
  };

  // Return API data if available, otherwise cached data
  const prayerTimes = apiData && apiData.length > 0 ? apiData : cachedData;
  const finalLoading = apiLoading && cachedData.length === 0;
  const finalError = apiError && cachedData.length === 0 ? apiError : null;

  return {
    prayerTimes,
    loading: finalLoading,
    error: finalError,
    isOffline,
    isCached: cachedData.length > 0 && !apiData?.length,
    clearCache,
  };
}
