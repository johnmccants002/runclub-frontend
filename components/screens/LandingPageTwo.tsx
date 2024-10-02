import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AnimatedText from "../../components/animated/AnimatedText";
import { defaultStyles } from "../../constants/Styles";
import { Link } from "expo-router";
import AnimatedSlideText from "../../components/animated/AnimateSlideText";
import { Colors } from "../../constants/Colors";
import SplashScreen from "./SplashScreen";

type Props = {};

const LandingScreen = (props: Props) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 3000);
  }, []);

  const phrases = ["More Exercise", "More Friends", "More Vibes"];

  return (
    <View style={styles.container}>
      {showContent ? (
        <>
          <View style={styles.textContainer}>
            {phrases.map((phrase, index) => (
              <AnimatedText key={index} text={phrase} index={index} />
            ))}
          </View>

          <AnimatedSlideText text="916 RUN CLUB" />

          <View style={styles.buttons}>
            <Link
              href={"/login"}
              style={[
                defaultStyles.pillButton,
                { flex: 1, backgroundColor: Colors.primary.dark },
              ]}
              asChild
            >
              <TouchableOpacity>
                <Text
                  style={{ color: "white", fontSize: 22, fontWeight: "500" }}
                >
                  Log in
                </Text>
              </TouchableOpacity>
            </Link>
            <Link
              href={"/signup"}
              style={[
                defaultStyles.pillButton,
                { flex: 1, backgroundColor: "#fff" },
              ]}
              asChild
            >
              <TouchableOpacity>
                <Text style={{ fontSize: 22, fontWeight: "500" }}>Sign up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </>
      ) : (
        <SplashScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "darkgray", // Changed background color to dark gray
  },
  textContainer: {
    marginTop: 80,
    padding: 20,
    zIndex: 2,
    height: Dimensions.get("screen").height - 400,
  },
  header: {
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "white",
  },
  reportCallHeader: {
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "white",
    padding: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
});

export default LandingScreen;
