import useAuthStore from "@/stores/auth";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";

type Props = {};

const Layout = () => {
  const router = useRouter();

  const isAdmin = useAuthStore((state) => state.isAdmin);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAdmin && isAuthenticated) {
      router.replace("/admin/");
    } else if (!isAdmin && isAuthenticated) {
      router.replace("/(tabs)/");
    }
  }, [isAdmin, isAuthenticated]);

  return (
    <Stack>
      <Stack.Screen name="landing" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.primary.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons
                name="arrow-back"
                size={34}
                color={Colors.primary.dark}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "white" },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons
                name="arrow-back"
                size={34}
                color={Colors.primary.dark}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.primary.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons
                name="arrow-back"
                size={34}
                color={Colors.primary.dark}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
