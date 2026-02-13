import { View, Text, StyleSheet } from "react-native";
import { useCountdown } from "@/hooks/use-countdown";
import { useColors } from "@/hooks/use-colors";
import { useRandomQuote } from "@/hooks/use-random-quote";
import { useTranslation } from "@/hooks/use-translation";

/**
 * Komponen untuk memaparkan countdown Ramadhan
 * Menunjukkan hari, jam, minit, dan saat
 */
export function CountdownDisplay() {
  const countdown = useCountdown();
  const colors = useColors();
  const quote = useRandomQuote();
  const t = useTranslation();

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      gap: 32,
    },
    heading: {
      alignItems: "center",
      gap: 8,
    },
    headingTitle: {
      fontSize: 36,
      fontWeight: "bold",
      color: colors.foreground,
    },
    headingSubtitle: {
      fontSize: 14,
      color: colors.muted,
    },
    daysBox: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 32,
    },
    daysNumber: {
      fontSize: 96,
      fontWeight: "bold",
      color: colors.primary,
    },
    daysLabel: {
      fontSize: 12,
      color: colors.muted,
      marginTop: 12,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    timeContainer: {
      flexDirection: "row",
      gap: 12,
      justifyContent: "center",
    },
    timeBox: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      width: 80,
    },
    timeNumber: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.primary,
    },
    timeLabel: {
      fontSize: 10,
      color: colors.muted,
      marginTop: 8,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    quoteBox: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 24,
      maxWidth: 320,
    },
    quoteText: {
      textAlign: "center",
      fontSize: 16,
      color: colors.foreground,
      lineHeight: 24,
    },
    ramadanContainer: {
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
    },
    ramadanTitle: {
      fontSize: 48,
      fontWeight: "bold",
      color: colors.primary,
    },
    ramadanMessage: {
      fontSize: 16,
      color: colors.muted,
      textAlign: "center",
    },
  });

  if (countdown.isRamadan) {
    return (
      <View style={styles.ramadanContainer}>
        <Text style={styles.ramadanTitle}>
          {t('countdown.title')} 🌙
        </Text>
        <Text style={styles.ramadanMessage}>
          {t('home.quote')}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Heading */}
      <View style={styles.heading}>
        <Text style={styles.headingTitle}>
          {countdown.eventType === "hariraya" && countdown.isRamadan
            ? t('countdown.titleHariRaya')
            : t('countdown.title')}
        </Text>
        <Text style={styles.headingSubtitle}>
          {countdown.eventType === "hariraya" && countdown.isRamadan
            ? `${t('home.date')}: 27 ${t('home.monthMay')} 2026`
            : `${t('home.date')}: 19 ${t('home.month')} 2026`}
        </Text>
      </View>

      {/* Countdown - Days (Large, Center) */}
      <View style={styles.daysBox}>
        <Text style={styles.daysNumber}>
          {countdown.days}
        </Text>
        <Text style={styles.daysLabel}>
          {t('countdown.days')}
        </Text>
      </View>

      {/* Countdown - Hours, Minutes, Seconds (Small, Below) */}
      <View style={styles.timeContainer}>
        {/* Hours */}
        <View style={styles.timeBox}>
          <Text style={styles.timeNumber}>
            {String(countdown.hours).padStart(2, "0")}
          </Text>
          <Text style={styles.timeLabel}>
            {t('countdown.hours')}
          </Text>
        </View>

        {/* Minutes */}
        <View style={styles.timeBox}>
          <Text style={styles.timeNumber}>
            {String(countdown.minutes).padStart(2, "0")}
          </Text>
          <Text style={styles.timeLabel}>
            {t('countdown.minutes')}
          </Text>
        </View>

        {/* Seconds */}
        <View style={styles.timeBox}>
          <Text style={styles.timeNumber}>
            {String(countdown.seconds).padStart(2, "0")}
          </Text>
          <Text style={styles.timeLabel}>
            {t('countdown.seconds')}
          </Text>
        </View>
      </View>

      {/* Motivational Message */}
      <View style={styles.quoteBox}>
        <Text style={styles.quoteText}>
          {quote}
        </Text>
      </View>
    </View>
  );
}
