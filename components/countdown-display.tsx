import { View, Text } from "react-native";
import { useCountdown } from "@/hooks/use-countdown";
import { useColors } from "@/hooks/use-colors";
import { useRandomQuote } from "@/hooks/use-random-quote";

/**
 * Komponen untuk memaparkan countdown Ramadhan
 * Menunjukkan hari, jam, minit, dan saat
 */
export function CountdownDisplay() {
  const countdown = useCountdown();
  const colors = useColors();
  const quote = useRandomQuote();

  if (countdown.isRamadan) {
    return (
      <View className="items-center justify-center gap-4">
        <Text className="text-5xl font-bold text-primary">
          Selamat Datang Ramadhan! 🌙
        </Text>
        <Text className="text-lg text-muted text-center">
          Semoga Ramadhan ini membawa berkah dan rahmat kepada kita semua.
        </Text>
      </View>
    );
  }

  return (
    <View className="items-center justify-center gap-8">
      {/* Heading */}
      <View className="items-center gap-2">
        <Text className="text-4xl font-bold text-foreground">
          Ramadhan Akan Tiba
        </Text>
        <Text className="text-base text-muted">
          18 Februari 2026
        </Text>
      </View>

      {/* Countdown Grid */}
      <View className="flex-row gap-3 justify-center flex-wrap">
        {/* Days */}
        <View className="items-center bg-surface rounded-2xl p-6 w-20">
          <Text className="text-4xl font-bold text-primary">
            {countdown.days}
          </Text>
          <Text className="text-xs text-muted mt-2 uppercase tracking-wider">
            Hari
          </Text>
        </View>

        {/* Hours */}
        <View className="items-center bg-surface rounded-2xl p-6 w-20">
          <Text className="text-4xl font-bold text-primary">
            {String(countdown.hours).padStart(2, "0")}
          </Text>
          <Text className="text-xs text-muted mt-2 uppercase tracking-wider">
            Jam
          </Text>
        </View>

        {/* Minutes */}
        <View className="items-center bg-surface rounded-2xl p-6 w-20">
          <Text className="text-4xl font-bold text-primary">
            {String(countdown.minutes).padStart(2, "0")}
          </Text>
          <Text className="text-xs text-muted mt-2 uppercase tracking-wider">
            Min
          </Text>
        </View>

        {/* Seconds */}
        <View className="items-center bg-surface rounded-2xl p-6 w-20">
          <Text className="text-4xl font-bold text-primary">
            {String(countdown.seconds).padStart(2, "0")}
          </Text>
          <Text className="text-xs text-muted mt-2 uppercase tracking-wider">
            Saat
          </Text>
        </View>
      </View>

      {/* Motivational Message */}
      <View className="bg-surface rounded-2xl p-6 max-w-xs">
        <Text className="text-center text-base text-foreground leading-relaxed">
          {quote}
        </Text>
      </View>
    </View>
  );
}
