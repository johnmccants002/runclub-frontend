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
          headerStyle: { backgroundColor: "white" },
          headerTitleStyle: { color: "black" },

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
        name="settings"
        options={{
          headerBackTitleVisible: false,
          headerTitle: "",
          headerStyle: { backgroundColor: "white" },
        }}
      />
      <Stack.Screen
        name="gallery/index"
        options={{
          headerStyle: { backgroundColor: "white" },
          title: "Gallery List",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="gallery/[id]"
        options={{
          headerStyle: { backgroundColor: "white" },
          title: "Events",
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
