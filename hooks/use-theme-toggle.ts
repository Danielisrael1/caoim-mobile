import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { useColorScheme as useSystemScheme } from "react-native";

type ColorScheme = "light" | "dark";
type ThemeMode = "system" | "light" | "dark";

const THEME_STORAGE_KEY = "@caoim_theme_preference";

interface ThemeCtx {
  colorScheme: ColorScheme;
  isDark: boolean;
  /** Cycle: system → light → dark → system */
  toggle: () => void;
  /** Current mode setting */
  mode: ThemeMode;
  /** Set a specific mode */
  setMode: (mode: ThemeMode) => void;
}

const ThemeToggleContext = createContext<ThemeCtx>({
  colorScheme: "light",
  isDark: false,
  toggle: () => {},
  mode: "system",
  setMode: () => {},
});

/**
 * Wrap your app in <ThemeToggleProvider> so every screen can call useThemeToggle().
 *
 * By default the theme follows the user's system setting.
 * The user can override to light / dark, or go back to "system".
 * Their choice is persisted to AsyncStorage.
 */
export function ThemeToggleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const system = (useSystemScheme() ?? "light") as ColorScheme;
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [loaded, setLoaded] = useState(false);

  // Resolved color scheme: system setting or manual override
  const resolvedScheme: ColorScheme = mode === "system" ? system : mode;

  // On mount, read saved preference (if any)
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (saved === "light" || saved === "dark" || saved === "system") {
          setModeState(saved as ThemeMode);
        }
        // else: no saved pref → keep "system" default
      } catch {
        // ignore
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    AsyncStorage.setItem(THEME_STORAGE_KEY, newMode).catch(() => {});
  }, []);

  const toggle = useCallback(() => {
    setModeState((prev) => {
      const next: ThemeMode =
        prev === "system" ? "light" : prev === "light" ? "dark" : "system";
      AsyncStorage.setItem(THEME_STORAGE_KEY, next).catch(() => {});
      return next;
    });
  }, []);

  const value = React.useMemo(
    () => ({
      colorScheme: resolvedScheme,
      isDark: resolvedScheme === "dark",
      toggle,
      mode,
      setMode,
    }),
    [resolvedScheme, toggle, mode, setMode],
  );

  // Don't render children until we've read the persisted preference
  if (!loaded) {
    return null;
  }

  return React.createElement(ThemeToggleContext.Provider, { value }, children);
}

export function useThemeToggle() {
  return useContext(ThemeToggleContext);
}
