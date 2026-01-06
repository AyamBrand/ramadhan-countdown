import { View, Text, ScrollView, Pressable, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { PrayerTimesDisplayCorrect } from "@/components/prayer-times-display-correct";
import { MALAYSIA_ZONES } from "@/hooks/use-prayer-times-correct";
import { useStoredZone } from "@/hooks/use-stored-zone";
import { useOfflinePrayerTimes } from "@/hooks/use-offline-prayer-times";
import { ActivityIndicator } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { useTranslation } from "@/hooks/use-translation";

/**
 * Halaman Jadual Imsak dan Berbuka Puasa
 * Menampilkan jadual waktu solat untuk setiap negeri dan zon di Malaysia
 */
export default function PrayerTimesScreen() {
  const { selectedState, selectedZone, saveState, saveZone, isLoading } = useStoredZone();
  const colors = useColors();
  const t = useTranslation();
  const now = new Date();
  const { prayerTimes, loading: apiLoading, isOffline, isCached } = useOfflinePrayerTimes(
    selectedZone,
    now.getFullYear(),
    now.getMonth() + 1
  );

  const currentStateData = MALAYSIA_ZONES[selectedState as keyof typeof MALAYSIA_ZONES];
  const stateList = Object.entries(MALAYSIA_ZONES).map(([key, value]) => ({
    code: key,
    name: value.name,
  }));

  const handleStateChange = async (stateCode: string) => {
    await saveState(stateCode);
    // Automatically select first zone of the state
    const zones = MALAYSIA_ZONES[stateCode as keyof typeof MALAYSIA_ZONES]?.zones;
    if (zones && zones.length > 0) {
      await saveZone(zones[0].code);
    }
  };

  return (
    <ScreenContainer className="p-4">
      <View className="flex-1">
        {/* Header */}
        <View className="mb-4">
          <Text className="text-2xl font-bold text-foreground mb-2">
            {t('prayerTimes.title')}
          </Text>
          <Text className="text-sm text-muted">
            Ramadhan 1447H / Februari 2026
          </Text>
        </View>

        {/* Offline Indicator */}
        {isOffline && (
          <View className="bg-warning/20 border-l-4 border-warning rounded-lg p-3 mb-4">
            <Text className="text-xs font-semibold text-warning">
              {t('offline.indicator')} • {t('offline.cached')}
            </Text>
          </View>
        )}
        {isCached && !isOffline && (
          <View className="bg-success/20 border-l-4 border-success rounded-lg p-3 mb-4">
            <Text className="text-xs font-semibold text-success">
              {t('offline.synced')}
            </Text>
          </View>
        )}

        {/* State Selector */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-foreground mb-2">
            {t('prayerTimes.state')}:
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingBottom: 4 }}
          >
            {stateList.map((state) => (
              <Pressable
                key={state.code}
                onPress={() => handleStateChange(state.code)}
                disabled={isLoading}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <View
                  className={`px-3 py-2 rounded-full border-2 ${
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

        {/* Zone Selector */}
        {currentStateData && (
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">
              {t('prayerTimes.zone')} ({currentStateData.zones.length}):
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, paddingBottom: 4 }}
            >
              {currentStateData.zones.map((zone) => (
                <Pressable
                  key={zone.code}
                  onPress={() => saveZone(zone.code)}
                  disabled={isLoading}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                >
                  <View
                    className={`px-3 py-2 rounded-lg border-2 ${
                      selectedZone === zone.code
                        ? "bg-accent border-accent"
                        : "bg-surface border-border"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        selectedZone === zone.code
                          ? "text-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {zone.code}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
            {/* Zone Description */}
            <Text className="text-xs text-muted mt-2">
              {
                currentStateData.zones.find((z) => z.code === selectedZone)
                  ?.name
              }
            </Text>
          </View>
        )}

        {/* Prayer Times List */}
        <View className="flex-1">
          <PrayerTimesDisplayCorrect
            selectedState={selectedState}
            selectedZone={selectedZone}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
