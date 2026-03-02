import { EventCard } from "@/components/event-card";
import { LiveStreamCard } from "@/components/live-stream-card";
import { UpdateCard } from "@/components/update-card";
import {
    CHURCH_EVENTS,
    CHURCH_UPDATES,
    LIVE_STREAMS,
} from "@/constants/church-data";
import { useAppTheme } from "@/hooks/use-app-theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const t = useAppTheme();

  const recentUpdate = CHURCH_UPDATES[0];
  const upcomingEvent = CHURCH_EVENTS[0];
  const liveStream = LIVE_STREAMS.find((s) => s.isLive) || LIVE_STREAMS[0];

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: t.background }}
      edges={["top"]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View
          style={[
            styles.headerSection,
            { backgroundColor: t.isDark ? "#151429" : "#EDE9FE" },
          ]}
        >
          <Text style={[styles.headerGreeting, { color: t.textSecondary }]}>
            Welcome to
          </Text>
          <Text style={[styles.headerTitle, { color: t.text }]}>
            CAOIM Church{" "}
            <MaterialCommunityIcons name="cross" size={28} color={t.tint} />
          </Text>
          <Text style={[styles.headerSubtitle, { color: t.tint }]}>
            Connect • Worship • Grow in Faith
          </Text>
        </View>

        {/* Featured Live Stream */}
        <View style={styles.sectionContainer}>
          <SectionHeader
            title="Featured Live"
            icon={<Ionicons name="radio" size={20} color={t.error} />}
            theme={t}
          />
          {liveStream && (
            <LiveStreamCard
              stream={liveStream}
              onPress={() => router.push("/(tabs)/live-stream")}
            />
          )}
        </View>

        {/* Latest Update */}
        <View style={styles.sectionContainer}>
          <SectionHeader
            title="Latest Update"
            icon={<Ionicons name="megaphone" size={20} color={t.tint} />}
            theme={t}
          />
          {recentUpdate && (
            <UpdateCard
              update={recentUpdate}
              onPress={() => router.push("/(tabs)/updates")}
            />
          )}
        </View>

        {/* Upcoming Event */}
        <View style={styles.sectionContainer}>
          <SectionHeader
            title="Upcoming Event"
            icon={<Ionicons name="calendar" size={20} color={t.tint} />}
            theme={t}
          />
          {upcomingEvent && (
            <EventCard
              event={upcomingEvent}
              onPress={() => router.push("/(tabs)/events")}
            />
          )}
        </View>

        {/* Quick Links */}
        <View style={styles.quickLinksSection}>
          <Text style={[styles.sectionTitle, { color: t.text }]}>
            Quick Links
          </Text>
          <View style={styles.quickLinksGrid}>
            <QuickLinkButton
              title="All Events"
              icon={<Ionicons name="calendar" size={28} color={t.tint} />}
              theme={t}
              onPress={() => router.push("/(tabs)/events")}
            />
            <QuickLinkButton
              title="Watch Live"
              icon={<Ionicons name="videocam" size={28} color={t.tint} />}
              theme={t}
              onPress={() => router.push("/(tabs)/live-stream")}
            />
            <QuickLinkButton
              title="Updates"
              icon={<Ionicons name="megaphone" size={28} color={t.tint} />}
              theme={t}
              onPress={() => router.push("/(tabs)/updates")}
            />
            <QuickLinkButton
              title="Contact Us"
              icon={<Ionicons name="call" size={28} color={t.tint} />}
              theme={t}
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ── Helpers ─────────────────────────────────────────── */

function SectionHeader({
  title,
  icon,
  theme,
}: {
  title: string;
  icon: React.ReactNode;
  theme: any;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionHeaderRow}>
        {icon}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {title}
        </Text>
      </View>
    </View>
  );
}

function QuickLinkButton({
  title,
  icon,
  theme,
  onPress,
}: {
  title: string;
  icon: React.ReactNode;
  theme: any;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.quickLinkButton,
        {
          backgroundColor: theme.cardBg,
          borderColor: theme.border,
        },
      ]}
    >
      {icon}
      <Text style={[styles.quickLinkText, { color: theme.text }]}>{title}</Text>
    </TouchableOpacity>
  );
}

/* ── Styles ──────────────────────────────────────────── */

const styles = StyleSheet.create({
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 8,
  },
  headerGreeting: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  sectionContainer: {
    marginBottom: 8,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  quickLinksSection: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },
  quickLinksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 12,
  },
  quickLinkButton: {
    width: "47%",
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  quickLinkText: {
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
});
