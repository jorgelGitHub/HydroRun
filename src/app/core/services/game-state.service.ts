import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameState } from '../models/game-state.model';

const initialState: GameState = {
  status: 'idle',
  hydration: 100,
  energy: 100,
  score: 0,
  dropsCollected: 0,
  elapsedSeconds: 0,
  penalties: 0,
  progress: 0,
  lastCheckpointId: 'start',
};

@Injectable({ providedIn: 'root' })
export class GameStateService {
  private readonly stateSubject = new BehaviorSubject<GameState>(initialState);
  readonly state$ = this.stateSubject.asObservable();

  get snapshot(): GameState {
    return this.stateSubject.value;
  }

  patchState(patch: Partial<GameState>): void {
    this.stateSubject.next({ ...this.snapshot, ...patch });
  }

  reset(): void {
    this.stateSubject.next(initialState);
  }
}
