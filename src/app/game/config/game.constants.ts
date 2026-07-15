import Phaser from 'phaser';
import { GameConfiguration } from '../../core/models/game-configuration.model';

export const defaultGameConfiguration: GameConfiguration = {
  hydrationDecaySeconds: 3,
  hydrationDecayAmount: 1,
  energyDecaySeconds: 3,
  energyDecayAmount: 1,
  dropHydrationValue: 10,
  dropScoreValue: 10,
  finishScoreValue: 100,
  hydrationBonusValue: 50,
  maxHydration: 100,
  maxEnergy: 100,
  targetDurationSeconds: 180,
};

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: '#7dd3fc',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 900, x: 0 },
      debug: false,
    },
  },
};
