// AppNameAnimation.tsx
import React from "react";
import { StyleSheet } from "react-native";
import LandingScreen from "../../components/screens/LandingScreen";

const Page = () => {
  return <LandingScreen />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 20,
    flex: 1,
  },
});

export default Page;
