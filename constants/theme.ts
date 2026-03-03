/**
 * CAOIM Church — Color System
 * Warm, modern bento-style palette for light & dark modes.
 */

import { Platform } from "react-native";

// CAOIM Church Color Palette — warm amber / deep purple
const tintColorLight = "#E8842C";
const tintColorDark = "#F5A623";

export const Colors = {
  light: {
    text: "#1C1917",
    textSecondary: "#78716C",
    background: "#FFF8F0",
    tint: tintColorLight,
    icon: "#E8842C",
    tabIconDefault: "#A8A29E",
    tabIconSelected: tintColorLight,
    accent: "#6B4CE6",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    secondary: "#D97706",
    cardBg: "#FFFFFF",
    cardBgElevated: "#FFF1E0",
    border: "#F5E6D3",
    filterBg: "#FFF1E0",
    filterActiveBg: tintColorLight,
    buttonBg: tintColorLight,
    buttonText: "#FFFFFF",
    overlay: "rgba(232, 132, 44, 0.06)",
    bentoLarge: "#FDE8D0",
    bentoMedium: "#FFF1E0",
    bentoSmall: "#FFFFFF",
    bentoAccent: "#6B4CE6",
    greeting: "#E8842C",
    tabBarBg: "#FFFFFF",
    tabBarBorder: "#F5E6D3",
  },
  dark: {
    text: "#FAFAF9",
    textSecondary: "#A8A29E",
    background: "#0C0A09",
    tint: tintColorDark,
    icon: "#F5A623",
    tabIconDefault: "#6B7280",
    tabIconSelected: tintColorDark,
    accent: "#A78FFF",
    success: "#34D399",
    warning: "#FBBF24",
    error: "#F87171",
    secondary: "#F5A623",
    cardBg: "#1C1917",
    cardBgElevated: "#292524",
    border: "#3D3530",
    filterBg: "#292524",
    filterActiveBg: tintColorDark,
    buttonBg: tintColorDark,
    buttonText: "#0C0A09",
    overlay: "rgba(245, 166, 35, 0.08)",
    bentoLarge: "#292524",
    bentoMedium: "#1C1917",
    bentoSmall: "#1C1917",
    bentoAccent: "#A78FFF",
    greeting: "#F5A623",
    tabBarBg: "#1C1917",
    tabBarBorder: "#3D3530",
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
