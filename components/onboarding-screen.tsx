import { Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import React, { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewToken,
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const PAGE_IMAGES: ImageSourcePropType[] = [
  require("@/assets/images/p1.jpg"),
  require("@/assets/images/p2.jpg"),
  require("@/assets/images/p3.jpg"),
  require("@/assets/images/p4.jpg"),
];

interface OnboardingPage {
  id: string;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  description: string;
}

const PAGES: OnboardingPage[] = [
  {
    id: "1",
    image: PAGE_IMAGES[0],
    title: "Welcome to\nCAOIM Church",
    subtitle: "Your faith community, always connected",
    description:
      "Stay connected with your church family wherever you are. Get updates, watch services, and never miss a moment.",
  },
  {
    id: "2",
    image: PAGE_IMAGES[1],
    title: "Watch Live\nServices",
    subtitle: "Stream from anywhere",
    description:
      "Join our Sunday services, midweek prayers, and special events through live streaming — right from your phone.",
  },
  {
    id: "3",
    image: PAGE_IMAGES[2],
    title: "Discover\nEvents",
    subtitle: "Worship, study, and fellowship",
    description:
      "Browse upcoming events, register for activities, and find opportunities to serve and grow in your faith journey.",
  },
  {
    id: "4",
    image: PAGE_IMAGES[3],
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
        {/* Background Image */}
        <Image source={item.image} style={styles.bgImage} resizeMode="cover" />
        {/* Dark gradient overlay for readability */}
        <View style={styles.overlay} />

        {/* Content at the bottom */}
        <View style={styles.pageContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={[styles.subtitle, { color: t.tint }]}>
            {item.subtitle}
          </Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Skip button */}
      {!isLastPage && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
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

      {/* Bottom section (over the image) */}
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
                    backgroundColor: "#FFF",
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Action button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: t.tint }]}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>
            {isLastPage ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>

        {/* Page counter */}
        <Text style={styles.pageCounter}>
          {currentIndex + 1} of {PAGES.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 24,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
  },
  skipText: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: Fonts.semiBold,
    color: "#FFF",
  },
  page: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  pageContent: {
    paddingHorizontal: 32,
    paddingBottom: 180,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    fontFamily: Fonts.extraBold,
    color: "#FFF",
    lineHeight: 44,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Fonts.semiBold,
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 24,
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 32,
    paddingBottom: 50,
    alignItems: "center",
    gap: 18,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "700",
    fontFamily: Fonts.bold,
    letterSpacing: 0.3,
    color: "#FFF",
  },
  pageCounter: {
    fontSize: 13,
    fontWeight: "500",
    fontFamily: Fonts.medium,
    color: "rgba(255,255,255,0.6)",
  },
});
