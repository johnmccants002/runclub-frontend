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
  const user = useAuthStore((state) => state.user);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  useEffect(() => {
    const checkAuth = async () => {
      await initializeAuth();
      setLoading(false);
    };

    console.log(JSON.stringify(user), "THIS IS THE USER");

    checkAuth();
  }, [initializeAuth, user]);

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
      {isAuthenticated && user.isAdmin ? (
        <Redirect href={"/admin/(tabs)/"} />
      ) : isAuthenticated && !user.isAdmin ? (
        <Redirect href={"/(tabs)/"} />
      ) : (
        <Redirect href={"/(auth)/landing"} />
      )}
    </>
  );
};

export default Screen;
