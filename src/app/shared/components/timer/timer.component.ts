import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  template: `<div class="box" aria-label="Cronómetro">Tiempo: {{ seconds }} s</div>`,
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
export class TimerComponent {
  @Input({ required: true }) seconds = 0;
}
