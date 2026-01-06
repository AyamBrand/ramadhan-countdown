import { ScrollView, View, Pressable, Linking } from "react-native";
import { Text } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { CountdownDisplay } from "@/components/countdown-display";
import { useTranslation } from "@/hooks/use-translation";

/**
 * Home Screen - Ramadan Countdown
 *
 * Skrin utama yang memaparkan countdown Ramadhan dengan hari, jam, minit, dan saat.
 */
export default function HomeScreen() {
  const t = useTranslation();
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

      {/* Website Link & Credit */}
      <View className="mt-8 gap-2 items-center pb-4">
        <Pressable 
          onPress={() => Linking.openURL("https://mylink.la/annamir")}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        >
          <Text className="text-xs text-primary font-semibold">
            www.annamir.my
          </Text>
        </Pressable>
        
        <Text className="text-xs text-muted">
          {t('home.poweredBy')}
        </Text>
      </View>
    </ScreenContainer>
  );
}
