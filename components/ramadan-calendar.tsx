import { View, Text, ScrollView, FlatList } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface CalendarDay {
  day: number;
  hijri: string;
  isImportant: boolean;
  importantEvent?: string;
}

/**
 * Tarikh penting dalam Ramadhan 1447H / Februari 2026
 */
const IMPORTANT_DATES: Record<number, string> = {
  1: "Awal Ramadhan",
  17: "Nuzul Al-Quran",
  27: "Laylat Al-Qadr (Malam Kemuliaan)",
  30: "Akhir Ramadhan",
};

/**
 * Komponen kalender Ramadhan dengan tarikh penting
 */
export function RamadhanCalendar() {
  const colors = useColors();

  // Generate calendar days untuk Ramadhan (1-30)
  const calendarDays: CalendarDay[] = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    return {
      day,
      hijri: `1 Ramadhan - 30 Ramadhan`,
      isImportant: day in IMPORTANT_DATES,
      importantEvent: IMPORTANT_DATES[day],
    };
  });

  const renderCalendarDay = ({ item }: { item: CalendarDay }) => (
    <View
      className={`flex-1 aspect-square m-1 rounded-lg justify-center items-center border-2 ${
        item.isImportant
          ? "bg-primary/20 border-primary"
          : "bg-surface border-border"
      }`}
    >
      <Text
        className={`text-2xl font-bold ${
          item.isImportant ? "text-primary" : "text-foreground"
        }`}
      >
        {item.day}
      </Text>
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="mb-4">
        <Text className="text-2xl font-bold text-foreground mb-2">
          Kalender Ramadhan
        </Text>
        <Text className="text-sm text-muted">
          1447H / Februari 2026
        </Text>
      </View>

      {/* Calendar Grid */}
      <View className="mb-6">
        <FlatList
          data={calendarDays}
          renderItem={renderCalendarDay}
          keyExtractor={(item) => `day-${item.day}`}
          numColumns={5}
          scrollEnabled={false}
          columnWrapperStyle={{ flex: 1 }}
        />
      </View>

      {/* Important Dates Legend */}
      <View className="bg-surface rounded-lg p-4 border border-border">
        <Text className="text-lg font-bold text-foreground mb-3">
          Tarikh Penting
        </Text>

        <View className="gap-3">
          {Object.entries(IMPORTANT_DATES).map(([day, event]) => (
            <View
              key={`important-${day}`}
              className="flex-row items-start gap-3 pb-3 border-b border-border last:border-b-0"
            >
              {/* Day Badge */}
              <View className="bg-primary/20 border border-primary rounded-lg w-12 h-12 justify-center items-center">
                <Text className="text-lg font-bold text-primary">
                  {day}
                </Text>
              </View>

              {/* Event Description */}
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">
                  {event}
                </Text>
                <Text className="text-xs text-muted mt-1">
                  {getEventDescription(parseInt(day))}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Info Box */}
      <View className="bg-primary/10 rounded-lg p-4 mt-4 border border-primary">
        <Text className="text-sm text-foreground leading-relaxed">
          Ramadhan adalah bulan yang penuh berkah. Manfaatkan waktu ini untuk
          ibadah, berdoa, dan memperbaiki diri menjelang Hari Raya Aidilfitri.
        </Text>
      </View>

      {/* Spacing */}
      <View className="h-4" />
    </ScrollView>
  );
}

/**
 * Deskripsi untuk setiap tarikh penting
 */
function getEventDescription(day: number): string {
  const descriptions: Record<number, string> = {
    1: "Hari pertama berpuasa. Mulai ibadah dengan niat yang ikhlas.",
    17: "Peringatan turunnya Al-Quran kepada Nabi Muhammad SAW.",
    27: "Malam yang lebih baik dari seribu bulan. Berlipat ganda pahala ibadah.",
    30: "Hari terakhir Ramadhan. Persiapan untuk Hari Raya.",
  };

  return descriptions[day] || "";
}
