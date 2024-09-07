import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";

import { Pressable, Text } from "react-native";
type Props = {};

const Layout = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: true,

          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="create-announcement"
        options={{ headerTransparent: true, headerTitle: "" }}
      />
    </Stack>
  );
};

export default Layout;
