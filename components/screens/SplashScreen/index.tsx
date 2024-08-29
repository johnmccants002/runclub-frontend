import React from "react";
import { View, StyleSheet } from "react-native";
import AnimatedLetter from "../../animated/AnimatedLetter";
import AnimatedIcon from "../../animated/AnimatedIcon";
import { palette } from "../../../constants/Colors";

const SplashScreen = () => {
  const appName = "916 RUN CLUB";

  return (
    <View style={styles.container}>
      <View style={styles.letterContainer}>
        {appName.split("").map((letter, index) => (
          <AnimatedLetter
            key={index.toString()}
            letter={letter}
            index={index}
          />
        ))}
      </View>
      <AnimatedIcon
        name="directions-run"
        size={48}
        color="white"
        delay={1000}
      />
    </View>
  );
};
const colorScheme = {
  primary: "#03045e", // Cobalt Blue
  secondary: "#0077b6",
  accent: "#00b4d8", // Coral
  background: "#90e0ef", // Pale Silver
  text: "#caf0f8", // Gunmetal
  error: "#FF6347", // Tomato Red
};

const newScheme = {
  lightBlue: "#1a8cc7",
  darkBlue: "#0077b6",
  mainBlue: "#008dcf",
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.darkCharcoal,
    padding: 20,
    flex: 1,
    zIndex: 2,
  },
  letterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.darkCharcoal,
    padding: 20,
    zIndex: 1,
  },
});

export default SplashScreen;
