import { Tabs, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import useAuthStore from "@/stores/auth";
import ScannerButton from "@/components/ScannerButton";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);
  const segments = useSegments();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(auth)/landing");
    }
  }, [isAuthenticated]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: { backgroundColor: "white" },
      }}
    >
      <Tabs.Screen
        name="(feed)"
        options={{
          title: "Feed",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "menu" : "menu-outline"}
              color={color}
            />
          ),
          headerShown: false,
          tabBarStyle: {
            display: segments[3] === "create-event" ? "none" : "flex",
          },
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "Run Club",

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "fitness" : "fitness-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Modal"
        options={{ tabBarButton: () => <ScannerButton /> }}
      />
    </Tabs>
  );
}
