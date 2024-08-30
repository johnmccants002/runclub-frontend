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
        }}
      />
    </Stack>
  );
};

export default Layout;
