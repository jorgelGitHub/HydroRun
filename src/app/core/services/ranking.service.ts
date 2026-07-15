import { Injectable, inject } from '@angular/core';
import { RankingEntry } from '../models/ranking-entry.model';
import { ScoreResult } from '../models/score-result.model';
import { LocalStorageService } from './local-storage.service';

const RANKING_KEY = 'hydrorun.ranking';

@Injectable({ providedIn: 'root' })
export class RankingService {
  private readonly storage = inject(LocalStorageService);

  getTopEntries(): RankingEntry[] {
    return this.storage
      .getJson<RankingEntry[]>(RANKING_KEY, [])
      .sort((first, second) => second.score - first.score || first.elapsedSeconds - second.elapsedSeconds)
      .slice(0, 10);
  }

  saveResult(result: ScoreResult): void {
    const entry: RankingEntry = {
      id: crypto.randomUUID(),
      name: result.playerName,
      age: result.age,
      score: result.totalScore,
      elapsedSeconds: result.elapsedSeconds,
      dropsCollected: result.dropsCollected,
      finalHydration: result.finalHydration,
      date: result.completedAt,
      rewardLevel: result.rewardLevel,
    };
    this.storage.setJson(RANKING_KEY, [...this.getTopEntries(), entry]);
  }

  clear(): void {
    this.storage.remove(RANKING_KEY);
  }
}
