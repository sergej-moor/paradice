export type DiceType = 4 | 6 | 8 | 10 | 12 | 20;

export interface DiceRoll {
  id: string;
  type: DiceType;
  result: number;
  timestamp: number;
}

export interface SavedCombination {
  id: string;
  name: string;
  dice: DiceType[];
}
