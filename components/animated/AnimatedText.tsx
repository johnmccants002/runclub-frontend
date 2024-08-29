// AnimatedText.tsx
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

interface AnimatedTextProps {
  text: string;
  index: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, index }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      delay: index * 800, // Adjust delay for each text based on its index
    }).start();
  }, [index, animatedValue]);

  const rotateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["90deg", "0deg"], // Rotate around the X-axis for vertical flip
  });

  return (
    <Animated.View
      style={{
        ...styles.container,
        transform: [{ rotateX }],
        opacity: animatedValue, // Fade in the text as it flips
      }}
    >
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backfaceVisibility: "hidden", // Hide the back face of the text during the flip
    marginBottom: 10, // Space between texts
  },
  text: {
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "white",
  },
});

export default AnimatedText;
