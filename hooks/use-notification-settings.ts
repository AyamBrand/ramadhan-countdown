import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY_NOTIFICATION_MINUTES = "ramadhan_notification_minutes";
const STORAGE_KEY_NOTIFICATION_ENABLED = "ramadhan_notification_enabled";

export type NotificationMinutes = 5 | 10 | 15;

/**
 * Custom hook untuk menyimpan dan mengambil pengaturan notifikasi pengguna
 * Memungkinkan user memilih 5, 10, atau 15 minit sebelum imsak/berbuka
 */
export function useNotificationSettings() {
  const [notificationMinutes, setNotificationMinutes] = useState<NotificationMinutes>(10); // Default: 10 minit
  const [notificationEnabled, setNotificationEnabled] = useState(true); // Default: enabled
  const [isLoading, setIsLoading] = useState(true);

  // Load pengaturan notifikasi dari AsyncStorage saat app pertama kali dibuka
  useEffect(() => {
    loadNotificationSettings();
  }, []);

  /**
   * Load pengaturan notifikasi yang tersimpan dari AsyncStorage
   */
  const loadNotificationSettings = async () => {
    try {
      const storedMinutes = await AsyncStorage.getItem(STORAGE_KEY_NOTIFICATION_MINUTES);
      const storedEnabled = await AsyncStorage.getItem(STORAGE_KEY_NOTIFICATION_ENABLED);

      if (storedMinutes) {
        setNotificationMinutes(parseInt(storedMinutes) as NotificationMinutes);
      }
      if (storedEnabled !== null) {
        setNotificationEnabled(storedEnabled === "true");
      }
    } catch (error) {
      console.error("Error loading notification settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Simpan pilihan minit notifikasi ke AsyncStorage
   */
  const saveNotificationMinutes = async (minutes: NotificationMinutes) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_NOTIFICATION_MINUTES, minutes.toString());
      setNotificationMinutes(minutes);
    } catch (error) {
      console.error("Error saving notification minutes:", error);
    }
  };

  /**
   * Simpan status enable/disable notifikasi ke AsyncStorage
   */
  const saveNotificationEnabled = async (enabled: boolean) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_NOTIFICATION_ENABLED, enabled.toString());
      setNotificationEnabled(enabled);
    } catch (error) {
      console.error("Error saving notification enabled:", error);
    }
  };

  /**
   * Toggle notifikasi on/off
   */
  const toggleNotification = async () => {
    await saveNotificationEnabled(!notificationEnabled);
  };

  return {
    notificationMinutes,
    notificationEnabled,
    saveNotificationMinutes,
    saveNotificationEnabled,
    toggleNotification,
    isLoading,
  };
}
