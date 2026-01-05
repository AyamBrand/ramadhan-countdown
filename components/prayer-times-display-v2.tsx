import { View, Text, ScrollView, ActivityIndicator, FlatList, Pressable } from "react-native";
import { usePrayerTimesV2, MALAYSIA_ZONES, type PrayerTime } from "@/hooks/use-prayer-times-v2";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

interface PrayerTimesDisplayV2Props {
  selectedState: string;
  selectedZone: string;
}

/**
 * Komponen untuk memaparkan jadual imsak dan berbuka puasa dengan pilihan zon
 */
export function PrayerTimesDisplayV2({ selectedState, selectedZone }: PrayerTimesDisplayV2Props) {
  const { loading, error, data } = usePrayerTimesV2(selectedZone, 2026, 2);
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
        <Text className="text-error text-center font-semibold">
          Ralat: {error}
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

        {/* Berbuka (Maghrib) */}
        <View className="flex-row justify-between items-center bg-accent/10 rounded-lg p-3">
          <Text className="text-sm font-semibold text-accent">
            Berbuka
          </Text>
          <Text className="text-lg font-bold text-accent">
            {item.maghrib}
          </Text>
        </View>
      </View>

      {/* Waktu Solat Lain */}
      <View className="mt-3 pt-3 border-t border-border">
        <View className="gap-2">
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
