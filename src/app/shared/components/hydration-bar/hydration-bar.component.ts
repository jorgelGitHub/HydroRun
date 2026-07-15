import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hydration-bar',
  standalone: true,
  template: `
    <div class="meter" aria-label="Hidratación">
      <strong>💧 Hidratación</strong>
      <span>{{ value }}%</span>
      <div class="track"><span [style.width.%]="value"></span></div>
    </div>
  `,
  styles: [
    `
      .meter {
        background: #ffffff;
        border-radius: 8px;
        display: grid;
        gap: 4px;
        padding: 10px;
      }
      .track {
        background: #dbeafe;
        border-radius: 999px;
        height: 10px;
        overflow: hidden;
      }
      .track span {
        background: repeating-linear-gradient(45deg, #0ea5e9 0 10px, #22d3ee 10px 20px);
        display: block;
        height: 100%;
      }
    `,
  ],
})
export class HydrationBarComponent {
  @Input({ required: true }) value = 100;
}
