import { Component, inject } from '@angular/core';
import { RankingService } from '../../core/services/ranking.service';

@Component({
  selector: 'app-ranking',
  standalone: true,
  template: `
    <section class="page-shell">
      <div class="panel">
        <h1>Ranking local</h1>
        @if (entries.length === 0) {
          <p>Aún no hay resultados guardados.</p>
        } @else {
          <ol class="ranking-list">
            @for (entry of entries; track entry.id) {
              <li>
                <strong>{{ entry.name }}</strong>
                <span>{{ entry.score }} puntos</span>
                <span>{{ entry.elapsedSeconds }} s</span>
                <span>{{ entry.dropsCollected }} gotas</span>
                <span>{{ entry.finalHydration }}% hidratación</span>
              </li>
            }
          </ol>
        }
        <button class="btn btn-ghost" type="button" (click)="clear()">Borrar ranking</button>
      </div>
    </section>
  `,
  styles: [
    `
      .ranking-list {
        display: grid;
        gap: 10px;
        padding-left: 24px;
      }

      li {
        background: var(--water-100);
        border-radius: 8px;
        padding: 12px;
      }

      li span {
        display: inline-block;
        margin-left: 12px;
      }
    `,
  ],
})
export class RankingComponent {
  private readonly rankingService = inject(RankingService);
  entries = this.rankingService.getTopEntries();

  clear(): void {
    if (confirm('¿Quieres borrar todos los resultados guardados?')) {
      this.rankingService.clear();
      this.entries = [];
    }
  }
}
