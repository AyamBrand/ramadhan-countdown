import { useEffect, useState } from "react";

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isRamadan: boolean;
  isHariRayaQurban: boolean;
  eventType: "ramadhan" | "hariraya" | "none";
}

export function useCountdown(): CountdownTime {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isRamadan: false,
    isHariRayaQurban: false,
    eventType: "none",
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date().getTime();
      const ramadhanStart = new Date(2026, 1, 19, 0, 0, 0).getTime();
      const hariRayaQurbanStart = new Date(2026, 4, 27, 0, 0, 0).getTime();

      if (now >= hariRayaQurbanStart) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isRamadan: false,
          isHariRayaQurban: true,
          eventType: "hariraya",
        });
        return;
      }

      if (now >= ramadhanStart) {
        const difference = hariRayaQurbanStart - now;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({
          days,
          hours,
          minutes,
          seconds,
          isRamadan: true,
          isHariRayaQurban: false,
          eventType: "hariraya",
        });
        return;
      }

      const difference = ramadhanStart - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        isRamadan: false,
        isHariRayaQurban: false,
        eventType: "ramadhan",
      });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return countdown;
}
