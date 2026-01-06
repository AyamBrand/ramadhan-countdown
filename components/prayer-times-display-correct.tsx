import { View, Text, ScrollView, ActivityIndicator, FlatList, Pressable } from "react-native";
import { usePrayerTimesCorrect, MALAYSIA_ZONES, type PrayerTime } from "@/hooks/use-prayer-times-correct";
import { useColors } from "@/hooks/use-colors";
import { useTranslation } from "@/hooks/use-translation";
import { useState } from "react";

interface PrayerTimesDisplayCorrectProps {
  selectedState: string;
  selectedZone: string;
}

/**
 * Komponen untuk memaparkan jadual imsak dan berbuka puasa dengan pilihan zon
 */
export function PrayerTimesDisplayCorrect({ selectedState, selectedZone }: PrayerTimesDisplayCorrectProps) {
  const { loading, error, data } = usePrayerTimesCorrect(selectedZone, 2026, 2);
  const colors = useColors();
  const t = useTranslation();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
        <Text className="text-muted mt-4">{t('common.loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-error text-center font-semibold">
          {t('common.error')}: {error}
        </Text>
        <Text className="text-muted text-center mt-2 text-xs">
          Sila pilih zon yang betul atau periksa sambungan internet anda
        </Text>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-muted text-center">
          Tiada data tersedia untuk zon ini
        </Text>
      </View>
    );
  }

  const renderPrayerTimeItem = ({ item }: { item: PrayerTime }) => (
    <View className="bg-surface rounded-lg p-4 mb-3 border border-border">
      {/* Header - Hari dan Tarikh */}
      <View className="flex-row justify-between items-center mb-3 pb-3 border-b border-border">
        <Text className="text-lg font-bold text-foreground">
          {t('prayerTimes.day')} {item.day}
        </Text>
        <Text className="text-xs text-muted">
          {item.date}
        </Text>
      </View>

      {/* Imsak & Berbuka */}
      <View className="gap-3">
        {/* Subuh (Imsak) */}
        <View className="flex-row justify-between items-center bg-primary/10 rounded-lg p-3">
          <Text className="text-sm font-semibold text-primary">
            {t('prayerTimes.imsak')}/Subuh
          </Text>
          <Text className="text-lg font-bold text-primary">
            {item.subuh}
          </Text>
        </View>

        {/* Berbuka (Maghrib) */}
        <View className="flex-row justify-between items-center rounded-lg p-3 border" style={{ backgroundColor: (colors as any).berbuka + '33', borderColor: (colors as any).berbuka }}>
          <Text className="text-sm font-semibold" style={{ color: (colors as any).berbuka }}>
            {t('prayerTimes.iftar')}
          </Text>
          <Text className="text-lg font-bold" style={{ color: (colors as any).berbuka }}>
            {item.maghrib}
          </Text>
        </View>
      </View>

      {/* Waktu Solat Lain */}
      <View className="mt-3 pt-3 border-t border-border">
        <View className="gap-2">
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
