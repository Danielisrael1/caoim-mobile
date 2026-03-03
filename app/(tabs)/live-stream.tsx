import { LiveStreamCard } from "@/components/live-stream-card";
import { LIVE_STREAMS } from "@/constants/church-data";
import { useAppTheme } from "@/hooks/use-app-theme";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LiveStreamScreen() {
  const t = useAppTheme();
  const liveStreams = LIVE_STREAMS;
  const activeStreams = liveStreams.filter((s) => s.isLive);
  const upcomingStreams = liveStreams.filter((s) => !s.isLive);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: t.background }}
      edges={["top"]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={[styles.headerTitle, { color: t.text }]}>
            Live Streaming
          </Text>
          <Text style={[styles.headerSubtitle, { color: t.textSecondary }]}>
            Watch our services and events
          </Text>
        </View>

        {/* Active Streams */}
        {activeStreams.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.liveDot} />
              <Text style={[styles.sectionTitle, { color: t.text }]}>
                Now Streaming
              </Text>
            </View>
            {activeStreams.map((stream) => (
              <LiveStreamCard key={stream.id} stream={stream} />
            ))}
          </View>
        )}

        {/* Upcoming Streams */}
        {upcomingStreams.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text
              style={[styles.sectionTitle, { color: t.text, marginBottom: 12 }]}
            >
              Upcoming Streams
            </Text>
            {upcomingStreams.map((stream) => (
              <LiveStreamCard key={stream.id} stream={stream} />
            ))}
          </View>
        )}

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View
            style={[
              styles.infoCard,
              { backgroundColor: t.cardBgElevated, borderColor: t.border },
            ]}
          >
            <View style={styles.infoTitleRow}>
              <Ionicons name="phone-portrait" size={18} color={t.tint} />
              <Text style={[styles.infoTitle, { color: t.text }]}>
                Watch Anywhere
              </Text>
            </View>
            <Text style={[styles.infoText, { color: t.textSecondary }]}>
              Access all our live streams and recordings from your phone,
              tablet, or computer.
            </Text>
          </View>

          <View
            style={[
              styles.infoCard,
              { backgroundColor: t.cardBgElevated, borderColor: t.border },
            ]}
          >
            <View style={styles.infoTitleRow}>
              <Ionicons name="notifications" size={18} color={t.tint} />
              <Text style={[styles.infoTitle, { color: t.text }]}>
                Get Notifications
              </Text>
            </View>
            <Text style={[styles.infoText, { color: t.textSecondary }]}>
              Enable notifications to be alerted when we go live with a new
              service or event.
            </Text>
          </View>

          <View
            style={[
              styles.infoCard,
              { backgroundColor: t.cardBgElevated, borderColor: t.border },
            ]}
          >
            <View style={styles.infoTitleRow}>
              <Ionicons name="calendar" size={18} color={t.tint} />
              <Text style={[styles.infoTitle, { color: t.text }]}>
                Scheduled Times
              </Text>
            </View>
            <Text style={[styles.infoText, { color: t.textSecondary }]}>
              Sunday Service: 10:00 AM{"\n"}
              Midweek Prayer: 7:00 PM{"\n"}
              Youth Group: 6:30 PM
            </Text>
          </View>
        </View>

        {/* Bottom spacer for floating tab bar */}
        <View style={{ height: 100 }} />
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
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  liveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF3B30",
  },
  infoSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
    gap: 12,
  },
  infoCard: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  infoTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  infoTitle: {
    fontWeight: "700",
    fontSize: 16,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 20,
  },
});
