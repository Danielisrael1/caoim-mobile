import {
    CHURCH_EVENTS,
    CHURCH_UPDATES,
    LIVE_STREAMS,
} from "@/constants/church-data";
import { Fonts } from "@/constants/theme";
import { BottomFade } from "@/components/bottom-fade";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useThemeToggle } from "@/hooks/use-theme-toggle";
import { useUser } from "@/hooks/use-user";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef } from "react";
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CAOIM_LOGO = require("@/assets/images/caoim-logo.png");

export default function HomeScreen() {
  const router = useRouter();
  const t = useAppTheme();
  const { isDark, toggle } = useThemeToggle();
  const { greeting, displayName } = useUser();
  const scrollY = useRef(new Animated.Value(0)).current;

  const recentUpdate = CHURCH_UPDATES[0];
  const upcomingEvent = CHURCH_EVENTS[0];
  const liveStream = LIVE_STREAMS.find((s) => s.isLive) || LIVE_STREAMS[0];

  // Header parallax animation
  const headerScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.1, 1],
    extrapolate: "clamp",
  });
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: t.background }]}
      edges={["top"]}
    >
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* ── Header with greeting ── */}
        <Animated.View
          style={[
            styles.header,
            { opacity: headerOpacity, transform: [{ scale: headerScale }] },
          ]}
        >
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <Image
                source={CAOIM_LOGO}
                style={styles.headerLogo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.headerRight}>
              {/* Dark / Light mode toggle */}
              <TouchableOpacity
                onPress={toggle}
                style={[
                  styles.toggleButton,
                  { backgroundColor: t.cardBg, borderColor: t.border },
                ]}
              >
                <Ionicons
                  name={isDark ? "sunny" : "moon"}
                  size={18}
                  color={t.tint}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.profileButton,
                  { backgroundColor: t.cardBg, borderColor: t.border },
                ]}
              >
                <Ionicons name="person" size={20} color={t.tint} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.greeting, { color: t.textSecondary }]}>
            {greeting},
          </Text>
          <Text style={[styles.userName, { color: t.text }]}>
            {displayName}!
          </Text>
          <Text style={[styles.tagline, { color: t.tint }]}>
            How can we serve you today?
          </Text>
        </Animated.View>

        {/* ── Featured: Hymn Night Banner ── */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/(tabs)/events")}
          style={[
            styles.hymnBanner,
            { backgroundColor: (t as any).accent || t.tint },
          ]}
        >
          <View style={styles.hymnBannerContent}>
            <View style={styles.hymnBannerLeft}>
              <MaterialCommunityIcons
                name="music-note-eighth"
                size={32}
                color="#FFF"
              />
            </View>
            <View style={styles.hymnBannerText}>
              <Text style={styles.hymnBannerLabel}>FEATURED EVENT</Text>
              <Text style={styles.hymnBannerTitle}>Hymn Night</Text>
              <Text style={styles.hymnBannerSub}>
                An evening of worship &amp; hymns
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#FFF" />
          </View>
        </TouchableOpacity>

        {/* ── Bento Grid ── */}
        <View style={styles.bentoContainer}>
          {/* Row 1: Two equal cards */}
          <View style={styles.bentoRow}>
            <BentoCard
              title="Live Stream"
              subtitle={liveStream?.isLive ? "Now Streaming" : "Upcoming"}
              icon={<Ionicons name="videocam" size={28} color={t.tint} />}
              bgColor={(t as any).bentoLarge}
              textColor={t.text}
              subtitleColor={liveStream?.isLive ? t.error : t.textSecondary}
              theme={t}
              onPress={() => router.push("/(tabs)/live-stream")}
              badge={liveStream?.isLive ? "LIVE" : undefined}
              style={styles.bentoHalf}
            />
            <BentoCard
              title="Events"
              subtitle={`${CHURCH_EVENTS.length} upcoming`}
              icon={
                <Ionicons
                  name="calendar"
                  size={28}
                  color={(t as any).bentoAccent}
                />
              }
              bgColor={(t as any).bentoMedium}
              textColor={t.text}
              subtitleColor={t.textSecondary}
              theme={t}
              onPress={() => router.push("/(tabs)/events")}
              style={styles.bentoHalf}
            />
          </View>

          {/* Row 2: Wide card — Latest update */}
          <BentoCard
            title={recentUpdate?.title ?? "Latest Update"}
            subtitle={
              recentUpdate?.description
                ? recentUpdate.description.slice(0, 80) + "..."
                : undefined
            }
            icon={<Ionicons name="megaphone" size={28} color={t.tint} />}
            bgColor={t.cardBg}
            textColor={t.text}
            subtitleColor={t.textSecondary}
            theme={t}
            onPress={() => router.push("/(tabs)/updates")}
            style={styles.bentoFull}
            isWide
          />

          {/* Row 3: Two smaller cards */}
          <View style={styles.bentoRow}>
            <BentoCardSmall
              title="Bible Study"
              icon={
                <MaterialCommunityIcons
                  name="book-open-variant"
                  size={24}
                  color={t.tint}
                />
              }
              bgColor={(t as any).bentoSmall}
              textColor={t.text}
              borderColor={t.border}
              onPress={() => router.push("/(tabs)/updates")}
            />
            <BentoCardSmall
              title="Prayer Wall"
              icon={
                <MaterialCommunityIcons
                  name="hands-pray"
                  size={24}
                  color={(t as any).bentoAccent}
                />
              }
              bgColor={(t as any).bentoSmall}
              textColor={t.text}
              borderColor={t.border}
              onPress={() => {}}
            />
          </View>

          {/* Row 4: Giving + Contact */}
          <View style={styles.bentoRow}>
            <BentoCard
              title="Giving"
              subtitle="Tithes &amp; Offerings"
              icon={
                <Ionicons
                  name="heart"
                  size={28}
                  color={(t as any).accent || "#E84797"}
                />
              }
              bgColor={(t as any).bentoMedium}
              textColor={t.text}
              subtitleColor={t.textSecondary}
              theme={t}
              onPress={() => router.push("/giving")}
              style={styles.bentoHalf}
            />
            <BentoCard
              title="Media"
              subtitle="Sermons &amp; Bible"
              icon={<Ionicons name="musical-notes" size={28} color={t.tint} />}
              bgColor={(t as any).bentoLarge}
              textColor={t.text}
              subtitleColor={t.textSecondary}
              theme={t}
              onPress={() => router.push("/(tabs)/updates")}
              style={styles.bentoHalf}
            />
          </View>

          {/* Upcoming event highlight */}
          {upcomingEvent && (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push("/(tabs)/events")}
              style={[
                styles.eventHighlight,
                { backgroundColor: t.cardBgElevated, borderColor: t.border },
              ]}
            >
              <View style={styles.eventHighlightContent}>
                <Ionicons name="calendar" size={22} color={t.tint} />
                <View style={styles.eventHighlightText}>
                  <Text style={[styles.eventHighlightTitle, { color: t.text }]}>
                    {upcomingEvent.title}
                  </Text>
                  <Text
                    style={[
                      styles.eventHighlightSub,
                      { color: t.textSecondary },
                    ]}
                  >
                    {upcomingEvent.startTime} · {upcomingEvent.location}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={t.textSecondary}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </Animated.ScrollView>
      <BottomFade />
    </SafeAreaView>
  );
}

