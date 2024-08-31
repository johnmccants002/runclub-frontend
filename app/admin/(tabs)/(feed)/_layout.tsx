import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";

import { Pressable, Text } from "react-native";
type Props = {};

const Layout = (props: Props) => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: true,
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/admin/(feed)/create-announcement")}
              style={{ alignSelf: "center" }}
            >
              <Ionicons name="add-circle" size={32} color={"white"} />
            </Pressable>
          ),
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
