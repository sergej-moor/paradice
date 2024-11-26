import { create } from "zustand";
import { DiceRoll, SavedCombination } from "../types/dice";

interface DiceState {
  history: DiceRoll[];
  savedCombinations: SavedCombination[];
  addRoll: (roll: DiceRoll) => void;
  saveCombination: (combination: SavedCombination) => void;
  clearHistory: () => void;
}

export const useDiceStore = create<DiceState>((set) => ({
  history: [],
  savedCombinations: [],
  addRoll: (roll) =>
    set((state) => ({
      history: [roll, ...state.history].slice(0, 50),
    })),
  saveCombination: (combination) =>
    set((state) => ({
      savedCombinations: [...state.savedCombinations, combination],
    })),
  clearHistory: () => set({ history: [] }),
}));
