export type GameStatus = 'idle' | 'running' | 'paused' | 'victory' | 'defeat';

export interface GameState {
  status: GameStatus;
  hydration: number;
  energy: number;
  score: number;
  dropsCollected: number;
  elapsedSeconds: number;
  penalties: number;
  progress: number;
  lastCheckpointId: string;
}
