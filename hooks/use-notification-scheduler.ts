import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import type { TimeIntervalTriggerInput } from "expo-notifications";
import { useNotificationSettings } from "./use-notification-settings";
import { useStoredZone } from "./use-stored-zone";

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Ramadhan 2026: 18 Februari - 19 Maret (30 hari)
const RAMADHAN_START = new Date(2026, 1, 18); // 18 Februari 2026
const RAMADHAN_DAYS = 30;

/**
 * Custom hook untuk schedule push notifications untuk imsak dan berbuka
 * Menggunakan expo-notifications untuk background notifications
 */
export function useNotificationScheduler() {
  const { notificationMinutes, notificationEnabled } = useNotificationSettings();
  const { selectedZone } = useStoredZone();

  useEffect(() => {
    if (notificationEnabled) {
      scheduleNotifications();
    } else {
      cancelAllNotifications();
    }
  }, [notificationEnabled, notificationMinutes, selectedZone]);

  /**
   * Schedule semua notifications untuk Ramadhan
   */
  const scheduleNotifications = async () => {
    try {
      // Request permission terlebih dahulu
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.warn("Notification permission not granted");
        return;
      }

      // Cancel semua notification yang sudah ada
      await Notifications.cancelAllScheduledNotificationsAsync();

      // Schedule notification untuk setiap hari Ramadhan
      for (let day = 1; day <= RAMADHAN_DAYS; day++) {
        const date = new Date(RAMADHAN_START);
        date.setDate(date.getDate() + (day - 1));

        // Contoh waktu imsak dan berbuka (dalam real app, ambil dari API)
        // Untuk sekarang, gunakan waktu dummy
        const imssakTime = new Date(date);
        imssakTime.setHours(5, 30, 0);

        const bukkaTime = new Date(date);
        bukkaTime.setHours(19, 15, 0);

        // Schedule imsak notification
        await scheduleNotificationForTime(
          imssakTime,
          notificationMinutes,
          \`Masa Imsak - Hari \${day}\`,
          \`Waktu imsak akan tiba dalam \${notificationMinutes} minit\`
        );

        // Schedule berbuka notification
        await scheduleNotificationForTime(
          bukkaTime,
          notificationMinutes,
          \`Masa Berbuka - Hari \${day}\`,
          \`Waktu berbuka akan tiba dalam \${notificationMinutes} minit\`
        );
      }

      console.log("Notifications scheduled successfully");
    } catch (error) {
      console.error("Error scheduling notifications:", error);
    }
  };

  /**
   * Schedule notification untuk waktu tertentu dengan offset minit
   */
  const scheduleNotificationForTime = async (
    time: Date,
    minutesBefore: number,
    title: string,
    body: string
  ) => {
    try {
      const triggerTime = new Date(time.getTime() - minutesBefore * 60 * 1000);

      // Jika waktu sudah lewat, skip
      if (triggerTime < new Date()) {
        return;
      }

      const secondsFromNow = Math.ceil((triggerTime.getTime() - new Date().getTime()) / 1000);
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: "default",
          badge: 1,
        },
        trigger: {
          seconds: secondsFromNow,
        } as TimeIntervalTriggerInput,
      });
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };

  /**
   * Cancel semua scheduled notifications
   */
  const cancelAllNotifications = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error("Error canceling notifications:", error);
    }
  };

  return {
    scheduleNotifications,
    cancelAllNotifications,
  };
}
