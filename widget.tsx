/**
 * Widget Entry Point untuk iOS dan Android Home Screen Widget
 * 
 * File ini adalah entry point untuk home screen widget.
 * Widget akan display countdown Ramadhan di home screen tanpa perlu buka app.
 * 
 * Untuk iOS: Konfigurasi di app.config.ts dengan WidgetKit
 * Untuk Android: Konfigurasi di app.config.ts dengan AppWidgetProvider
 */

import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

interface WidgetData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isRamadan: boolean;
  lastUpdated: string;
}

export default function CountdownWidgetEntry() {
  const [widgetData, setWidgetData] = useState<WidgetData | null>(null);

  useEffect(() => {
    // Load countdown data dari AsyncStorage
    const loadWidgetData = async () => {
      try {
        const data = await AsyncStorage.getItem("ramadan_countdown_widget");
        if (data) {
          setWidgetData(JSON.parse(data));
        }
      } catch (error) {
        console.error("Failed to load widget data:", error);
      }
    };

    loadWidgetData();

    // Refresh setiap detik
    const interval = setInterval(loadWidgetData, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!widgetData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0a7ea4" }}>
        <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
          Ramadhan Akan Tiba
        </Text>
      </View>
    );
  }

  const formatCountdown = () => {
    if (widgetData.isRamadan) {
      return "Ramadhan Tiba! 🌙";
    }
    return `${widgetData.days}h ${widgetData.hours}j ${widgetData.minutes}m ${widgetData.seconds}s`;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0a7ea4",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        borderRadius: 12,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          color: "white",
          marginBottom: 8,
          fontWeight: "600",
        }}
      >
        Ramadhan Akan Tiba
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {formatCountdown()}
      </Text>
    </View>
  );
}