/* ── Components ─────────────────────────────────── */

function BentoCard({
  title,
  subtitle,
  icon,
  bgColor,
  textColor,
  subtitleColor,
  theme,
  onPress,
  badge,
  style,
  isWide,
}: {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  subtitleColor?: string;
  theme: any;
  onPress: () => void;
  badge?: string;
  style?: any;
  isWide?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.bentoCard,
        { backgroundColor: bgColor, borderColor: theme.border },
        style,
      ]}
    >
      <View style={styles.bentoCardHeader}>
        {icon}
        {badge && (
          <View style={styles.liveBadge}>
            <View style={styles.liveBadgeDot} />
            <Text style={styles.liveBadgeText}>{badge}</Text>
          </View>
        )}
      </View>
      <Text
        style={[
          styles.bentoCardTitle,
          { color: textColor },
          isWide && styles.bentoCardTitleWide,
        ]}
        numberOfLines={isWide ? 1 : 2}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          style={[
            styles.bentoCardSubtitle,
            { color: subtitleColor ?? textColor },
          ]}
          numberOfLines={isWide ? 2 : 1}
        >
          {subtitle}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

function BentoCardSmall({
  title,
  icon,
  bgColor,
  textColor,
  borderColor,
  onPress,
}: {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  borderColor: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.bentoCardSmall, { backgroundColor: bgColor, borderColor }]}
    >
      {icon}
      <Text style={[styles.bentoCardSmallTitle, { color: textColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

/* ── Styles ──────────────────────────────────────── */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* Header */
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerLogo: {
    width: 36,
    height: 36,
  },
  toggleButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  greeting: {
    fontSize: 15,
    fontFamily: Fonts.medium,
  },
  userName: {
    fontSize: 28,
    fontFamily: Fonts.extraBold,
    letterSpacing: -0.5,
    marginTop: 2,
  },
  tagline: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    marginTop: 4,
  },

  /* Hymn Night Banner */
  hymnBanner: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 24,
    overflow: "hidden",
  },
  hymnBannerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 22,
    gap: 16,
  },
  hymnBannerLeft: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  hymnBannerText: {
    flex: 1,
  },
  hymnBannerLabel: {
    fontSize: 10,
    fontFamily: Fonts.bold,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  hymnBannerTitle: {
    fontSize: 24,
    fontFamily: Fonts.extraBold,
    color: "#FFF",
  },
  hymnBannerSub: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },

  /* Bento Grid */
  bentoContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  bentoRow: {
    flexDirection: "row",
    gap: 12,
  },
  bentoHalf: {
    flex: 1,
  },
  bentoFull: {
    width: "100%",
  },
  bentoCard: {
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    minHeight: 130,
    justifyContent: "space-between",
  },
  bentoCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  bentoCardTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
  bentoCardTitleWide: {
    fontSize: 17,
  },
  bentoCardSubtitle: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    marginTop: 4,
    lineHeight: 18,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8D7EA",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  liveBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E84797",
  },
  liveBadgeText: {
    fontSize: 10,
    fontFamily: Fonts.extraBold,
    color: "#E84797",
    letterSpacing: 0.5,
  },

  /* Small bento card */
  bentoCardSmall: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  bentoCardSmallTitle: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },

  /* Event highlight */
  eventHighlight: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
  },
  eventHighlightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  eventHighlightText: {
    flex: 1,
  },
  eventHighlightTitle: {
    fontSize: 15,
    fontFamily: Fonts.bold,
  },
  eventHighlightSub: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    marginTop: 2,
  },
});
