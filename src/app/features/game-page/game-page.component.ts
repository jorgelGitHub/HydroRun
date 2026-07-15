import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import Phaser from 'phaser';
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
        <app-hydration-bar [value]="100" />
        <app-energy-bar [value]="100" />
        <app-score-board [score]="0" [drops]="0" />
        <app-timer [seconds]="0" />
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
  private phaserGame?: Phaser.Game;

  ngAfterViewInit(): void {
    if (!this.gameHost) {
      return;
    }

    this.phaserGame = new Phaser.Game({
      ...gameConfig,
      parent: this.gameHost.nativeElement,
      scene: createHydroRunScenes(),
    });
  }

  ngOnDestroy(): void {
    this.phaserGame?.destroy(true);
  }
}
