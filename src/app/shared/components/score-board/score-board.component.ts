import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-board',
  standalone: true,
  template: `<div class="box" aria-label="Marcador">Puntos: {{ score }} | Gotas: {{ drops }}</div>`,
  styles: [
    `
      .box {
        background: #ffffff;
        border-radius: 8px;
        font-weight: 900;
        min-height: 64px;
        padding: 18px 10px;
      }
    `,
  ],
})
export class ScoreBoardComponent {
  @Input({ required: true }) score = 0;
  @Input({ required: true }) drops = 0;
}
