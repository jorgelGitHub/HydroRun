export type RewardLevel =
  | 'hidratacion-excelente'
  | 'buena-hidratacion'
  | 'hidratacion-aceptable'
  | 'sigue-practicando';

export interface ScoreResult {
  playerName: string;
  age: number;
  totalScore: number;
  elapsedSeconds: number;
  dropsCollected: number;
  finalHydration: number;
  finalEnergy: number;
  rewardLevel: RewardLevel;
  medalLabel: string;
  completedAt: string;
}
