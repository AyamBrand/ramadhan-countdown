import { View, Text, StyleSheet } from "react-native";
import { useCountdown } from "@/hooks/use-countdown";
import { useColors } from "@/hooks/use-colors";
import { useRandomQuote } from "@/hooks/use-random-quote";
import { useTranslation } from "@/hooks/use-translation";

const styles = StyleSheet.create({
  androidNumberFont: {
    fontFamily: "ARIALBLACKITALIC",
  },
});

/**
 * Komponen untuk memaparkan countdown Ramadhan
 * Menunjukkan hari, jam, minit, dan saat
 */
export function CountdownDisplay() {
  const countdown = useCountdown();
  const colors = useColors();
  const quote = useRandomQuote();
  const t = useTranslation();

  if (countdown.isRamadan) {
    return (
      <View className="items-center justify-center gap-4">
        <Text className="text-5xl font-bold text-primary">
          {t('countdown.title')} 🌙
        </Text>
        <Text className="text-lg text-muted text-center">
          {t('home.quote')}
        </Text>
      </View>
    );
  }

  return (
    <View className="items-center justify-center gap-8">
      {/* Heading */}
      <View className="items-center gap-2">
        <Text className="text-4xl font-bold text-foreground">
          {t('countdown.title')}
        </Text>
        <Text className="text-base text-muted">
          {t('home.date')}: 19 {t('home.month')} 2026
        </Text>
      </View>

      {/* Countdown - Days (Large, Center) */}
      <View className="items-center bg-surface rounded-2xl p-8">
        <Text className="text-9xl font-bold text-primary" style={styles.androidNumberFont}>
          {countdown.days}
        </Text>
        <Text className="text-sm text-muted mt-3 uppercase tracking-wider">
          {t('countdown.days')}
        </Text>
      </View>

      {/* Countdown - Hours, Minutes, Seconds (Small, Below) */}
      <View className="flex-row gap-3 justify-center">
        {/* Hours */}
        <View className="items-center bg-surface rounded-2xl p-4 w-20">
          <Text className="text-3xl font-bold text-primary" style={styles.androidNumberFont}>
            {String(countdown.hours).padStart(2, "0")}
          </Text>
          <Text className="text-xs text-muted mt-2 uppercase tracking-wider">
            {t('countdown.hours')}
          </Text>
        </View>

        {/* Minutes */}
        <View className="items-center bg-surface rounded-2xl p-4 w-20">
          <Text className="text-3xl font-bold text-primary" style={styles.androidNumberFont}>
            {String(countdown.minutes).padStart(2, "0")}
          </Text>
          <Text className="text-xs text-muted mt-2 uppercase tracking-wider">
            {t('countdown.minutes')}
          </Text>
        </View>

        {/* Seconds */}
        <View className="items-center bg-surface rounded-2xl p-4 w-20">
          <Text className="text-3xl font-bold text-primary" style={styles.androidNumberFont}>
            {String(countdown.seconds).padStart(2, "0")}
          </Text>
          <Text className="text-xs text-muted mt-2 uppercase tracking-wider">
            {t('countdown.seconds')}
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
