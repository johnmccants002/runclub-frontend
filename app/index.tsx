import LandingScreenTwo from "@/components/screens/LandingPageTwo";
import LandingScreen from "@/components/screens/LandingScreen";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import useAuthStore from "../stores/auth"; // Adjust the path to your auth store

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
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    checkAuth();
  }, [initializeAuth, user]);

  return (
    <>
      {isAuthenticated && user.isAdmin ? (
        <Redirect href={"/admin/(tabs)/"} />
      ) : isAuthenticated && !user.isAdmin ? (
        <Redirect href={"/(tabs)/"} />
      ) : (
        <LandingScreen />
      )}
    </>
  );
};

export default Screen;
