import BrandSplash from "@/components/brand-splash";
import OnboardingScreen from "@/components/onboarding-screen";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useOnboarding } from "@/hooks/use-onboarding";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View } from "react-native";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isLoading, isOnboarded, completeOnboarding } = useOnboarding();
  const [showSplash, setShowSplash] = useState(true);
  const theme = Colors[colorScheme ?? "light"];

  // Show branded splash on every app launch
  if (showSplash) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <BrandSplash onFinish={() => setShowSplash(false)} />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Still loading onboarding state from storage
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      />
    );
  }

  // Show onboarding for first-time users
  if (!isOnboarded) {
    return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <OnboardingScreen onComplete={completeOnboarding} />
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
