import { useEffect, useState } from "react";

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isRamadan: boolean;
}

/**
 * Hook untuk mengira masa sehingga 1 Ramadhan
 * Target date: 18 Februari 2026 (atau 19 Februari mengikut cerapan anak bulan)
 */
export function useCountdown(): CountdownTime {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isRamadan: false,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      // Target: 19 Februari 2026 pada pukul 00:00:00 (tengah malam)
      const targetDate = new Date(2026, 1, 19, 0, 0, 0).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        // Ramadhan sudah tiba atau sudah berlalu
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isRamadan: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        isRamadan: false,
      });
    };

    // Kira sekali pada permulaan
    calculateCountdown();

    // Kira semula setiap saat
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return countdown;
}
