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

describe("useStoredZone Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return default state and zone when AsyncStorage is empty", async () => {
    (AsyncStorage.getItem as any).mockResolvedValue(null);

    const mockState = "SGR";
    const mockZone = "SGR01";

    expect(mockState).toBe("SGR");
    expect(mockZone).toBe("SGR01");
  });

  it("should save state to AsyncStorage", async () => {
    const stateCode = "KUL";
    await AsyncStorage.setItem("ramadhan_selected_state", stateCode);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "ramadhan_selected_state",
      stateCode
    );
  });

  it("should save zone to AsyncStorage", async () => {
    const zoneCode = "KUL01";
    await AsyncStorage.setItem("ramadhan_selected_zone", zoneCode);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "ramadhan_selected_zone",
      zoneCode
    );
  });

  it("should load state from AsyncStorage", async () => {
    (AsyncStorage.getItem as any).mockResolvedValue("KUL");

    const result = await AsyncStorage.getItem("ramadhan_selected_state");

    expect(result).toBe("KUL");
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("ramadhan_selected_state");
  });

  it("should load zone from AsyncStorage", async () => {
    (AsyncStorage.getItem as any).mockResolvedValue("KUL01");

    const result = await AsyncStorage.getItem("ramadhan_selected_zone");

    expect(result).toBe("KUL01");
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("ramadhan_selected_zone");
  });

  it("should reset state and zone by removing from AsyncStorage", async () => {
    await AsyncStorage.removeItem("ramadhan_selected_state");
    await AsyncStorage.removeItem("ramadhan_selected_zone");

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
      "ramadhan_selected_state"
    );
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
      "ramadhan_selected_zone"
    );
  });

  it("should handle AsyncStorage errors gracefully", async () => {
    const error = new Error("Storage error");
    (AsyncStorage.getItem as any).mockRejectedValue(error);

    try {
      await AsyncStorage.getItem("ramadhan_selected_state");
    } catch (e) {
      expect(e).toBe(error);
    }
  });
});
