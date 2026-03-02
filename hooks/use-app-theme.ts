import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

/**
 * Returns the resolved color palette for the current theme.
 * Usage: const t = useAppTheme();
 *        t.text, t.cardBg, t.tint, etc.
 */
export function useAppTheme() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  return {
    isDark,
    ...(isDark ? Colors.dark : Colors.light),
  };
}
