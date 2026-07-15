import { RewardLevel } from './score-result.model';

export interface RankingEntry {
  id: string;
  name: string;
  age: number;
  score: number;
  elapsedSeconds: number;
  dropsCollected: number;
  finalHydration: number;
  date: string;
  rewardLevel: RewardLevel;
}
