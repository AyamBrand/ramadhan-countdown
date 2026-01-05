import { View, Text, Pressable, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenContainer } from "@/components/screen-container";
import { useThemeContext } from "@/lib/theme-provider";
import { useColors } from "@/hooks/use-colors";

/**
 * Halaman Tetapan (Settings)
 * Menampilkan pengaturan aplikasi termasuk theme toggle
 */
export default function SettingsScreen() {
  const { colorScheme, setColorScheme } = useThemeContext();
  const colors = useColors();

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
      <View className="flex-1">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-foreground">
            Tetapan
          </Text>
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
      </View>
    </ScreenContainer>
  );
}
