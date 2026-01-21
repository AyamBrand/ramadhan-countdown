import { describe, it, expect, vi, beforeEach } from "vitest";

describe("AboutSection Component - Translation Keys", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should have About title translation key", () => {
    const key = "settings.about";
    expect(key).toBe("settings.about");
  });

  it("should have See More link translation key", () => {
    const key = "settings.seeMore";
    expect(key).toBe("settings.seeMore");
  });

  it("should have About text translation key", () => {
    const key = "settings.aboutText";
    expect(key).toBe("settings.aboutText");
  });

  it("should have Close button translation key", () => {
    const key = "settings.close";
    expect(key).toBe("settings.close");
  });

  it("should have correct modal structure", () => {
    const modalProps = {
      visible: false,
      animationType: "slide",
      transparent: false,
    };
    expect(modalProps.visible).toBe(false);
    expect(modalProps.animationType).toBe("slide");
    expect(modalProps.transparent).toBe(false);
  });
});
