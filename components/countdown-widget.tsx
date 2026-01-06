import { View, Text } from "react-native";
import { useCountdown } from "@/hooks/use-countdown";
import { useColors } from "@/hooks/use-colors";

/**
 * Widget component untuk display Ramadhan countdown di home screen
 * Menampilkan hari, jam, minit, dan saat dalam format compact
 */
export function CountdownWidget() {
  const countdown = useCountdown();
  const colors = useColors();

  // Format countdown untuk widget display
  const formatCountdown = () => {
    if (countdown.isRamadan) {
      return "Ramadhan Tiba! 🌙";
    }
    
    return `${countdown.days}h ${countdown.hours}j ${countdown.minutes}m ${countdown.seconds}s`;
  };

  return (
    <View
      style={{
        backgroundColor: colors.primary,
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 100,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          color: colors.background,
          marginBottom: 8,
          fontWeight: "600",
        }}
      >
        Ramadhan Akan Tiba
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: colors.background,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {formatCountdown()}
      </Text>
    </View>
  );
}
