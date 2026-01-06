import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCountdown } from "./use-countdown";

/**
 * Hook untuk manage widget data dan update countdown di home screen widget
 * Menyimpan countdown data ke AsyncStorage sehingga widget bisa akses
 */
export function useWidgetManager() {
  const countdown = useCountdown();

  useEffect(() => {
    // Update widget data setiap detik
    const updateWidgetData = async () => {
      try {
        const widgetData = {
          days: countdown.days,
          hours: countdown.hours,
          minutes: countdown.minutes,
          seconds: countdown.seconds,
          isRamadan: countdown.isRamadan,
          lastUpdated: new Date().toISOString(),
        };

        // Simpan ke AsyncStorage untuk widget akses
        await AsyncStorage.setItem(
          "ramadan_countdown_widget",
          JSON.stringify(widgetData)
        );
      } catch (error) {
        console.error("Failed to update widget data:", error);
      }
    };

    updateWidgetData();

    // Update setiap detik
    const interval = setInterval(updateWidgetData, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return {
    days: countdown.days,
    hours: countdown.hours,
    minutes: countdown.minutes,
    seconds: countdown.seconds,
    isRamadan: countdown.isRamadan,
  };
}
