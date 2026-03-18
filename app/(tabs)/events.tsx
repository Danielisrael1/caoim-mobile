import { BottomFade } from "@/components/bottom-fade";
import { EventCard } from "@/components/event-card";
import { type Event } from "@/constants/church-data";
import { Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { generateNextServiceOccurrences } from "@/utils/service-schedule";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function toCardEventShape(e: {
  id: string;
  title: string;
  description?: string;
  category: any;
  location: string;
  startAt: Date;
  endAt: Date;
}): Event {
  return {
    id: e.id,
    title: e.title,
    description: e.description ?? "",
    date: e.startAt.toISOString(),
    startTime: e.startAt.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }),
    endTime: e.endAt.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }),
    location: e.location,
    category: e.category,
  };
}

export default function EventsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const t = useAppTheme();

  const categories = [
    { id: "worship", label: "Worship" },
    { id: "study", label: "Study" },
    { id: "fellowship", label: "Fellowship" },
    { id: "prayer", label: "Prayer" },
    { id: "outreach", label: "Outreach" },
  ];

  const serviceEvents: Event[] = generateNextServiceOccurrences(new Date()).map(
    toCardEventShape,
  );

  const filteredEvents = selectedCategory
    ? serviceEvents.filter((event) => event.category === selectedCategory)
    : serviceEvents;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: t.background }}
      edges={["top"]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={[styles.headerTitle, { color: t.text }]}>
            Church Services
          </Text>
          <Text style={[styles.headerSubtitle, { color: t.textSecondary }]}>
            {filteredEvents.length} service
            {filteredEvents.length !== 1 ? "s" : ""} coming up
          </Text>
        </View>

        {/* Category Filter */}
        <View style={styles.filterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            <TouchableOpacity
              style={[
                styles.filterButton,
                { backgroundColor: t.filterBg },
                selectedCategory === null && {
                  backgroundColor: t.filterActiveBg,
                },
              ]}
              onPress={() => setSelectedCategory(null)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  { color: t.text },
                  selectedCategory === null && { color: t.buttonText },
                ]}
              >
                All
              </Text>
            </TouchableOpacity>

            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.filterButton,
                  { backgroundColor: t.filterBg },
                  selectedCategory === category.id && {
                    backgroundColor: t.filterActiveBg,
                  },
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    { color: t.text },
                    selectedCategory === category.id && {
                      color: t.buttonText,
                    },
                  ]}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Events List */}
        <View style={styles.eventsContainer}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyStateText, { color: t.textSecondary }]}>
                No services found in this category
              </Text>
            </View>
          )}
        </View>

        {/* Bottom spacer for floating tab bar */}
        <View style={{ height: 110 }} />
      </ScrollView>
      <BottomFade />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    fontFamily: Fonts.extraBold,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
  filterSection: {
    marginVertical: 4,
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: "600",
    fontFamily: Fonts.semiBold,
  },
  eventsContainer: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
});
