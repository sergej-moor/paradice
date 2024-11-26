import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useDiceStore } from "../store/diceStore";

export function NumberRoller() {
  const translateY = useSharedValue(0);
  const isRolling = useDiceStore((state) => state.isRolling);
  const currentRoll = useDiceStore((state) => state.currentRoll);
  const setIsRolling = useDiceStore((state) => state.setIsRolling);

  // Height of each number in the sequence
  const ITEM_HEIGHT = 60;
  // Total numbers (1-20)
  const NUMBERS = Array.from({ length: 20 }, (_, i) => i + 1);

  useEffect(() => {
    if (isRolling && currentRoll) {
      // Calculate final position based on the rolled number
      const targetPosition = -(ITEM_HEIGHT * (currentRoll - 1));

      // Animate through several rotations before landing on the number
      translateY.value = withSequence(
        // First, do 2 full rotations quickly
        withTiming(-(ITEM_HEIGHT * NUMBERS.length * 2), {
          duration: 1000,
        }),
        // Then slow down and land on the target number
        withSpring(
          targetPosition,
          {
            damping: 15,
            stiffness: 90,
          },
          () => {
            // After animation completes, reset rolling state
            runOnJS(setIsRolling)(false);
          }
        )
      );
    }
  }, [isRolling, currentRoll]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View className="h-[60px] overflow-hidden bg-slate-800/50 rounded-xl mb-8">
      <Animated.View style={animatedStyle}>
        {NUMBERS.map((num) => (
          <View
            key={num}
            style={{ height: ITEM_HEIGHT }}
            className="items-center justify-center"
          >
            <Text className="text-4xl font-bold text-white">{num}</Text>
          </View>
        ))}
        {/* Duplicate numbers for seamless animation */}
        {NUMBERS.map((num) => (
          <View
            key={`duplicate-${num}`}
            style={{ height: ITEM_HEIGHT }}
            className="items-center justify-center"
          >
            <Text className="text-4xl font-bold text-white">{num}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}
