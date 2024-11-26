import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { DICE_COLORS } from "../constants/diceConstants";
import { useDiceStore } from "../store/diceStore";
import { DiceType } from "../types/dice";
import { rollDice, triggerRollHaptics } from "../utils/diceUtils";

interface DiceButtonProps {
  type: DiceType;
}

export function DiceButton({ type }: DiceButtonProps) {
  const { addRoll, setIsRolling, setCurrentRoll, setIsCharging, isRolling } =
    useDiceStore();
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  const startRotationAnimation = () => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 250,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  };

  const handlePressIn = () => {
    if (isRolling) return;

    setIsCharging(true);
    startRotationAnimation();
    scale.value = withSpring(0.9);
  };

  const handlePressOut = async () => {
    if (isRolling) return;

    setIsCharging(false);
    scale.value = withSpring(0.9); // Keep the scale down during roll

    await triggerRollHaptics();
    const result = rollDice(type);
    setIsRolling(true);
    setCurrentRoll(result);
    addRoll({
      id: Date.now().toString(),
      type,
      result,
      timestamp: Date.now(),
    });

    // The rotation will continue until isRolling becomes false
  };

  // Watch for isRolling changes to stop the animation
  useEffect(() => {
    if (!isRolling) {
      cancelAnimation(rotation);

      const currentRotation = rotation.value % 360;
      const targetRotation = currentRotation > 180 ? 360 : 0;

      rotation.value = withTiming(
        targetRotation,
        {
          duration: 300,
          easing: Easing.out(Easing.cubic),
        },
        () => {
          rotation.value = 0;
        }
      );

      scale.value = withSpring(1);
    }
  }, [isRolling]);

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="w-24 h-24 rounded-xl justify-center items-center relative overflow-hidden"
        style={{ backgroundColor: DICE_COLORS[type] }}
      >
        {isRolling && <View className="absolute inset-0 bg-black/50 z-10" />}

        <View className="items-center">
          <Text
            className={`text-2xl font-bold text-white ${
              isRolling ? "opacity-50" : ""
            }`}
          >
            d{type}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
