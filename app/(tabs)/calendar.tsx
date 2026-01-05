import { ScreenContainer } from "@/components/screen-container";
import { RamadhanCalendar } from "@/components/ramadan-calendar";

/**
 * Halaman Kalender Ramadhan
 * Menampilkan kalender sebulan Ramadhan dengan tarikh penting
 */
export default function CalendarScreen() {
  return (
    <ScreenContainer className="p-4">
      <RamadhanCalendar />
    </ScreenContainer>
  );
}
