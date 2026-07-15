import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import Phaser from 'phaser';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { PlayerService } from '../../core/services/player.service';
import { RankingService } from '../../core/services/ranking.service';
import { ScoringService } from '../../core/services/scoring.service';
import { gameConfig } from '../../game/config/game.constants';
import { createHydroRunScenes } from '../../game/scenes/create-scenes';
import { EnergyBarComponent } from '../../shared/components/energy-bar/energy-bar.component';
import { HydrationBarComponent } from '../../shared/components/hydration-bar/hydration-bar.component';
import { ScoreBoardComponent } from '../../shared/components/score-board/score-board.component';
import { TimerComponent } from '../../shared/components/timer/timer.component';
import { TouchControlsComponent } from '../../shared/components/touch-controls/touch-controls.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    EnergyBarComponent,
    HydrationBarComponent,
    ScoreBoardComponent,
    TimerComponent,
    TouchControlsComponent,
  ],
  template: `
    <section class="game-layout" aria-label="Carrera HydroRun">
      <div class="hud" aria-label="Indicadores del juego">
        <app-hydration-bar [value]="state.hydration" />
        <app-energy-bar [value]="state.energy" />
        <app-score-board [score]="state.score" [drops]="state.dropsCollected" />
        <app-timer [seconds]="state.elapsedSeconds" />
      </div>
      <div class="progress" aria-label="Progreso hacia la meta">
        <span [style.width.%]="state.progress"></span>
        <strong>{{ state.progress }}% hacia la meta</strong>
      </div>
      <div #gameHost class="game-host" aria-label="Lienzo del videojuego"></div>
      <app-touch-controls />
    </section>
  `,
  styles: [
    `
      .game-layout {
        display: grid;
        gap: 12px;
        min-height: calc(100vh - 82px);
        padding: 12px;
      }

      .hud {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(4, minmax(140px, 1fr));
      }

      .game-host {
        background: #7dd3fc;
        border: 3px solid #ffffff;
        border-radius: 8px;
        min-height: 520px;
        overflow: hidden;
      }

      .progress {
        background: #ffffff;
        border-radius: 8px;
        min-height: 28px;
        overflow: hidden;
        position: relative;
      }

      .progress span {
        background: linear-gradient(90deg, var(--water-500), var(--grass-500));
        display: block;
        height: 100%;
      }

      .progress strong {
        color: var(--ink-900);
        font-size: 0.9rem;
        left: 12px;
        position: absolute;
        top: 5px;
      }

      @media (max-width: 820px) {
        .hud {
          grid-template-columns: repeat(2, minmax(140px, 1fr));
        }
      }
    `,
  ],
})
export class GamePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gameHost', { static: true }) private readonly gameHost?: ElementRef<HTMLDivElement>;
  private readonly playerService = inject(PlayerService);
  private readonly scoringService = inject(ScoringService);
  private readonly rankingService = inject(RankingService);
  private readonly storage = inject(LocalStorageService);
  private readonly router = inject(Router);
  private phaserGame?: Phaser.Game;
  private readonly stateListener = (event: Event): void => {
    this.state = {
      ...this.state,
      ...(event as CustomEvent<HydroRunRuntimeState>).detail,
    };
  };
  private readonly finishListener = (event: Event): void => {
    this.handleFinish((event as CustomEvent<HydroRunFinishState>).detail);
  };

  state: HydroRunRuntimeState = {
    hydration: 100,
    energy: 100,
    score: 0,
    dropsCollected: 0,
    elapsedSeconds: 0,
    penalties: 0,
    progress: 0,
  };

  ngAfterViewInit(): void {
    if (!this.gameHost) {
      return;
    }

    this.phaserGame = new Phaser.Game({
      ...gameConfig,
      parent: this.gameHost.nativeElement,
      scene: createHydroRunScenes(),
    });
    window.addEventListener('hydrorun:state', this.stateListener);
    window.addEventListener('hydrorun:finish', this.finishListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('hydrorun:state', this.stateListener);
    window.removeEventListener('hydrorun:finish', this.finishListener);
    this.phaserGame?.destroy(true);
  }

  private handleFinish(finish: HydroRunFinishState): void {
    const player = this.playerService.getPlayer() ?? {
      name: 'Deportista',
      age: 10,
      sex: 'prefiero-no-decirlo' as const,
      createdAt: new Date().toISOString(),
    };
    const result = this.scoringService.calculate({
      playerName: player.name,
      age: player.age,
      dropsCollected: finish.dropsCollected,
      reachedGoal: finish.reachedGoal,
      finalHydration: finish.hydration,
      finalEnergy: finish.energy,
      elapsedSeconds: finish.elapsedSeconds,
      penalties: finish.penalties,
    });
    const lastResult = {
      outcome: finish.outcome,
      result,
      rawScore: finish.score,
    };
    this.storage.setJson('hydrorun.last-result', lastResult);
    this.rankingService.saveResult(result);
    void this.router.navigateByUrl('/resultado');
  }
}

interface HydroRunRuntimeState {
  hydration: number;
  energy: number;
  score: number;
  dropsCollected: number;
  elapsedSeconds: number;
  penalties: number;
  progress: number;
}

interface HydroRunFinishState extends HydroRunRuntimeState {
  outcome: 'victory' | 'defeat';
  reachedGoal: boolean;
}
