import { Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useNotificationObserver } from "@/hooks/useNotificationObserver";
import useAuthStore from "@/stores/auth";

export default function TabLayout() {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  useNotificationObserver();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(auth)/landing");
    }
  }, [isAuthenticated]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
        tabBarStyle: { backgroundColor: "white" },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Feed",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
