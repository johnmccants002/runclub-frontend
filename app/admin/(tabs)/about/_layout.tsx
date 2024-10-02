import { palette } from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";

type Props = {};

const Layout = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="contact"
        options={{
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTitle: "Contact Us",
        }}
      />
      <Stack.Screen
        name="aboutus"
        options={{
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="members"
        options={{
          headerBackTitleVisible: false,
          headerTitle: "Members",
          headerStyle: { backgroundColor: "white" },
          headerTitleStyle: { color: "black" },
        }}
      />
      <Stack.Screen
        name="pending-members"
        options={{
          headerBackTitleVisible: false,
          headerTitle: "Pending",
          headerStyle: { backgroundColor: "white" },
          headerTitleStyle: { color: "black" },
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerBackTitleVisible: false,
          headerTitle: "",
          headerStyle: { backgroundColor: palette.offWhite },
          headerTitleStyle: { color: "black" },
        }}
      />
      <Stack.Screen name="qr-code-scanner" options={{ headerTitle: "" }} />
    </Stack>
  );
};

export default Layout;
