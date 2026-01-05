import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Alert, Platform } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 56 + bottomPadding;

  const handleExit = () => {
    Alert.alert(
      "Keluar Aplikasi",
      "Anda yakin ingin keluar dari aplikasi?",
      [
        { text: "Batal", onPress: () => {}, style: "cancel" },
        {
          text: "Keluar",
          onPress: () => {
            if (Platform.OS === "web") {
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
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="prayer-times"
        options={{
          title: "Jadual",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Kalender",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Tetapan",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
