import { ScrollView, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { CountdownDisplay } from "@/components/countdown-display";

/**
 * Home Screen - Ramadan Countdown
 *
 * Skrin utama yang memaparkan countdown Ramadhan dengan hari, jam, minit, dan saat.
 */
export default function HomeScreen() {
  return (
    <ScreenContainer className="p-6">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center">
          <CountdownDisplay />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
