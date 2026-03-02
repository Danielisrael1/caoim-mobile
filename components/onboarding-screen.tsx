import { useAppTheme } from "@/hooks/use-app-theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CAOIM_LOGO = require("@/assets/images/caoim-logo.png");

interface OnboardingPage {
  id: string;
  iconFamily: "ionicons" | "material" | "logo";
  iconName: string;
  title: string;
  subtitle: string;
  description: string;
}

const PAGES: OnboardingPage[] = [
  {
    id: "1",
    iconFamily: "logo",
    iconName: "",
    title: "Welcome to\nCAOIM Church",
    subtitle: "Your faith community, always connected",
    description:
      "Stay connected with your church family wherever you are. Get updates, watch services, and never miss a moment.",
  },
  {
    id: "2",
    iconFamily: "ionicons",
    iconName: "videocam",
    title: "Watch Live\nServices",
    subtitle: "Stream from anywhere",
    description:
      "Join our Sunday services, midweek prayers, and special events through live streaming — right from your phone.",
  },
  {
    id: "3",
    iconFamily: "ionicons",
    iconName: "calendar",
    title: "Discover\nEvents",
    subtitle: "Worship, study, and fellowship",
    description:
      "Browse upcoming events, register for activities, and find opportunities to serve and grow in your faith journey.",
  },
  {
    id: "4",
    iconFamily: "ionicons",
    iconName: "notifications",
    title: "Stay\nInformed",
    subtitle: "Never miss an update",
    description:
      "Get instant notifications about announcements, prayer requests, and ministry opportunities that matter to you.",
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({
  onComplete,
}: OnboardingScreenProps) {
  const t = useAppTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const isLastPage = currentIndex === PAGES.length - 1;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const handleNext = () => {
    if (isLastPage) {
      onComplete();
    } else {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false },
  );

  const renderPage = ({
    item,
    index,
  }: {
    item: OnboardingPage;
    index: number;
  }) => {
    return (
      <View style={[styles.page, { width: SCREEN_WIDTH }]}>
        {/* Logo or icon */}
        {item.iconFamily === "logo" ? (
          <View style={styles.logoContainer}>
            <Image
              source={CAOIM_LOGO}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={[styles.logoText, { color: t.tint }]}>CAOIM</Text>
          </View>
        ) : (
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor: t.isDark
                  ? "rgba(167, 143, 255, 0.12)"
                  : "rgba(107, 76, 230, 0.08)",
              },
            ]}
          >
            {item.iconFamily === "material" ? (
              <MaterialCommunityIcons
                name={item.iconName as any}
                size={60}
                color={t.tint}
              />
            ) : (
              <Ionicons name={item.iconName as any} size={60} color={t.tint} />
            )}
          </View>
        )}

        <Text style={[styles.title, { color: t.text }]}>{item.title}</Text>
        <Text style={[styles.subtitle, { color: t.tint }]}>
          {item.subtitle}
        </Text>
        <Text style={[styles.description, { color: t.textSecondary }]}>
          {item.description}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: t.background }]}>
      {/* Skip button */}
      {!isLastPage && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={[styles.skipText, { color: t.textSecondary }]}>
            Skip
          </Text>
        </TouchableOpacity>
      )}

      {/* Pages */}
      <FlatList
        ref={flatListRef}
        data={PAGES}
        renderItem={renderPage}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {/* Bottom section */}
      <View style={styles.bottomSection}>
        {/* Pagination dots */}
        <View style={styles.pagination}>
          {PAGES.map((_, index) => {
            const inputRange = [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 28, 8],
              extrapolate: "clamp",
            });

            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: dotWidth,
                    opacity: dotOpacity,
                    backgroundColor: t.tint,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Action button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: t.buttonBg }]}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={[styles.buttonText, { color: t.buttonText }]}>
            {isLastPage ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>

        {/* Page counter */}
        <Text style={[styles.pageCounter, { color: t.textSecondary }]}>
          {currentIndex + 1} of {PAGES.length}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 24,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipText: {
    fontSize: 15,
    fontWeight: "600",
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  emojiCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoImage: {
    width: 180,
    height: 180,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 6,
    marginTop: 8,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 42,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  bottomSection: {
    paddingHorizontal: 32,
    paddingBottom: 24,
    alignItems: "center",
    gap: 20,
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#6B4CE6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  pageCounter: {
    fontSize: 13,
    fontWeight: "500",
  },
});
