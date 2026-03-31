import { Fonts } from "@/constants/theme";
import { Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useUser } from "@/hooks/use-user";
import { useThemeToggle } from "@/hooks/use-theme-toggle";

export default function TabLayout() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useUser();
  const { colorScheme } = useThemeToggle();
  const theme = Colors[colorScheme ?? "light"];

  useEffect(() => {
    // Extra guard for Expo Go/dev where navigation state can persist.
    // If user is not authenticated, do not allow access to tabs.
    if (isLoading) return;
    if (!isLoggedIn) {
      router.replace("/auth");
    }
  }, [isLoggedIn, isLoading, router]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: theme.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "ios" ? 24 : 16,
          left: 20,
          right: 20,
          height: 64,
          backgroundColor: theme.tabBarBg,
          borderRadius: 32,
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: theme.tabBarBorder,
          elevation: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          paddingBottom: 0,
          paddingHorizontal: 8,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: Fonts.semiBold,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="live-stream"
        options={{
          title: "Live",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="video.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="updates"
        options={{
          title: "Media",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="play.circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
