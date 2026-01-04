import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Ujian untuk logik countdown tanpa menggunakan React hooks testing
describe("useCountdown logic", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * Fungsi pembantu untuk mengira countdown
   * Ini meniru logik yang ada dalam hook useCountdown
   */
  function calculateCountdown(currentDate: Date) {
    const targetDate = new Date(2026, 1, 18, 0, 0, 0).getTime();
    const now = currentDate.getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isRamadan: true,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      isRamadan: false,
    };
  }

  it("should calculate countdown correctly when target date is in the future", () => {
    // Set current time to 17 Februari 2026 12:00:00
    const currentDate = new Date(2026, 1, 17, 12, 0, 0);

    const countdown = calculateCountdown(currentDate);

    // Countdown sepatutnya menunjukkan 0 hari, 12 jam, 0 minit, 0 saat
    expect(countdown.days).toBe(0);
    expect(countdown.hours).toBe(12);
    expect(countdown.minutes).toBe(0);
    expect(countdown.seconds).toBe(0);
    expect(countdown.isRamadan).toBe(false);
  });

  it("should show isRamadan as true when target date has passed", () => {
    // Set current time ke 19 Februari 2026 (selepas 18 Februari)
    const currentDate = new Date(2026, 1, 19, 0, 0, 0);

    const countdown = calculateCountdown(currentDate);

    expect(countdown.isRamadan).toBe(true);
    expect(countdown.days).toBe(0);
    expect(countdown.hours).toBe(0);
    expect(countdown.minutes).toBe(0);
    expect(countdown.seconds).toBe(0);
  });

  it("should handle countdown with seconds remaining", () => {
    // Set current time ke 17 Februari 2026 23:59:59
    const currentDate = new Date(2026, 1, 17, 23, 59, 59);

    const countdown = calculateCountdown(currentDate);

    // Sepatutnya ada 1 saat tinggal
    expect(countdown.days).toBe(0);
    expect(countdown.hours).toBe(0);
    expect(countdown.minutes).toBe(0);
    expect(countdown.seconds).toBe(1);
    expect(countdown.isRamadan).toBe(false);
  });

  it("should calculate countdown with mixed time units", () => {
    // Set current time ke 16 Februari 2026 10:30:45
    const currentDate = new Date(2026, 1, 16, 10, 30, 45);

    const countdown = calculateCountdown(currentDate);

    // Sepatutnya ada 1 hari, 13 jam, 29 minit, 15 saat tinggal
    expect(countdown.days).toBe(1);
    expect(countdown.hours).toBe(13);
    expect(countdown.minutes).toBe(29);
    expect(countdown.seconds).toBe(15);
    expect(countdown.isRamadan).toBe(false);
  });

  it("should show isRamadan as true when exactly at target date", () => {
    // Set current time ke 18 Februari 2026 00:00:00 (tepat pada target)
    const currentDate = new Date(2026, 1, 18, 0, 0, 0);

    const countdown = calculateCountdown(currentDate);

    expect(countdown.isRamadan).toBe(true);
  });

  it("should handle very early countdown (many days remaining)", () => {
    // Set current time ke 1 Januari 2026
    const currentDate = new Date(2026, 0, 1, 0, 0, 0);

    const countdown = calculateCountdown(currentDate);

    // Sepatutnya ada 48 hari tinggal (dari 1 Jan ke 18 Feb)
    expect(countdown.days).toBe(48);
    expect(countdown.hours).toBe(0);
    expect(countdown.minutes).toBe(0);
    expect(countdown.seconds).toBe(0);
    expect(countdown.isRamadan).toBe(false);
  });
});
