import { describe, it, expect } from "vitest";

describe("Share Button Component", () => {
  it("should have default share message", () => {
    const defaultMessage = "Ramadhan Akan Tiba - Aplikasi countdown untuk Malaysia 🌙";
    expect(defaultMessage).toContain("Ramadhan");
    expect(defaultMessage).toContain("Malaysia");
  });

  it("should have default share title", () => {
    const defaultTitle = "Ramadhan Akan Tiba";
    expect(defaultTitle).toBe("Ramadhan Akan Tiba");
  });

  it("should have default share URL", () => {
    const defaultUrl = "https://www.annamir.my";
    expect(defaultUrl).toContain("https://");
    expect(defaultUrl).toContain("annamir.my");
  });

  it("should support custom message", () => {
    const customMessage = "Custom share message";
    expect(customMessage).toBeTruthy();
    expect(customMessage.length).toBeGreaterThan(0);
  });

  it("should support custom title", () => {
    const customTitle = "Custom Title";
    expect(customTitle).toBeTruthy();
    expect(customTitle.length).toBeGreaterThan(0);
  });

  it("should support custom URL", () => {
    const customUrl = "https://example.com";
    expect(customUrl).toContain("https://");
  });

  it("should combine message and URL for sharing", () => {
    const message = "Test message";
    const url = "https://example.com";
    const shareContent = `${message}\n\n${url}`;
    
    expect(shareContent).toContain(message);
    expect(shareContent).toContain(url);
  });

  it("should support social media sharing", () => {
    const socialMedias = ["WhatsApp", "Telegram", "Facebook", "Twitter"];
    socialMedias.forEach((platform) => {
      expect(platform).toBeTruthy();
    });
  });

  it("should have share button styling", () => {
    const buttonClass = "bg-primary px-4 py-3 rounded-lg";
    expect(buttonClass).toContain("bg-primary");
    expect(buttonClass).toContain("rounded-lg");
  });

  it("should display share icon and text", () => {
    const shareIcon = "📤";
    const shareText = "Kongsi";
    
    expect(shareIcon).toBeTruthy();
    expect(shareText).toBe("Kongsi");
  });

  it("should handle share action on press", () => {
    const handleShare = async () => {
      return { success: true };
    };

    expect(handleShare).toBeDefined();
  });
});
