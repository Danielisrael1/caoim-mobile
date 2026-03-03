import React, { createContext, useCallback, useContext, useState } from "react";
import { useColorScheme as useSystemScheme } from "react-native";

type ColorScheme = "light" | "dark";

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
 */
export function ThemeToggleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const system = (useSystemScheme() ?? "light") as ColorScheme;
  const [scheme, setScheme] = useState<ColorScheme>(system);

  const toggle = useCallback(() => {
    setScheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value = React.useMemo(
    () => ({ colorScheme: scheme, isDark: scheme === "dark", toggle }),
    [scheme, toggle],
  );

  return React.createElement(ThemeToggleContext.Provider, { value }, children);
}

export function useThemeToggle() {
  return useContext(ThemeToggleContext);
}
