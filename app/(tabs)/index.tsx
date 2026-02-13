import { ScrollView, View, Pressable, Linking, StyleSheet } from "react-native";
import { Text } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { CountdownDisplay } from "@/components/countdown-display";
import { useTranslation } from "@/hooks/use-translation";
import { useColors } from "@/hooks/use-colors";

/**
 * Home Screen - Ramadan Countdown
 *
 * Skrin utama yang memaparkan countdown Ramadhan dengan hari, jam, minit, dan saat.
 */
export default function HomeScreen() {
  const t = useTranslation();
  const colors = useColors();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
    },
    scrollContent: {
      flexGrow: 1,
    },
    centerContent: {
      flex: 1,
      justifyContent: "center",
    },
    footer: {
      marginTop: 32,
      gap: 8,
      alignItems: "center",
      paddingBottom: 16,
    },
    link: {
      fontSize: 12,
      color: colors.primary,
      fontWeight: "600",
    },
    credit: {
      fontSize: 12,
      color: colors.muted,
    },
  });

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.centerContent}>
            <CountdownDisplay />
          </View>
        </ScrollView>

        {/* Website Link & Credit */}
        <View style={styles.footer}>
          <Pressable 
            onPress={() => Linking.openURL("https://mylink.la/annamir")}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={styles.link}>
              www.annamir.my
            </Text>
          </Pressable>
          
          <Text style={styles.credit}>
            {t('home.poweredBy')}
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
}
