import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { DiceButton } from "./components/DiceButton";
import { DiceHistory } from "./components/DiceHistory";
import { DICE_TYPES } from "./constants/diceConstants";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <StatusBar style="light" />
      <ScrollView className="flex-1">
        <Animated.View entering={FadeIn.duration(1000)} className="p-4 py-16">
          <Text className="text-3xl font-bold text-white mb-8 text-center">
            Paradice
          </Text>

          <View className="flex-row flex-wrap justify-center gap-4">
            {DICE_TYPES.map((dice) => (
              <DiceButton key={dice} type={dice} />
            ))}
          </View>

          <DiceHistory />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
