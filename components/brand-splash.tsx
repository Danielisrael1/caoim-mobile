import { useAppTheme } from "@/hooks/use-app-theme";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

const CAOIM_LOGO = require("@/assets/images/caoim-logo.png");

interface BrandSplashProps {
  onFinish: () => void;
}

/**
 * Branded splash screen shown every time the app opens.
 * Displays the CAOIM logo with a fade-in animation, then fades out.
 */
export default function BrandSplash({ onFinish }: BrandSplashProps) {
  const t = useAppTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    // Fade in + scale up
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Hold for a moment, then fade out
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          onFinish();
        });
      }, 1200);
    });
  }, [fadeAnim, scaleAnim, onFinish]);

  return (
    <View style={[styles.container, { backgroundColor: t.background }]}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image source={CAOIM_LOGO} style={styles.logo} resizeMode="contain" />
        <Text style={[styles.brandName, { color: t.tint }]}>CAOIM</Text>
        <Text style={[styles.tagline, { color: t.textSecondary }]}>
          Christ The Alpha &amp; Omega Int&apos;l Ministries
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  brandName: {
    fontSize: 38,
    fontWeight: "900",
    letterSpacing: 8,
    marginTop: 12,
  },
  tagline: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 8,
    letterSpacing: 0.5,
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
