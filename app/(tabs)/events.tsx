import { BottomFade } from "@/components/bottom-fade";
import { EventCard } from "@/components/event-card";
import { CHURCH_EVENTS } from "@/constants/church-data";
import { Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

  const filteredEvents = selectedCategory
    ? CHURCH_EVENTS.filter((event) => event.category === selectedCategory)
    : CHURCH_EVENTS;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: t.background }}
      edges={["top"]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={[styles.headerTitle, { color: t.text }]}>
            Church Events
          </Text>
          <Text style={[styles.headerSubtitle, { color: t.textSecondary }]}>
            {filteredEvents.length} event
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
                All Events
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
                No events found in this category
              </Text>
            </View>
          )}
        </View>

        {/* Featured Section */}
        <View style={styles.featuredSection}>
          <Text style={[styles.featuredTitle, { color: t.text }]}>
            Don&apos;t See What You&apos;re Looking For?
          </Text>

          <View
            style={[
              styles.featureCard,
              { backgroundColor: t.cardBgElevated, borderColor: t.border },
            ]}
          >
            <View style={styles.featureCardHeader}>
              <Ionicons name="notifications" size={24} color={t.tint} />
              <Text style={[styles.featureHeading, { color: t.text }]}>
                Subscribe to Notifications
              </Text>
            </View>
            <Text style={[styles.featureText, { color: t.textSecondary }]}>
              Get notified about new events, schedule changes, and special
              announcements.
            </Text>
          </View>

          <View
            style={[
              styles.featureCard,
              { backgroundColor: t.cardBgElevated, borderColor: t.border },
            ]}
          >
            <View style={styles.featureCardHeader}>
              <Ionicons name="mail" size={24} color={t.tint} />
              <Text style={[styles.featureHeading, { color: t.text }]}>
                Email Newsletter
              </Text>
            </View>
            <Text style={[styles.featureText, { color: t.textSecondary }]}>
              Receive a weekly email with all upcoming events and ministry
              opportunities.
            </Text>
          </View>

          <View
            style={[
              styles.featureCard,
              { backgroundColor: t.cardBgElevated, borderColor: t.border },
            ]}
          >
            <View style={styles.featureCardHeader}>
              <Ionicons name="people" size={24} color={t.tint} />
              <Text style={[styles.featureHeading, { color: t.text }]}>
                Ask a Question
              </Text>
            </View>
            <Text style={[styles.featureText, { color: t.textSecondary }]}>
              Have questions about an event? Contact our team for more
              information.
            </Text>
          </View>
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
  featuredSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
    gap: 12,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: Fonts.bold,
    marginBottom: 4,
  },
  featureCard: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  featureCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  featureHeading: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: Fonts.semiBold,
  },
  featureText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    lineHeight: 20,
  },
});
