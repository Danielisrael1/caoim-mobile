import { BottomFade } from "@/components/bottom-fade";
import { CHURCH_UPDATES } from "@/constants/church-data";
import { Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useUser } from "@/hooks/use-user";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
  const { greeting, displayName } = useUser();
  const scrollY = useRef(new Animated.Value(0)).current;

  const recentUpdate = CHURCH_UPDATES[0];

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
              <TouchableOpacity
                onPress={() => router.push("/profile")}
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

        {/* ── Featured: Hymn Night Hero Banner ── */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/(tabs)/events")}
          style={styles.heroBanner}
        >
          <LinearGradient
            colors={["#203F9A", "#4E7CB2", "#94C2DA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroBannerGradient}
          >
            {/* Decorative circles */}
            <View style={styles.heroCircle1} />
            <View style={styles.heroCircle2} />

            <View style={styles.heroContent}>
              <View style={styles.heroLabelRow}>
                <View style={styles.heroLabelBadge}>
                  <Ionicons name="star" size={10} color="#FFF" />
                  <Text style={styles.heroLabelText}>FEATURED EVENT</Text>
                </View>
              </View>

              <View style={styles.heroIconRow}>
                <View style={styles.heroIconCircle}>
                  <MaterialCommunityIcons
                    name="music-note-eighth"
                    size={36}
                    color="#FFF"
                  />
                </View>
              </View>

              <Text style={styles.heroTitle}>Hymn Night</Text>
              <Text style={styles.heroSubtitle}>
                An evening of worship &amp; hymns
              </Text>

              <View style={styles.heroCta}>
                <Text style={styles.heroCtaText}>View Details</Text>
                <Ionicons name="arrow-forward" size={16} color="#FFF" />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* ── Bento Grid ── */}
        <View style={styles.bentoContainer}>
          {/* Row 1: Wide card — Latest update */}
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
  profileButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
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

  /* Hero Featured Banner */
  heroBanner: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 28,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#203F9A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  heroBannerGradient: {
    paddingVertical: 36,
    paddingHorizontal: 24,
    position: "relative",
    overflow: "hidden",
  },
  heroCircle1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.06)",
    top: -60,
    right: -40,
  },
  heroCircle2: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.08)",
    bottom: -30,
    left: -20,
  },
  heroContent: {
    alignItems: "center",
    gap: 12,
  },
  heroLabelRow: {
    marginBottom: 4,
  },
  heroLabelBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  heroLabelText: {
    fontSize: 10,
    fontFamily: Fonts.bold,
    color: "#FFF",
    letterSpacing: 1.5,
  },
  heroIconRow: {
    marginVertical: 4,
  },
  heroIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 32,
    fontFamily: Fonts.extraBold,
    color: "#FFF",
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: "rgba(255,255,255,0.8)",
    marginTop: -4,
  },
  heroCta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    marginTop: 8,
  },
  heroCtaText: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    color: "#FFF",
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
});
