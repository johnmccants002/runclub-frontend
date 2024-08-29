// AnimatedIcon.tsx
import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";

interface AnimatedIconProps {
  text: string;
  delay?: number; // Optional delay before the animation starts
}

const AnimatedSlideText: React.FC<AnimatedIconProps> = ({
  text,
  delay = 3000,
}) => {
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const opacAnim = useRef(new Animated.Value(0)).current;
  const opacDelay = 4000;

  useEffect(() => {
    // Start both animations at the same time
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0, // End at its natural position
        duration: 1200,
        useNativeDriver: true,
        delay, // Starts after the specified delay
      }),
      Animated.timing(opacAnim, {
        toValue: 1, // Fade in to fully visible
        duration: 1200,
        useNativeDriver: true,
        delay: delay + 500, // Starts at the same time as slideAnim
      }),
    ]).start();
  }, [delay, slideAnim, opacAnim]);

  return (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }],
        opacity: opacAnim,

        zIndex: 1,
      }}
    >
      <Text style={styles.reportCallHeader}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  reportCallHeader: {
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "white",
    padding: 20,
  },
});

export default AnimatedSlideText;
