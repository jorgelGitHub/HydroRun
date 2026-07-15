import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-energy-bar',
  standalone: true,
  template: `
    <div class="meter" aria-label="Energía">
      <strong>⚡ Energía</strong>
      <span>{{ value }}% - {{ value > 40 ? 'estable' : 'baja' }}</span>
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
        background: #fef3c7;
        border-radius: 999px;
        height: 10px;
        overflow: hidden;
      }
      .track span {
        background: repeating-linear-gradient(45deg, #facc15 0 10px, #fb923c 10px 20px);
        display: block;
        height: 100%;
      }
    `,
  ],
})
export class EnergyBarComponent {
  @Input({ required: true }) value = 100;
}
