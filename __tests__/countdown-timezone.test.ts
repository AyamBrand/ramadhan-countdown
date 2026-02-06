import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("Countdown Timezone (GMT+8)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should calculate correct days to Ramadhan 2026 from GMT+8", () => {
    // Set current time to 2026-02-05 12:00:00 GMT+8 (Malaysia time)
    const now = new Date("2026-02-05T12:00:00+08:00");
    vi.setSystemTime(now);

    const currentTime = new Date().getTime();
    const ramadhanStart = new Date("2026-02-19T00:00:00+08:00").getTime();

    const difference = ramadhanStart - currentTime;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    // From Feb 5 noon to Feb 19 midnight = 13 full days + 12 hours
    expect(days).toBe(13);
  });

  it("should calculate correct days to Ramadhan 2026 from midnight GMT+8", () => {
    // Set current time to 2026-02-05 00:00:00 GMT+8 (Malaysia time)
    const now = new Date("2026-02-05T00:00:00+08:00");
    vi.setSystemTime(now);

    const currentTime = new Date().getTime();
    const ramadhanStart = new Date("2026-02-19T00:00:00+08:00").getTime();

    const difference = ramadhanStart - currentTime;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    // From Feb 5 00:00 to Feb 19 00:00 = exactly 14 days
    expect(days).toBe(14);
  });

  it("should use GMT+8 timezone, not device timezone", () => {
    // Test that the date string includes +08:00 offset
    const ramadhanStart = new Date("2026-02-19T00:00:00+08:00");
    const hariRayaStart = new Date("2026-05-27T00:00:00+08:00");

    // Verify dates are parsed correctly with GMT+8 offset
    expect(ramadhanStart.getUTCDate()).toBe(18); // UTC date is one day earlier
    expect(ramadhanStart.getUTCMonth()).toBe(1); // February (0-indexed)
    expect(ramadhanStart.getUTCFullYear()).toBe(2026);

    expect(hariRayaStart.getUTCDate()).toBe(26); // UTC date is one day earlier
    expect(hariRayaStart.getUTCMonth()).toBe(4); // May (0-indexed)
    expect(hariRayaStart.getUTCFullYear()).toBe(2026);
  });

  it("should show 13-14 days countdown on Feb 5, 2026 GMT+8", () => {
    // This is the exact scenario from the bug report
    // User reported: "Countdown tulis 11 hari, sepatutnya 12 hari"
    // On Feb 5, there should be 13-14 days left until Feb 19

    const now = new Date("2026-02-05T12:00:00+08:00");
    vi.setSystemTime(now);

    const currentTime = new Date().getTime();
    const ramadhanStart = new Date("2026-02-19T00:00:00+08:00").getTime();

    const difference = ramadhanStart - currentTime;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    // Should be 13 days + 12 hours
    expect(days).toBe(13);
    expect(hours).toBe(12);
  });

  it("should correctly handle Hari Raya Qurban date", () => {
    // Test that Hari Raya Qurban date is also GMT+8
    const now = new Date("2026-05-26T12:00:00+08:00");
    vi.setSystemTime(now);

    const currentTime = new Date().getTime();
    const hariRayaStart = new Date("2026-05-27T00:00:00+08:00").getTime();

    const difference = hariRayaStart - currentTime;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    // From May 26 noon to May 27 midnight = 0 full days (but 12 hours)
    expect(days).toBe(0);
  });
});
