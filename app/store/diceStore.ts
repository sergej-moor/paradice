import { create } from "zustand";
import { DiceRoll } from "../types/dice";

interface DiceState {
  history: DiceRoll[];
  isRolling: boolean;
  currentRoll: number | null;
  addRoll: (roll: DiceRoll) => void;
  setIsRolling: (isRolling: boolean) => void;
  setCurrentRoll: (roll: number) => void;
  clearHistory: () => void;
}

export const useDiceStore = create<DiceState>((set) => ({
  history: [],
  isRolling: false,
  currentRoll: null,
  addRoll: (roll) =>
    set((state) => ({
      history: [roll, ...state.history].slice(0, 50),
    })),
  setIsRolling: (isRolling) => set({ isRolling }),
  setCurrentRoll: (roll) => set({ currentRoll: roll }),
  clearHistory: () => set({ history: [] }),
}));
