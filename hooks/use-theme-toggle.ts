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

const THEME_STORAGE_KEY = "@caoim_theme_preference";

interface ThemeCtx {
  colorScheme: ColorScheme;
  isDark: boolean;
  toggle: () => void;
}

const ThemeToggleContext = createContext<ThemeCtx>({
  colorScheme: "light",
  isDark: false,
  toggle: () => {},
});

/**
 * Wrap your app in <ThemeToggleProvider> so every screen can call useThemeToggle().
 *
 * On first install the system appearance is used.
 * After the user taps the toggle, their choice is persisted to AsyncStorage
 * and used for all future launches.
 */
export function ThemeToggleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const system = (useSystemScheme() ?? "light") as ColorScheme;
  const [scheme, setScheme] = useState<ColorScheme>(system);
  const [loaded, setLoaded] = useState(false);

  // On mount, read saved preference (if any)
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (saved === "light" || saved === "dark") {
          setScheme(saved);
        }
        // else: no saved pref → keep system default (already set)
      } catch {
        // ignore
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const toggle = useCallback(() => {
    setScheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      AsyncStorage.setItem(THEME_STORAGE_KEY, next).catch(() => {});
      return next;
    });
  }, []);

  const value = React.useMemo(
    () => ({ colorScheme: scheme, isDark: scheme === "dark", toggle }),
    [scheme, toggle],
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
