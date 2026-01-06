import { View, Text, Pressable, Alert, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenContainer } from "@/components/screen-container";
import { useThemeContext } from "@/lib/theme-provider";
import { useColors } from "@/hooks/use-colors";
import { useNotificationSettings } from "@/hooks/use-notification-settings";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguageContext } from "@/lib/language-provider";
import { ShareButton } from "@/components/share-button";

/**
 * Halaman Tetapan (Settings)
 * Menampilkan pengaturan aplikasi termasuk theme toggle
 */
export default function SettingsScreen() {
  const { colorScheme, setColorScheme } = useThemeContext();
  const colors = useColors();
  const { notificationMinutes, notificationEnabled, saveNotificationMinutes, toggleNotification } = useNotificationSettings();
  const t = useTranslation();
  const { language, setLanguage } = useLanguageContext();

  const toggleTheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  const handleExit = () => {
    Alert.alert(
      "Keluar Aplikasi",
      "Anda yakin ingin keluar dari aplikasi?",
      [
        { text: "Batal", onPress: () => {}, style: "cancel" },
        {
          text: "Keluar",
          onPress: () => {
            if (typeof window !== "undefined") {
              window.close();
            } else {
              require("react-native").BackHandler.exitApp();
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-foreground">
            {t('settings.title')}
          </Text>
        </View>

        {/* Language Toggle Section */}
        <View className="bg-surface rounded-2xl p-4 mb-4 border border-border">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-lg font-semibold text-foreground">
                {t('settings.language')}
              </Text>
              <Text className="text-xs text-muted mt-1">
                {language === 'ms' ? 'Bahasa Melayu' : 'English'}
              </Text>
            </View>
            <View className="flex-row gap-2">
              <Pressable
                onPress={() => setLanguage('ms')}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <View className={language === 'ms' ? "bg-primary border-2 border-primary px-3 py-2 rounded-lg" : "bg-background border-2 border-border px-3 py-2 rounded-lg"}>
                  <Text className={language === 'ms' ? "text-sm font-semibold text-background" : "text-sm font-semibold text-foreground"}>
                    MS
                  </Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => setLanguage('en')}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <View className={language === 'en' ? "bg-primary border-2 border-primary px-3 py-2 rounded-lg" : "bg-background border-2 border-border px-3 py-2 rounded-lg"}>
                  <Text className={language === 'en' ? "text-sm font-semibold text-background" : "text-sm font-semibold text-foreground"}>
                    EN
                  </Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => setLanguage('ar')}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <View className={language === 'ar' ? "bg-primary border-2 border-primary px-3 py-2 rounded-lg" : "bg-background border-2 border-border px-3 py-2 rounded-lg"}>
                  <Text className={language === 'ar' ? "text-sm font-semibold text-background" : "text-sm font-semibold text-foreground"}>
                    AR
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Notification Settings Section */}
        <View className="bg-surface rounded-2xl p-4 mb-4 border border-border">
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-1">
              <Text className="text-lg font-semibold text-foreground">
                Notifikasi Imsak & Berbuka
              </Text>
              <Text className="text-xs text-muted mt-1">
                {notificationEnabled ? "Aktif" : "Tidak Aktif"}
              </Text>
            </View>
            <Pressable
              onPress={toggleNotification}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <View className={notificationEnabled ? "bg-primary px-4 py-2 rounded-lg" : "bg-error/20 px-4 py-2 rounded-lg"}>
                <Text className={notificationEnabled ? "text-sm font-semibold text-background" : "text-sm font-semibold text-error"}>
                  {notificationEnabled ? "Hidup" : "Mati"}
                </Text>
              </View>
            </Pressable>
          </View>

          {notificationEnabled && (
            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">
                Peringatan sebelum waktu:
              </Text>
              <View className="flex-row gap-2">
                <Pressable
                  onPress={() => saveNotificationMinutes(15)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <View className={notificationMinutes === 15 ? "bg-primary border-2 border-primary px-3 py-2 rounded-lg" : "bg-background border-2 border-border px-3 py-2 rounded-lg"}>
                    <Text className={notificationMinutes === 15 ? "text-sm font-semibold text-background" : "text-sm font-semibold text-foreground"}>
                      15m
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => saveNotificationMinutes(10)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <View className={notificationMinutes === 10 ? "bg-primary border-2 border-primary px-3 py-2 rounded-lg" : "bg-background border-2 border-border px-3 py-2 rounded-lg"}>
                    <Text className={notificationMinutes === 10 ? "text-sm font-semibold text-background" : "text-sm font-semibold text-foreground"}>
                      10m
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => saveNotificationMinutes(5)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <View className={notificationMinutes === 5 ? "bg-primary border-2 border-primary px-3 py-2 rounded-lg" : "bg-background border-2 border-border px-3 py-2 rounded-lg"}>
                    <Text className={notificationMinutes === 5 ? "text-sm font-semibold text-background" : "text-sm font-semibold text-foreground"}>
                      5m
                    </Text>
                  </View>
                </Pressable>
              </View>
              
              {/* Test Notification Button */}
              <Pressable
                onPress={() => {
                  // Simple test notification
                  alert(`Notifikasi uji akan keluar dalam ${notificationMinutes} minit`);
                }}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <View className="bg-primary/10 border-2 border-primary rounded-lg p-3 mt-3">
                  <Text className="text-sm font-semibold text-primary text-center">
                    Uji Notifikasi
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
        </View>

        {/* Theme Toggle Section */}
        <View className="bg-surface rounded-2xl p-4 mb-4 border border-border">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-lg font-semibold text-foreground">
                Mod Gelap
              </Text>
              <Text className="text-xs text-muted mt-1">
                {colorScheme === "dark" ? "Aktif" : "Tidak Aktif"}
              </Text>
            </View>
            <Pressable
              onPress={toggleTheme}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View className="flex-row items-center gap-2 bg-primary/20 rounded-lg px-4 py-2">
                {colorScheme === "dark" ? (
                  <>
                    <MaterialIcons name="dark-mode" size={20} color={colors.primary} />
                    <Text className="text-sm font-semibold text-primary">
                      Bulan
                    </Text>
                  </>
                ) : (
                  <>
                    <MaterialIcons name="light-mode" size={20} color={colors.primary} />
                    <Text className="text-sm font-semibold text-primary">
                      Matahari
                    </Text>
                  </>
                )}
              </View>
            </Pressable>
          </View>
        </View>

        {/* About Section */}
        <View className="bg-surface rounded-2xl p-4 mb-4 border border-border">
          <Text className="text-lg font-semibold text-foreground mb-2">
            Tentang Aplikasi
          </Text>
          <Text className="text-sm text-muted mb-2">
            Ramadhan Countdown v1.0.1
          </Text>
          <Text className="text-xs text-muted">
            Aplikasi untuk mengira hari, jam, minit, dan saat sehingga 1 Ramadhan tiba.
          </Text>
        </View>

        {/* Share Button */}
        <View className="mb-4">
          <ShareButton
            title="Ramadhan Akan Tiba"
            message="Ramadhan Akan Tiba - Aplikasi countdown untuk Malaysia 🌙"
            url="https://www.annamir.my"
          />
        </View>

        {/* Exit Button */}
        <View className="mt-auto">
          <Pressable
            onPress={handleExit}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <View className="bg-error/20 rounded-lg p-4 items-center">
              <Text className="text-error font-semibold">
                Keluar Aplikasi
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
