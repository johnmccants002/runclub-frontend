import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter, Link } from "expo-router";
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
            <Link
              href={"/admin/create-event"}
              style={{ alignSelf: "center" }}
              asChild
            >
              <Ionicons name="add-circle" size={32} color={"white"} />
            </Link>
          ),
          headerTitle: "",
        }}
      />
    </Stack>
  );
};

export default Layout;
