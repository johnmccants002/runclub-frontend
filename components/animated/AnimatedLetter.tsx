// AnimatedLetter.tsx
import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";

interface AnimatedLetterProps {
  letter: string;
  index: number; // position of the letter in the word
}

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({ letter, index }) => {
  // Initial value for opacity is 0 - letter is invisible
  // Initial rotationY is 90 degrees - letter is perpendicular to the view
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the animation with a delay based on the letter's index
    Animated.timing(animatedValue, {
      toValue: 1, // End at a fully visible and no rotation state
      duration: 500, // Duration of the animation
      useNativeDriver: true, // Use native driver for better performance
      delay: index * 100, // Delay based on index to animate letters one after the other
    }).start();
  }, [index, animatedValue]);

  const rotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["90deg", "0deg"], // Rotate from 90 degrees to 0
  });

  return (
    <Animated.View
      style={{
        ...styles.letterContainer,
        opacity: animatedValue, // Animate opacity
        transform: [{ rotateY: rotation }], // Animate rotation
      }}
    >
      <Text style={styles.letter}>{letter}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  letterContainer: {
    marginHorizontal: 2, // Spacing between letters
  },
  letter: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default AnimatedLetter;
