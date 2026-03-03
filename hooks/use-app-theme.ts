import { Colors } from "@/constants/theme";
import { useThemeToggle } from "@/hooks/use-theme-toggle";

/**
 * Returns the resolved color palette for the current theme.
 * Uses the manual toggle context (supports dark/light switch button).
 */
export function useAppTheme() {
  const { isDark } = useThemeToggle();
  return {
    isDark,
    ...(isDark ? Colors.dark : Colors.light),
  };
}
