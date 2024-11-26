import { Pressable, Text, View } from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { useDiceStore } from "../store/diceStore";
import { formatDistanceToNow } from "../utils/dateUtils";

export function DiceHistory() {
  const { history, clearHistory } = useDiceStore();

  if (history.length === 0) {
    return (
      <View className="mt-8 items-center">
        <Text className="text-gray-400">No rolls yet</Text>
      </View>
    );
  }

  return (
    <View className="mt-8">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold text-white">History</Text>
        <Pressable
          onPress={clearHistory}
          className="px-3 py-1 bg-red-500 rounded-full"
        >
          <Text className="text-white">Clear</Text>
        </Pressable>
      </View>

      {history.map((roll) => (
        <Animated.View
          key={roll.id}
          entering={FadeInUp}
          exiting={FadeOutDown}
          className="bg-white/10 p-4 rounded-lg mb-2 flex-row justify-between items-center"
        >
          <View className="flex-row items-center">
            <Text className="text-white text-lg font-bold mr-2">
              d{roll.type}:
            </Text>
            <Text className="text-white text-lg">{roll.result}</Text>
          </View>
          <Text className="text-gray-400 text-sm">
            {formatDistanceToNow(roll.timestamp)}
          </Text>
        </Animated.View>
      ))}
    </View>
  );
}
