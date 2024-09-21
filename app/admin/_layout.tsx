import { Slot, Stack } from "expo-router";
import React from "react";
import { useNotificationObserver } from "@/hooks/useNotificationObserver";

type Props = {};

const Layout = (props: Props) => {
  useNotificationObserver();

  return (
    <Stack>
      <Stack.Screen
        name="create-event"
        options={{
          headerStyle: { backgroundColor: "#f8f8f8" },
          headerBackTitleVisible: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
