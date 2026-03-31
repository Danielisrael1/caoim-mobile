import BrandSplash from "@/components/brand-splash";
import OnboardingScreen from "@/components/onboarding-screen";
import { Colors } from "@/constants/theme";
import { useOnboarding } from "@/hooks/use-onboarding";
import { UserProvider, useUser } from "@/hooks/use-user";
import { ThemeToggleProvider, useThemeToggle } from "@/hooks/use-theme-toggle";
import {
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
} from "@expo-google-fonts/poppins";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import "react-native-reanimated";

function RootInner() {
  const { colorScheme } = useThemeToggle();
  const {
    isLoading: onboardingLoading,
    isOnboarded,
    completeOnboarding,
  } = useOnboarding();
  const { isLoading: authLoading, isLoggedIn } = useUser();
  const [showSplash, setShowSplash] = useState(true);
  const theme = Colors[colorScheme ?? "light"];

  useEffect(() => {
    if (Platform.OS !== "android") return;

    // Hide Android system navigation buttons (immersive mode).
    // Note: users can usually reveal system bars with an edge swipe.
    NavigationBar.setVisibilityAsync("hidden").catch(() => {});
    NavigationBar.setBehaviorAsync("overlay-swipe").catch(() => {});
  }, []);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  // Wait for fonts
  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.tint} />
      </View>
    );
  }

  // Show branded splash on every app launch
  if (showSplash) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <BrandSplash onFinish={() => setShowSplash(false)} />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Still loading onboarding or auth state from storage
  if (onboardingLoading || authLoading) {
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

  // After onboarding, require auth once
  if (!isLoggedIn) {
    return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
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
        <Stack.Screen
          name="giving"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
          name="profile"
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeToggleProvider>
      <UserProvider>
        <RootInner />
      </UserProvider>
    </ThemeToggleProvider>
  );
}
