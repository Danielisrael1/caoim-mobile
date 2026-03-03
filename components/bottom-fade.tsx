import { useAppTheme } from "@/hooks/use-app-theme";
import { Platform, StyleSheet, View } from "react-native";

/**
 * A gradient-like fade overlay that sits just above the floating tab bar.
 * Content scrolling behind it appears to smoothly blur/fade out.
 */
export function BottomFade() {
  const t = useAppTheme();
  const bg = t.background;

  return (
    <View style={styles.container} pointerEvents="none">
      <View style={[styles.band, { backgroundColor: bg, opacity: 0 }]} />
      <View style={[styles.band, { backgroundColor: bg, opacity: 0.15 }]} />
      <View style={[styles.band, { backgroundColor: bg, opacity: 0.35 }]} />
      <View style={[styles.band, { backgroundColor: bg, opacity: 0.55 }]} />
      <View style={[styles.band, { backgroundColor: bg, opacity: 0.75 }]} />
      <View style={[styles.band, { backgroundColor: bg, opacity: 0.9 }]} />
      <View style={[styles.band, { backgroundColor: bg, opacity: 1 }]} />
    </View>
  );
}

const TAB_BOTTOM = Platform.OS === "ios" ? 88 : 80; // tab bar height + bottom offset

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_BOTTOM + 24,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  band: {
    flex: 1,
  },
});
