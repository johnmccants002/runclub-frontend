// AnimatedIcon.tsx
import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface AnimatedIconProps {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  size?: number;
  color?: string;
  delay?: number; // Optional delay before the animation starts
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  name,
  size = 40,
  color = "white",
  delay = 0,
}) => {
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const slideDown = Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      delay: 1400,
    });

    // Rotate sequence for a "ringing phone" effect, rotating clockwise and counterclockwise
    const shake = Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: -1,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 4 } // Loop the shaking sequence 4 times
    );

    Animated.sequence([slideDown, shake]).start();
  }, [delay, slideAnim, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-5deg", "5deg"], // Adjust the degrees for more or less rotation
  });

  return (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }, { rotateZ: rotation }],
      }}
    >
      <MaterialIcons name={name} size={size} color={color} />
    </Animated.View>
  );
};

export default AnimatedIcon;
