import { Injectable } from '@angular/core';
import { RewardLevel, ScoreResult } from '../models/score-result.model';
import { scoringConfig } from '../../game/config/scoring.config';

interface ScoreInput {
  playerName: string;
  age: number;
  dropsCollected: number;
  reachedGoal: boolean;
  finalHydration: number;
  finalEnergy: number;
  elapsedSeconds: number;
  penalties: number;
}

@Injectable({ providedIn: 'root' })
export class ScoringService {
  calculate(input: ScoreInput): ScoreResult {
    const dropPoints = input.dropsCollected * scoringConfig.dropPoints;
    const goalPoints = input.reachedGoal ? scoringConfig.goalPoints : 0;
    const hydrationBonus =
      input.finalHydration > scoringConfig.hydrationBonusThreshold
        ? scoringConfig.hydrationBonus
        : 0;
    const timeBonus = Math.max(0, scoringConfig.targetSeconds - input.elapsedSeconds);
    const totalScore = Math.max(
      0,
      dropPoints + goalPoints + hydrationBonus + timeBonus - input.penalties,
    );
    const rewardLevel = this.getRewardLevel(input.finalHydration);

    return {
      playerName: input.playerName,
      age: input.age,
      totalScore,
      elapsedSeconds: input.elapsedSeconds,
      dropsCollected: input.dropsCollected,
      finalHydration: input.finalHydration,
      finalEnergy: input.finalEnergy,
      rewardLevel,
      medalLabel: this.getMedalLabel(rewardLevel),
      completedAt: new Date().toISOString(),
    };
  }

  getRewardLevel(finalHydration: number): RewardLevel {
    if (finalHydration >= 80) {
      return 'hidratacion-excelente';
    }
    if (finalHydration >= 60) {
      return 'buena-hidratacion';
    }
    if (finalHydration >= 40) {
      return 'hidratacion-aceptable';
    }
    return 'sigue-practicando';
  }

  private getMedalLabel(level: RewardLevel): string {
    const labels: Record<RewardLevel, string> = {
      'hidratacion-excelente': 'Gota dorada',
      'buena-hidratacion': 'Medalla de plata',
      'hidratacion-aceptable': 'Medalla de bronce',
      'sigue-practicando': 'Insignia de aprendizaje',
    };
    return labels[level];
  }
}
