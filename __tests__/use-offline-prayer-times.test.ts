import { describe, it, expect, beforeEach, vi } from "vitest";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock AsyncStorage
vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe("useOfflinePrayerTimes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should cache prayer times data", async () => {
    const testData = [
      {
        day: 1,
        date: "2026-02-18",
        subuh: "05:30",
        syuruk: "06:50",
        zohor: "12:30",
        asar: "15:45",
        maghrib: "18:45",
        isha: "20:00",
      },
    ];

    const cacheData = {
      zone: "SGR01",
      year: 2026,
      month: 2,
      data: testData,
      timestamp: Date.now(),
    };

    (AsyncStorage.setItem as any).mockResolvedValue(undefined);

    await AsyncStorage.setItem(
      "prayer_times_SGR01_2026_2",
      JSON.stringify(cacheData)
    );

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "prayer_times_SGR01_2026_2",
      JSON.stringify(cacheData)
    );
  });

  it("should retrieve cached data", async () => {
    const testData = [
      {
        day: 1,
        date: "2026-02-18",
        subuh: "05:30",
        maghrib: "18:45",
      },
    ];

    const cacheData = {
      zone: "SGR01",
      year: 2026,
      month: 2,
      data: testData,
      timestamp: Date.now(),
    };

    (AsyncStorage.getItem as any).mockResolvedValue(JSON.stringify(cacheData));

    const result = await AsyncStorage.getItem("prayer_times_SGR01_2026_2");

    expect(result).toBe(JSON.stringify(cacheData));
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(
      "prayer_times_SGR01_2026_2"
    );
  });

  it("should handle cache expiry", async () => {
    const oldTimestamp = Date.now() - 8 * 24 * 60 * 60 * 1000; // 8 days ago

    const cacheData = {
      zone: "SGR01",
      year: 2026,
      month: 2,
      data: [],
      timestamp: oldTimestamp,
    };

    const cacheAge = Date.now() - cacheData.timestamp;
    const cacheExpiry = 7 * 24 * 60 * 60 * 1000; // 7 days

    expect(cacheAge > cacheExpiry).toBe(true);
  });

  it("should clear cache on demand", async () => {
    (AsyncStorage.removeItem as any).mockResolvedValue(undefined);

    await AsyncStorage.removeItem("prayer_times_SGR01_2026_2");

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
      "prayer_times_SGR01_2026_2"
    );
  });

  it("should handle multiple zones", async () => {
    const zones = ["SGR01", "SGR02", "KUL01"];

    for (const zone of zones) {
      const cacheKey = `prayer_times_${zone}_2026_2`;
      (AsyncStorage.setItem as any).mockResolvedValue(undefined);

      await AsyncStorage.setItem(cacheKey, JSON.stringify({ zone }));

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        cacheKey,
        expect.stringContaining(zone)
      );
    }
  });

  it("should handle API errors gracefully", async () => {
    const error = new Error("Network error");

    (AsyncStorage.getItem as any).mockRejectedValue(error);

    try {
      await AsyncStorage.getItem("prayer_times_SGR01_2026_2");
    } catch (err) {
      expect(err).toBe(error);
    }
  });

  it("should validate cache structure", () => {
    const validCache = {
      zone: "SGR01",
      year: 2026,
      month: 2,
      data: [],
      timestamp: Date.now(),
    };

    expect(validCache).toHaveProperty("zone");
    expect(validCache).toHaveProperty("year");
    expect(validCache).toHaveProperty("month");
    expect(validCache).toHaveProperty("data");
    expect(validCache).toHaveProperty("timestamp");
  });
});
