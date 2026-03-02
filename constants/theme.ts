/**
 * CAOIM Church — Color System
 * Fully themed for light & dark modes.
 */

import { Platform } from "react-native";

// CAOIM Church Color Palette
const tintColorLight = "#6B4CE6";
const tintColorDark = "#A78FFF";

export const Colors = {
  light: {
    text: "#1A1A2E",
    textSecondary: "#64648C",
    background: "#F5F3FF",
    tint: tintColorLight,
    icon: "#6B4CE6",
    tabIconDefault: "#9D9DB0",
    tabIconSelected: tintColorLight,
    accent: "#FF6B9D",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    secondary: "#8B7BA8",
    cardBg: "#FFFFFF",
    cardBgElevated: "#F0ECFF",
    border: "#E5E1F5",
    filterBg: "#EDE9FE",
    filterActiveBg: tintColorLight,
    buttonBg: tintColorLight,
    buttonText: "#FFFFFF",
    overlay: "rgba(107, 76, 230, 0.06)",
  },
  dark: {
    text: "#F0EFF4",
    textSecondary: "#9D9DB0",
    background: "#0D0C18",
    tint: tintColorDark,
    icon: "#A78FFF",
    tabIconDefault: "#6B7280",
    tabIconSelected: tintColorDark,
    accent: "#FF6B9D",
    success: "#34D399",
    warning: "#FBBF24",
    error: "#F87171",
    secondary: "#9F7AEA",
    cardBg: "#1A1930",
    cardBgElevated: "#252442",
    border: "#2E2D4A",
    filterBg: "#252442",
    filterActiveBg: tintColorDark,
    buttonBg: tintColorDark,
    buttonText: "#0D0C18",
    overlay: "rgba(167, 143, 255, 0.08)",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
