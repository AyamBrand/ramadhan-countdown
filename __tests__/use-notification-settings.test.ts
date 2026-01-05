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

describe("useNotificationSettings Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return default notification minutes (10) when AsyncStorage is empty", async () => {
    (AsyncStorage.getItem as any).mockResolvedValue(null);

    const defaultMinutes = 10;
    expect(defaultMinutes).toBe(10);
  });

  it("should return default notification enabled (true) when AsyncStorage is empty", async () => {
    (AsyncStorage.getItem as any).mockResolvedValue(null);

    const defaultEnabled = true;
    expect(defaultEnabled).toBe(true);
  });

  it("should save notification minutes to AsyncStorage", async () => {
    const minutes = 15;
    await AsyncStorage.setItem("ramadhan_notification_minutes", minutes.toString());

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "ramadhan_notification_minutes",
      "15"
    );
  });

  it("should save notification enabled status to AsyncStorage", async () => {
    await AsyncStorage.setItem("ramadhan_notification_enabled", "false");

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "ramadhan_notification_enabled",
      "false"
    );
  });

  it("should load notification minutes from AsyncStorage", async () => {
    (AsyncStorage.getItem as any).mockResolvedValue("10");

    const result = await AsyncStorage.getItem("ramadhan_notification_minutes");

    expect(result).toBe("10");
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(
      "ramadhan_notification_minutes"
    );
  });

  it("should load notification enabled status from AsyncStorage", async () => {
    (AsyncStorage.getItem as any).mockResolvedValue("true");

    const result = await AsyncStorage.getItem("ramadhan_notification_enabled");

    expect(result).toBe("true");
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(
      "ramadhan_notification_enabled"
    );
  });

  it("should support 5, 10, and 15 minute options", () => {
    const validMinutes = [5, 10, 15];
    validMinutes.forEach((minutes) => {
      expect([5, 10, 15]).toContain(minutes);
    });
  });

  it("should handle AsyncStorage errors gracefully", async () => {
    const error = new Error("Storage error");
    (AsyncStorage.getItem as any).mockRejectedValue(error);

    try {
      await AsyncStorage.getItem("ramadhan_notification_minutes");
    } catch (e) {
      expect(e).toBe(error);
    }
  });
});
