export interface GameConfiguration {
  hydrationDecaySeconds: number;
  hydrationDecayAmount: number;
  energyDecaySeconds: number;
  energyDecayAmount: number;
  dropHydrationValue: number;
  dropScoreValue: number;
  finishScoreValue: number;
  hydrationBonusValue: number;
  maxHydration: number;
  maxEnergy: number;
  targetDurationSeconds: number;
}
