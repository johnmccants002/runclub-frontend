import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import useAuthStore from "../stores/auth"; // Adjust the path to your auth store
import StaticSplashScreen from "@/components/screens/StaticSplashScreen";
import { palette } from "@/constants/Colors";

type Props = {};

const Screen: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    const checkAuth = async () => {
      await initializeAuth();
      setLoading(false);
    };

    checkAuth();
  }, [initializeAuth]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: palette.darkCharcoal,
        }}
      ></View>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <Redirect href={"/(tabs)/"} />
      ) : (
        <Redirect href={"/(auth)/landing"} />
      )}
    </>
  );
};

export default Screen;
