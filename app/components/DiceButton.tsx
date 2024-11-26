import { Pressable, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useDiceStore } from "../store/diceStore";
import { DiceType } from "../types/dice";
import { rollDice, triggerRollHaptics } from "../utils/diceUtils";

interface DiceButtonProps {
  type: DiceType;
}

export function DiceButton({ type }: DiceButtonProps) {
  const addRoll = useDiceStore((state) => state.addRoll);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = async () => {
    // Animation
    scale.value = withSpring(0.9, {}, () => {
      scale.value = withSpring(1);
    });

    // Haptic feedback
    await triggerRollHaptics();

    // Roll dice and save to store
    const result = rollDice(type);
    addRoll({
      id: Date.now().toString(),
      type,
      result,
      timestamp: Date.now(),
    });
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handlePress}
        className="w-24 h-24 bg-white rounded-xl justify-center items-center shadow-lg"
      >
        <Text className="text-2xl font-bold text-slate-900">d{type}</Text>
      </Pressable>
    </Animated.View>
  );
}
