import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ScoreResult } from '../../core/models/score-result.model';
import { DefeatScreenComponent } from '../../shared/components/defeat-screen/defeat-screen.component';
import { VictoryScreenComponent } from '../../shared/components/victory-screen/victory-screen.component';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [RouterLink, VictoryScreenComponent, DefeatScreenComponent],
  template: `
    <section class="page-shell">
      <div class="panel">
        @if (lastResult?.outcome === 'victory') {
          <app-victory-screen />
        } @else {
          <app-defeat-screen />
        }
        @if (lastResult) {
          <dl class="stats">
            <div><dt>Nombre</dt><dd>{{ lastResult.result.playerName }}</dd></div>
            <div><dt>Edad</dt><dd>{{ lastResult.result.age }}</dd></div>
            <div><dt>Tiempo final</dt><dd>{{ lastResult.result.elapsedSeconds }} s</dd></div>
            <div><dt>Puntuación</dt><dd>{{ lastResult.result.totalScore }}</dd></div>
            <div><dt>Gotas recogidas</dt><dd>{{ lastResult.result.dropsCollected }}</dd></div>
            <div><dt>Hidratación final</dt><dd>{{ lastResult.result.finalHydration }}%</dd></div>
            <div><dt>Energía final</dt><dd>{{ lastResult.result.finalEnergy }}%</dd></div>
            <div><dt>Recompensa</dt><dd>{{ lastResult.result.medalLabel }}</dd></div>
          </dl>
        }
        <div class="button-row">
          <a class="btn btn-primary" routerLink="/juego">Jugar nuevamente</a>
          <a class="btn btn-secondary" routerLink="/aprendizaje">Ver aprendizaje</a>
          <a class="btn btn-ghost" routerLink="/ranking">Ver ranking</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .stats {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        margin: 24px 0;
      }

      .stats div {
        background: var(--water-100);
        border-radius: 8px;
        padding: 12px;
      }

      dt {
        color: var(--ink-600);
        font-weight: 800;
      }

      dd {
        font-size: 1.2rem;
        font-weight: 900;
        margin: 4px 0 0;
      }
    `,
  ],
})
export class ResultComponent {
  private readonly storage = inject(LocalStorageService);
  readonly lastResult = this.storage.getJson<LastHydroRunResult | null>('hydrorun.last-result', null);
}

interface LastHydroRunResult {
  outcome: 'victory' | 'defeat';
  result: ScoreResult;
  rawScore: number;
}
