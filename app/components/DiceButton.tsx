import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { DICE_COLORS } from "../constants/diceConstants";
import { useDiceStore } from "../store/diceStore";
import { DiceType } from "../types/dice";
import { rollDice, triggerRollHaptics } from "../utils/diceUtils";

interface DiceButtonProps {
  type: DiceType;
}

export function DiceButton({ type }: DiceButtonProps) {
  const { addRoll, setIsRolling, setCurrentRoll, isRolling } = useDiceStore();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = async () => {
    if (isRolling) return; // Prevent rolling while animation is in progress

    // Button press animation
    scale.value = withSpring(0.9, {}, () => {
      scale.value = withSpring(1);
    });

    // Haptic feedback
    await triggerRollHaptics();

    // Roll dice
    const result = rollDice(type);

    // Start rolling animation
    setIsRolling(true);
    setCurrentRoll(result);

    // Add to history
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
        className="w-24 h-24 rounded-xl justify-center items-center"
        style={{ backgroundColor: DICE_COLORS[type] }}
      >
        <View className="items-center">
          <Text className="text-2xl font-bold text-white">d{type}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
