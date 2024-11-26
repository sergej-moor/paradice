import { create } from "zustand";
import { DiceRoll } from "../types/dice";

interface DiceState {
  history: DiceRoll[];
  isRolling: boolean;
  isCharging: boolean;
  currentRoll: number | null;
  addRoll: (roll: DiceRoll) => void;
  setIsRolling: (isRolling: boolean) => void;
  setIsCharging: (isCharging: boolean) => void;
  setCurrentRoll: (roll: number) => void;
  clearHistory: () => void;
}

export const useDiceStore = create<DiceState>((set) => ({
  history: [],
  isRolling: false,
  isCharging: false,
  currentRoll: null,
  addRoll: (roll) =>
    set((state) => ({
      history: [roll, ...state.history].slice(0, 50),
    })),
  setIsRolling: (isRolling) => set({ isRolling }),
  setIsCharging: (isCharging) => set({ isCharging }),
  setCurrentRoll: (roll) => set({ currentRoll: roll }),
  clearHistory: () => set({ history: [] }),
}));
