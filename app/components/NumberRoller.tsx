import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useDiceStore } from "../store/diceStore";

export function NumberRoller() {
  const translateY = useSharedValue(0);
  const isRolling = useDiceStore((state) => state.isRolling);
  const isCharging = useDiceStore((state) => state.isCharging);
  const currentRoll = useDiceStore((state) => state.currentRoll);
  const setIsRolling = useDiceStore((state) => state.setIsRolling);

  const ITEM_HEIGHT = 60;
  const NUMBERS = Array.from({ length: 20 }, (_, i) => i + 1);
  const TOTAL_HEIGHT = ITEM_HEIGHT * NUMBERS.length;

  useEffect(() => {
    if (isCharging) {
      translateY.value = withRepeat(
        withTiming(-TOTAL_HEIGHT, {
          duration: 500,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    } else if (isRolling && currentRoll) {
      const targetPosition = -(ITEM_HEIGHT * (currentRoll - 1));
      const minimumRotations = 2;
      const currentPosition = translateY.value % TOTAL_HEIGHT;
      const startingRotation =
        -TOTAL_HEIGHT * minimumRotations + currentPosition;

      translateY.value = withSequence(
        // First phase: continue spinning
        withTiming(
          startingRotation,
          {
            duration: 500,
            easing: Easing.linear,
          },
          // Set isRolling to false right before the spring animation starts
          () => {
            runOnJS(setIsRolling)(false);
          }
        ),
        // Second phase: spring to target
        withSpring(targetPosition, {
          damping: 15,
          stiffness: 90,
          mass: 0.5,
        })
      );
    } else if (!isCharging && !isRolling && currentRoll === null) {
      cancelAnimation(translateY);
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [isCharging, isRolling, currentRoll]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Set initial position
  useEffect(() => {
    if (currentRoll && !isRolling && !isCharging) {
      translateY.value = -(ITEM_HEIGHT * (currentRoll - 1));
    }
  }, []);

  return (
    <View className="h-[60px] overflow-hidden bg-slate-800/50 rounded-xl mb-8">
      <Animated.View style={animatedStyle}>
        {/* Add more duplicate numbers for smoother transitions */}
        {[...NUMBERS, ...NUMBERS, ...NUMBERS].map((num, index) => (
          <View
            key={`${num}-${index}`}
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
