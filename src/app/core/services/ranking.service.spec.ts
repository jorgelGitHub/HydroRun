import { TestBed } from '@angular/core/testing';
import { RankingService } from './ranking.service';

describe('RankingService', () => {
  let service: RankingService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankingService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('orders ranking by score and uses elapsed time as tie breaker', () => {
    service.saveResult({
      playerName: 'Luz',
      age: 10,
      totalScore: 200,
      elapsedSeconds: 150,
      dropsCollected: 4,
      finalHydration: 70,
      finalEnergy: 80,
      rewardLevel: 'buena-hidratacion',
      medalLabel: 'Medalla de plata',
      completedAt: '2026-07-15T00:00:00.000Z',
    });
    service.saveResult({
      playerName: 'Nico',
      age: 11,
      totalScore: 200,
      elapsedSeconds: 120,
      dropsCollected: 5,
      finalHydration: 85,
      finalEnergy: 90,
      rewardLevel: 'hidratacion-excelente',
      medalLabel: 'Gota dorada',
      completedAt: '2026-07-15T00:01:00.000Z',
    });

    const entries = service.getTopEntries();

    expect(entries.length).toBe(2);
    expect(entries[0].name).toBe('Nico');
  });
});
