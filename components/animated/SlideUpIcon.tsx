import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Define the props type for the AnimatedIcon component
type AnimatedIconProps = {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  size: number;
  color: string;
  style?: ViewStyle;
};

const SlideUpIcon: React.FC<AnimatedIconProps> = ({
  name,
  size,
  color,
  style,
}) => {
  const slideAnim = useRef(new Animated.Value(10)).current; // Initial position below the view
  const opacAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      slideAnim, // The animated value to drive
      {
        toValue: 0, // Animate to final position (0 to slide up into view)
        duration: 600, // Duration of the animation
        useNativeDriver: true, // Use native driver for better performance
        delay: 500,
      }
    ).start();
    Animated.timing(
      opacAnim, // The animated value to drive
      {
        toValue: 1, // Animate to final position (0 to slide up into view)
        duration: 600, // Duration of the animation
        useNativeDriver: true, // Use native driver for better performance
        delay: 500,
      }
    ).start();
  }, [slideAnim]);

  return (
    <Animated.View
      style={[
        { transform: [{ translateX: slideAnim }], opacity: opacAnim },
        style,
      ]}
    >
      <MaterialCommunityIcons name={name} size={size} color={color} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SlideUpIcon;
