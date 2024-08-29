import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet, Image, Easing } from "react-native";
import { palette } from "../../constants/Colors";

const FadingImages = () => {
  // Initialize Animated Values for opacity
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence of fade-in animations
    Animated.sequence([
      Animated.timing(fadeAnim1, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim3, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim1, fadeAnim2, fadeAnim3]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("@/assets/images/left.png")} // Replace with your image URL
        style={[styles.image, { opacity: fadeAnim1 }]}
        resizeMode={"contain"}
      />
      <Animated.Image
        source={require("@/assets/images/middle.png")} // Replace with your image URL
        style={[styles.image, { opacity: fadeAnim2 }]}
        resizeMode={"contain"}
      />
      <Animated.Image
        source={require("@/assets/images/right.png")} // Replace with your image URL
        style={[styles.image, { opacity: fadeAnim3 }]}
        resizeMode={"contain"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: palette.offWhite,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});

export default FadingImages;
