/**
 * CAOIM Church — Color System
 * Bold blue & pink palette with soft pastels for light & dark modes.
 */

// CAOIM Church Color Palette — bold blue / vibrant pink
const tintColorLight = "#203F9A"; // Bold Blue
const tintColorDark = "#94C2DA"; // Pastel Blue

export const Colors = {
  light: {
    text: "#1A1A2E",
    textSecondary: "#6B7494",
    background: "#EFE8E0", // Light Beige
    tint: tintColorLight,
    icon: "#203F9A",
    tabIconDefault: "#9CA3AF",
    tabIconSelected: tintColorLight,
    accent: "#E84797", // Bold Pink
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    secondary: "#4E7CB2", // Muted Blue
    cardBg: "#FFFFFF",
    cardBgElevated: "#F5F0EB",
    border: "#DDD5CC",
    filterBg: "#F5F0EB",
    filterActiveBg: tintColorLight,
    buttonBg: "#E84797", // Pink CTA
    buttonText: "#FFFFFF",
    overlay: "rgba(32, 63, 154, 0.06)",
    bentoLarge: "#D4E6F1", // Soft pastel blue cards
    bentoMedium: "#F5F0EB", // Warm beige cards
    bentoSmall: "#FFFFFF",
    bentoAccent: "#E84797", // Pink accent
    greeting: "#203F9A",
    tabBarBg: "#FFFFFF",
    tabBarBorder: "#DDD5CC",
    pastelPink: "#E7A0CC", // Pastel Pink
    pastelBlue: "#94C2DA", // Pastel Blue
    mutedBlue: "#4E7CB2", // Muted Blue
  },
  dark: {
    text: "#F5F0EB",
    textSecondary: "#A0AEC0",
    background: "#0F1629", // Deep navy
    tint: tintColorDark,
    icon: "#94C2DA",
    tabIconDefault: "#6B7280",
    tabIconSelected: tintColorDark,
    accent: "#E7A0CC", // Pastel Pink
    success: "#34D399",
    warning: "#FBBF24",
    error: "#F87171",
    secondary: "#94C2DA",
    cardBg: "#1A2340", // Dark navy card
    cardBgElevated: "#222E4A",
    border: "#2D3A5C",
    filterBg: "#1A2340",
    filterActiveBg: tintColorDark,
    buttonBg: "#E84797", // Pink CTA
    buttonText: "#FFFFFF",
    overlay: "rgba(148, 194, 218, 0.08)",
    bentoLarge: "#1E2D50",
    bentoMedium: "#1A2340",
    bentoSmall: "#1A2340",
    bentoAccent: "#E7A0CC", // Pastel Pink accent
    greeting: "#94C2DA",
    tabBarBg: "#1A2340",
    tabBarBorder: "#2D3A5C",
    pastelPink: "#E7A0CC",
    pastelBlue: "#94C2DA",
    mutedBlue: "#4E7CB2",
  },
};

export const Fonts = {
  regular: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  semiBold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
  extraBold: "Poppins_800ExtraBold",
  black: "Poppins_900Black",
  italic: "Poppins_400Regular_Italic",
};
