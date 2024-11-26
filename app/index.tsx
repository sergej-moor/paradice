import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { DiceButton } from "./components/DiceButton";
import { NumberRoller } from "./components/NumberRoller";
import { DICE_TYPES } from "./constants/diceConstants";

export default function DiceScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-900 pt-16">
      <StatusBar style="light" />
      <ScrollView className="flex-1">
        <Animated.View entering={FadeIn.duration(1000)} className="p-4">
          <Text className="text-3xl font-bold text-white mb-8 text-center">
            Paradice
          </Text>

          <View className="flex flex-col justify-between h-full">
            <View className="flex-row flex-wrap justify-center gap-4">
              {DICE_TYPES.map((dice) => (
                <DiceButton key={dice} type={dice} />
              ))}
            </View>
            <NumberRoller />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
