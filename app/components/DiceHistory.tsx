import { Text, View } from "react-native";
import { useDiceStore } from "../store/diceStore";

export function DiceHistory() {
  const history = useDiceStore((state) => state.history);

  if (history.length === 0) {
    return null;
  }

  // Get the last roll
  const lastRoll = history[0];

  return (
    <View className="mt-4 items-center">
      <Text className="text-gray-400">
        Last roll: d{lastRoll.type} → {lastRoll.result}
      </Text>
    </View>
  );
}
