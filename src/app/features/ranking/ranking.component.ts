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
          <ol>
            @for (entry of entries; track entry.id) {
              <li>
                <strong>{{ entry.name }}</strong> - {{ entry.score }} puntos -
                {{ entry.elapsedSeconds }} s
              </li>
            }
          </ol>
        }
        <button class="btn btn-ghost" type="button" (click)="clear()">Borrar ranking</button>
      </div>
    </section>
  `,
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
