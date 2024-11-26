import { StatusBar } from "expo-status-bar";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { DICE_COLORS } from "./constants/diceConstants";
import { useDiceStore } from "./store/diceStore";
import { formatDistanceToNow } from "./utils/dateUtils";

export default function HistoryScreen() {
  const { history, clearHistory } = useDiceStore();

  return (
    <SafeAreaView className="flex-1 bg-slate-900 pt-16">
      <StatusBar style="light" />
      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-white">
              Roll History
            </Text>
            {history.length > 0 && (
              <Pressable
                onPress={clearHistory}
                className="px-3 py-1 bg-red-500 rounded-full"
              >
                <Text className="text-white">Clear</Text>
              </Pressable>
            )}
          </View>

          {history.length === 0 ? (
            <View className="mt-8 items-center">
              <Text className="text-gray-400">No rolls yet</Text>
            </View>
          ) : (
            history.map((roll) => (
              <Animated.View
                key={roll.id}
                entering={FadeInUp}
                exiting={FadeOutDown}
                className="p-4 rounded-lg mb-2 flex-row justify-between items-center"
                style={{ backgroundColor: `${DICE_COLORS[roll.type]}20` }}
              >
                <View className="flex-row items-center">
                  <View
                    className="w-8 h-8 rounded-full mr-3 items-center justify-center"
                    style={{ backgroundColor: DICE_COLORS[roll.type] }}
                  >
                    <Text className="text-white font-bold">{roll.result}</Text>
                  </View>
                  <Text className="text-white text-lg">d{roll.type}</Text>
                </View>
                <Text className="text-gray-400 text-sm">
                  {formatDistanceToNow(roll.timestamp)}
                </Text>
              </Animated.View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
