import { TestBed } from '@angular/core/testing';
import { ScoringService } from './scoring.service';

describe('ScoringService', () => {
  let service: ScoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoringService);
  });

  it('calculates score with drops, goal, hydration bonus and time bonus', () => {
    const result = service.calculate({
      playerName: 'Ana',
      age: 12,
      dropsCollected: 5,
      reachedGoal: true,
      finalHydration: 80,
      finalEnergy: 70,
      elapsedSeconds: 120,
      penalties: 10,
    });

    expect(result.totalScore).toBe(250);
    expect(result.rewardLevel).toBe('hidratacion-excelente');
    expect(result.medalLabel).toBe('Gota dorada');
  });

  it('classifies reward levels by final hydration', () => {
    expect(service.getRewardLevel(85)).toBe('hidratacion-excelente');
    expect(service.getRewardLevel(65)).toBe('buena-hidratacion');
    expect(service.getRewardLevel(45)).toBe('hidratacion-aceptable');
    expect(service.getRewardLevel(25)).toBe('sigue-practicando');
  });
});
