import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { palette } from "../../../constants/Colors";

const StaticSplashScreen = () => {
  const appName = "916 RUN CLUB";

  return (
    <View style={styles.container}>
      <View style={styles.letterContainer}>
        {appName.split("").map((letter, index) => (
          <View key={index} style={{ marginHorizontal: 2 }}>
            <Text style={styles.letter}>{letter}</Text>
          </View>
        ))}
      </View>

      <MaterialIcons name="directions-run" size={48} color="white" />
    </View>
  );
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
  letter: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default StaticSplashScreen;
