import { Stack } from "expo-router";
import React from "react";

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
        name="events/[id]"
        options={{
          title: `Event`,
          header: () => <></>,
          headerTintColor: "black",
        }}
      />
    </Stack>
  );
};

export default Layout;
