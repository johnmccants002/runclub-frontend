import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";

type Props = {};

const Layout = (props: Props) => {
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
