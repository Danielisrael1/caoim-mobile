import { Fonts } from "@/constants/theme";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useThemeToggle } from "@/hooks/use-theme-toggle";

export default function TabLayout() {
  const { colorScheme } = useThemeToggle();
  const theme = Colors[colorScheme ?? "light"];

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
      <Tabs.Screen
        name="auth"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
