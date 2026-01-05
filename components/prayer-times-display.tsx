import { View, Text, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { usePrayerTimes, PrayerTime } from "@/hooks/use-prayer-times";
import { useColors } from "@/hooks/use-colors";

interface PrayerTimesDisplayProps {
  stateCode: number;
}

/**
 * Komponen untuk memaparkan jadual imsak dan berbuka puasa
 */
export function PrayerTimesDisplay({ stateCode }: PrayerTimesDisplayProps) {
  const { loading, error, data } = usePrayerTimes(stateCode, 2026, 2);
  const colors = useColors();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
        <Text className="text-muted mt-4">Memuatkan data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-error text-center">
          Ralat: {error}
        </Text>
        <Text className="text-muted text-center mt-2 text-xs">
          Sila periksa sambungan internet anda
        </Text>
      </View>
    );
  }

  const renderPrayerTimeItem = ({ item }: { item: PrayerTime }) => (
    <View className="bg-surface rounded-lg p-4 mb-3 border border-border">
      {/* Header - Hari dan Tarikh */}
      <View className="flex-row justify-between items-center mb-3 pb-3 border-b border-border">
        <Text className="text-lg font-bold text-foreground">
          Hari {item.day}
        </Text>
        <Text className="text-xs text-muted">
          {item.date}
        </Text>
      </View>

      {/* Imsak & Berbuka */}
      <View className="gap-3">
        {/* Imsak */}
        <View className="flex-row justify-between items-center bg-primary/10 rounded-lg p-3">
          <Text className="text-sm font-semibold text-primary">
            Imsak
          </Text>
          <Text className="text-lg font-bold text-primary">
            {item.imsak}
          </Text>
        </View>

        {/* Berbuka */}
        <View className="flex-row justify-between items-center bg-accent/10 rounded-lg p-3">
          <Text className="text-sm font-semibold text-accent">
            Berbuka
          </Text>
          <Text className="text-lg font-bold text-accent">
            {item.maghrib}
          </Text>
        </View>
      </View>

      {/* Waktu Solat Lain (Collapsible) */}
      <View className="mt-3 pt-3 border-t border-border">
        <View className="grid grid-cols-2 gap-2">
          <View className="flex-row justify-between">
            <Text className="text-xs text-muted">Subuh:</Text>
            <Text className="text-xs font-semibold text-foreground">{item.subuh}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-xs text-muted">Syuruk:</Text>
            <Text className="text-xs font-semibold text-foreground">{item.syuruk}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-xs text-muted">Zohor:</Text>
            <Text className="text-xs font-semibold text-foreground">{item.zohor}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-xs text-muted">Asar:</Text>
            <Text className="text-xs font-semibold text-foreground">{item.asar}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-xs text-muted">Isyak:</Text>
            <Text className="text-xs font-semibold text-foreground">{item.isyak}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderPrayerTimeItem}
      keyExtractor={(item) => `prayer-${item.day}`}
      scrollEnabled={true}
      nestedScrollEnabled={true}
      contentContainerStyle={{ paddingVertical: 8 }}
    />
  );
}
