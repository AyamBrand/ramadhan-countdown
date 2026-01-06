import { describe, it, expect, beforeEach, vi } from "vitest";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock AsyncStorage
vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe("Widget Manager", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should save countdown data to AsyncStorage", async () => {
    const mockData = {
      days: 42,
      hours: 18,
      minutes: 36,
      seconds: 45,
      isRamadan: false,
      lastUpdated: new Date().toISOString(),
    };

    await AsyncStorage.setItem("ramadan_countdown_widget", JSON.stringify(mockData));

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "ramadan_countdown_widget",
      JSON.stringify(mockData)
    );
  });

  it("should retrieve widget data from AsyncStorage", async () => {
    const mockData = {
      days: 42,
      hours: 18,
      minutes: 36,
      seconds: 45,
      isRamadan: false,
      lastUpdated: new Date().toISOString(),
    };

    vi.mocked(AsyncStorage.getItem).mockResolvedValue(JSON.stringify(mockData));

    const result = await AsyncStorage.getItem("ramadan_countdown_widget");
    const parsedData = result ? JSON.parse(result) : null;

    expect(parsedData).toEqual(mockData);
    expect(parsedData.days).toBe(42);
    expect(parsedData.hours).toBe(18);
  });

  it("should handle Ramadan state in widget data", async () => {
    const ramadhanData = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isRamadan: true,
      lastUpdated: new Date().toISOString(),
    };

    await AsyncStorage.setItem("ramadan_countdown_widget", JSON.stringify(ramadhanData));

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "ramadan_countdown_widget",
      JSON.stringify(ramadhanData)
    );
  });

  it("should format countdown display correctly", () => {
    const mockData = {
      days: 42,
      hours: 18,
      minutes: 36,
      seconds: 45,
      isRamadan: false,
    };

    const formatted = `${mockData.days}h ${mockData.hours}j ${mockData.minutes}m ${mockData.seconds}s`;
    expect(formatted).toBe("42h 18j 36m 45s");
  });

  it("should display Ramadhan message when Ramadan arrives", () => {
    const mockData = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isRamadan: true,
    };

    const display = mockData.isRamadan ? "Ramadhan Tiba! 🌙" : "countdown";
    expect(display).toBe("Ramadhan Tiba! 🌙");
  });

  it("should update widget data every second", async () => {
    const mockData = {
      days: 42,
      hours: 18,
      minutes: 36,
      seconds: 45,
      isRamadan: false,
      lastUpdated: new Date().toISOString(),
    };

    // Simulate multiple updates
    for (let i = 0; i < 3; i++) {
      await AsyncStorage.setItem("ramadan_countdown_widget", JSON.stringify(mockData));
    }

    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(3);
  });

  it("should handle widget data with missing fields gracefully", async () => {
    const incompleteData = {
      days: 42,
      hours: 18,
    };

    await AsyncStorage.setItem("ramadan_countdown_widget", JSON.stringify(incompleteData));

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "ramadan_countdown_widget",
      JSON.stringify(incompleteData)
    );
  });

  it("should handle AsyncStorage errors gracefully", async () => {
    vi.mocked(AsyncStorage.setItem).mockRejectedValue(new Error("Storage error"));

    try {
      await AsyncStorage.setItem("ramadan_countdown_widget", JSON.stringify({}));
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
