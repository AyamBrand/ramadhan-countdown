import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { PrayerTimesDisplay } from "@/components/prayer-times-display";
import { MALAYSIA_STATES } from "@/hooks/use-prayer-times";

/**
 * Halaman Jadual Imsak dan Berbuka Puasa
 * Menampilkan jadual waktu solat untuk setiap negeri di Malaysia
 */
export default function PrayerTimesScreen() {
  const [selectedState, setSelectedState] = useState(10); // Default: Selangor

  return (
    <ScreenContainer className="p-4">
      <View className="flex-1">
        {/* Header */}
        <View className="mb-4">
          <Text className="text-2xl font-bold text-foreground mb-2">
            Jadual Imsak & Berbuka
          </Text>
          <Text className="text-sm text-muted">
            Ramadhan 1447H / Februari 2026
          </Text>
        </View>

        {/* State Selector */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-foreground mb-2">
            Pilih Negeri:
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {MALAYSIA_STATES.map((state) => (
              <Pressable
                key={state.code}
                onPress={() => setSelectedState(state.code)}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <View
                  className={`px-4 py-2 rounded-full border-2 ${
                    selectedState === state.code
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      selectedState === state.code
                        ? "text-background"
                        : "text-foreground"
                    }`}
                  >
                    {state.name}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Prayer Times List */}
        <View className="flex-1">
          <PrayerTimesDisplay stateCode={selectedState} />
        </View>
      </View>
    </ScreenContainer>
  );
}
