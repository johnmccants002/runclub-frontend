import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

// Define the props type for the AnimatedText component
interface AnimatedTextProps {
  text: string;
}

const SlideUpText: React.FC<AnimatedTextProps> = ({ text }) => {
  const slideAnim = useRef(new Animated.Value(10)).current; // Initial position below the view
  const opacAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      slideAnim, // The animated value to drive
      {
        toValue: 0, // Animate to final position (0 to slide up into view)
        duration: 500, // Duration of the animation
        useNativeDriver: true, // Use native driver for better performance
      }
    ).start();
    Animated.timing(
      opacAnim, // The animated value to drive
      {
        toValue: 1, // Animate to final position (0 to slide up into view)
        duration: 500, // Duration of the animation
        useNativeDriver: true, // Use native driver for better performance
      }
    ).start();
  }, [slideAnim]);

  return (
    <Animated.Text
      style={[
        styles.text,
        { transform: [{ translateY: slideAnim }], opacity: opacAnim },
      ]}
    >
      {text}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
  },
});

export default SlideUpText;
