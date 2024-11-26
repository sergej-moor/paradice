import * as Haptics from "expo-haptics";
import { DiceType } from "../types/dice";

export const rollDice = (type: DiceType): number => {
  return Math.floor(Math.random() * type) + 1;
};

export const triggerRollHaptics = async () => {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

export const triggerPressHaptics = async () => {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};
