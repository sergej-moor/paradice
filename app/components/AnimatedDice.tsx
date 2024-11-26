import { useEffect } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

interface AnimatedDiceProps {
  result: number;
  isRolling: boolean;
  onRollComplete: () => void;
}

export function AnimatedDice({
  result,
  isRolling,
  onRollComplete,
}: AnimatedDiceProps) {
  const rotation = useAnimatedStyle(() => ({
    transform: [
      { rotateX: `${Math.random() * 360}deg` },
      { rotateY: `${Math.random() * 360}deg` },
      { rotateZ: `${Math.random() * 360}deg` },
    ],
  }));

  useEffect(() => {
    if (isRolling) {
      // Simulate dice rolling animation
      setTimeout(onRollComplete, 1000);
    }
  }, [isRolling, onRollComplete]);

  return (
    <Animated.View
      style={[rotation]}
      className="w-20 h-20 bg-white rounded-xl justify-center items-center"
    >
      <View className="w-4 h-4 bg-black rounded-full" />
    </Animated.View>
  );
}
