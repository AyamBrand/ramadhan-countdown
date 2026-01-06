import { Share, Pressable, Text, View } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { useTranslation } from "@/hooks/use-translation";

interface ShareButtonProps {
  title?: string;
  message?: string;
  url?: string;
  className?: string;
}

/**
 * Share Button Component - untuk share app ke social media
 * Guna React Native Share API untuk WhatsApp, Telegram, etc
 */
export function ShareButton({
  title = "Ramadhan Akan Tiba",
  message = "Ramadhan Akan Tiba - Aplikasi countdown untuk Malaysia 🌙",
  url = "https://www.annamir.my",
  className = "",
}: ShareButtonProps) {
  const colors = useColors();
  const t = useTranslation();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${message}\n\n${url}`,
        title,
        url, // iOS only
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const shareButtonText = t('settings.shareApp');

  return (
    <Pressable
      onPress={handleShare}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View className={`bg-primary px-4 py-3 rounded-lg items-center justify-center ${className}`}>
        <Text className="text-background font-semibold">
          📤 {shareButtonText}
        </Text>
      </View>
    </Pressable>
  );
}
