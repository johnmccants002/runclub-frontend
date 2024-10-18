import LandingScreen from "@/components/screens/LandingScreen";
import { Redirect } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import useAuthStore from "../stores/auth"; // Adjust the path to your auth store

type Props = {};

const Screen: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const user = useAuthStore((state) => state.user);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const hasInitialized = useRef(false); // Track whether initializeAuth has been called

  useEffect(() => {
    if (!hasInitialized.current) {
      const checkAuth = async () => {
        await initializeAuth();
        setLoading(false);
      };

      checkAuth();
      hasInitialized.current = true; // Mark as initialized
      console.log("THIS IS THE USER", user);
    }
  }, [initializeAuth]);

  if (loading) {
    return null; // Or some loading indicator component
  }

  return (
    <>
      {isAuthenticated && user?.isAdmin ? (
        <Redirect href={"/admin/(tabs)/"} />
      ) : isAuthenticated && !user?.isAdmin ? (
        <Redirect href={"/(tabs)/"} />
      ) : (
        <LandingScreen />
      )}
    </>
  );
};

export default Screen;
