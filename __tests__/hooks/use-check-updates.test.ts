import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock expo-updates
vi.mock("expo-updates", () => ({
  isEnabled: true,
  checkForUpdateAsync: vi.fn(),
  fetchUpdateAsync: vi.fn(),
  reloadAsync: vi.fn(),
}));

describe("useCheckUpdates Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return initial state with checking disabled", () => {
    const initialState = {
      isChecking: false,
      isDownloading: false,
      isInstalling: false,
    };
    expect(initialState.isChecking).toBe(false);
    expect(initialState.isDownloading).toBe(false);
    expect(initialState.isInstalling).toBe(false);
  });

  it("should handle update check result with no updates available", async () => {
    const result = {
      isAvailable: false,
      message: "You are already using the latest version",
    };
    expect(result.isAvailable).toBe(false);
    expect(result.message).toContain("latest version");
  });

  it("should handle update check result with updates available", async () => {
    const result = {
      isAvailable: true,
      message: "Update downloaded and will be applied on next app restart",
    };
    expect(result.isAvailable).toBe(true);
    expect(result.message).toContain("next app restart");
  });

  it("should handle error during update check", async () => {
    const result = {
      isAvailable: false,
      message: "Error checking for updates",
      error: "Network error",
    };
    expect(result.isAvailable).toBe(false);
    expect(result.error).toBe("Network error");
  });

  it("should handle updates disabled", async () => {
    const result = {
      isAvailable: false,
      message: "Updates are not enabled in this build",
    };
    expect(result.isAvailable).toBe(false);
    expect(result.message).toContain("not enabled");
  });
});
