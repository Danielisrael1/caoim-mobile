import { UpdateCard } from "@/components/update-card";
import { CHURCH_UPDATES } from "@/constants/church-data";
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

export default function UpdatesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const t = useAppTheme();

  const categories = [
    { id: "announcement", label: "Announcements" },
    { id: "news", label: "News" },
    { id: "prayer", label: "Prayer Requests" },
    { id: "ministry", label: "Ministry" },
  ];

  const filteredUpdates = selectedCategory
    ? CHURCH_UPDATES.filter((update) => update.category === selectedCategory)
    : CHURCH_UPDATES;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: t.background }}
      edges={["top"]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={[styles.headerTitle, { color: t.text }]}>
            Church Updates
          </Text>
          <Text style={[styles.headerSubtitle, { color: t.textSecondary }]}>
            Stay informed about what&apos;s happening
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
                All Updates
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

        {/* Updates List */}
        <View style={styles.updatesContainer}>
          {filteredUpdates.length > 0 ? (
            filteredUpdates.map((update) => (
              <UpdateCard key={update.id} update={update} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyStateText, { color: t.textSecondary }]}>
                No updates found in this category
              </Text>
            </View>
          )}
        </View>

        {/* Notification Section */}
        <View
          style={[
            styles.notificationSection,
            {
              backgroundColor: t.cardBgElevated,
              borderColor: t.border,
            },
          ]}
        >
          <Text style={[styles.notificationTitle, { color: t.text }]}>
            <Ionicons name="notifications" size={18} color={t.tint} /> Enable
            Notifications
          </Text>
          <Text style={[styles.notificationText, { color: t.textSecondary }]}>
            Never miss an important update! Turn on notifications to receive
            alerts about announcements, prayer requests, and ministry
            opportunities.
          </Text>
          <TouchableOpacity
            style={[styles.notificationButton, { backgroundColor: t.buttonBg }]}
          >
            <Text
              style={[styles.notificationButtonText, { color: t.buttonText }]}
            >
              Turn On Notifications
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={[styles.contactSectionTitle, { color: t.text }]}>
            Have a Question?
          </Text>

          <View
            style={[
              styles.contactCard,
              { backgroundColor: t.cardBgElevated, borderColor: t.border },
            ]}
          >
            <Ionicons name="call" size={24} color={t.tint} />
            <View style={styles.contactInfo}>
              <Text style={[styles.contactLabel, { color: t.text }]}>
                Phone
              </Text>
              <Text style={[styles.contactDetail, { color: t.textSecondary }]}>
                (555) 123-4567
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.contactCard,
              { backgroundColor: t.cardBgElevated, borderColor: t.border },
            ]}
          >
            <Ionicons name="mail" size={24} color={t.tint} />
            <View style={styles.contactInfo}>
              <Text style={[styles.contactLabel, { color: t.text }]}>
                Email
              </Text>
              <Text style={[styles.contactDetail, { color: t.textSecondary }]}>
                info@caoimchurch.org
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.contactCard,
              { backgroundColor: t.cardBgElevated, borderColor: t.border },
            ]}
          >
            <Ionicons name="location" size={24} color={t.tint} />
            <View style={styles.contactInfo}>
              <Text style={[styles.contactLabel, { color: t.text }]}>
                Location
              </Text>
              <Text style={[styles.contactDetail, { color: t.textSecondary }]}>
                CAOIM Church, Hope City
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
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
  },
  updatesContainer: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 14,
  },
  notificationSection: {
    marginHorizontal: 16,
    marginVertical: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  notificationTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 8,
  },
  notificationText: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },
  notificationButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  notificationButtonText: {
    fontWeight: "700",
    fontSize: 14,
  },
  contactSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  contactSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    gap: 14,
  },
  contactInfo: {
    flex: 1,
    gap: 2,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  contactDetail: {
    fontSize: 13,
  },
});
