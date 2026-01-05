import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY_STATE = "ramadhan_selected_state";
const STORAGE_KEY_ZONE = "ramadhan_selected_zone";

/**
 * Custom hook untuk menyimpan dan mengambil pilihan zona pengguna dari AsyncStorage
 * Memungkinkan pengguna untuk tidak perlu memilih zona setiap kali membuka app
 */
export function useStoredZone() {
  const [selectedState, setSelectedState] = useState("SGR"); // Default: Selangor
  const [selectedZone, setSelectedZone] = useState("SGR01"); // Default: Selangor zone 1
  const [isLoading, setIsLoading] = useState(true);

  // Load pilihan zona dari AsyncStorage saat app pertama kali dibuka
  useEffect(() => {
    loadStoredZone();
  }, []);

  /**
   * Load zona yang tersimpan dari AsyncStorage
   */
  const loadStoredZone = async () => {
    try {
      const storedState = await AsyncStorage.getItem(STORAGE_KEY_STATE);
      const storedZone = await AsyncStorage.getItem(STORAGE_KEY_ZONE);

      if (storedState) {
        setSelectedState(storedState);
      }
      if (storedZone) {
        setSelectedZone(storedZone);
      }
    } catch (error) {
      console.error("Error loading stored zone:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Simpan pilihan negeri ke AsyncStorage
   */
  const saveState = async (stateCode: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_STATE, stateCode);
      setSelectedState(stateCode);
    } catch (error) {
      console.error("Error saving state:", error);
    }
  };

  /**
   * Simpan pilihan zon ke AsyncStorage
   */
  const saveZone = async (zoneCode: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_ZONE, zoneCode);
      setSelectedZone(zoneCode);
    } catch (error) {
      console.error("Error saving zone:", error);
    }
  };

  /**
   * Reset pilihan zona ke default
   */
  const resetZone = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY_STATE);
      await AsyncStorage.removeItem(STORAGE_KEY_ZONE);
      setSelectedState("SGR");
      setSelectedZone("SGR01");
    } catch (error) {
      console.error("Error resetting zone:", error);
    }
  };

  return {
    selectedState,
    selectedZone,
    saveState,
    saveZone,
    resetZone,
    isLoading,
  };
}
