import React, { ReactNode, useEffect, useRef } from "react";
import { View, Animated, StyleSheet, ViewStyle } from "react-native";

// Define the props type for the SlideUpViewContainer
interface SlideUpViewContainerProps {
  children: ReactNode; // This allows any React children to be passed in
  duration?: number; // Optional prop to control animation duration
  style?: ViewStyle;
}

const SlideUpViewContainer: React.FC<SlideUpViewContainerProps> = ({
  children,
  duration = 500,
  style,
}) => {
  const slideAnim = useRef(new Animated.Value(10)).current; // Start 150 pixels below
  const opacAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      slideAnim, // The animated value to drive
      {
        toValue: 0, // Move to the final position at 0
        duration: 500, // Use the duration passed in props, or default to 1000
        useNativeDriver: true, // Using native driver for better performance
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
    <Animated.View
      style={[
        { transform: [{ translateY: slideAnim }], opacity: opacAnim },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};
export default SlideUpViewContainer;
