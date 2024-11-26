import { DiceType } from "../types/dice";

export const DICE_TYPES: DiceType[] = [4, 6, 8, 10, 12, 20];

export const DICE_COLORS = {
  4: "#EF4444", // red
  6: "#3B82F6", // blue
  8: "#10B981", // green
  10: "#F59E0B", // yellow
  12: "#8B5CF6", // purple
  20: "#EC4899", // pink
} as const;

export const MAX_HISTORY_ITEMS = 50;
