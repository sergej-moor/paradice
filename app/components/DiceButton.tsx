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
  const addRoll = useDiceStore((state) => state.addRoll);
  const scale = useSharedValue(1);
  const history = useDiceStore((state) => state.history);

  // Get the last roll for this dice type
  const lastRoll = history.find((roll) => roll.type === type);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = async () => {
    // Button press animation
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
        className="w-24 h-24 rounded-xl justify-center items-center"
        style={{ backgroundColor: DICE_COLORS[type] }}
      >
        <View className="items-center">
          <Text className="text-2xl font-bold text-white">d{type}</Text>
          {lastRoll && (
            <Text className="text-sm text-white/80 mt-1">
              {lastRoll.result}
            </Text>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}
