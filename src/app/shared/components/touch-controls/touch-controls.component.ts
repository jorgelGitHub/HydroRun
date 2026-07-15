import { Component } from '@angular/core';

@Component({
  selector: 'app-touch-controls',
  standalone: true,
  template: `
    <div class="touch-controls" aria-label="Controles táctiles">
      <button type="button" aria-label="Mover a la izquierda">←</button>
      <button type="button" aria-label="Mover a la derecha">→</button>
      <button type="button" aria-label="Saltar">↑</button>
      <button type="button" aria-label="Agacharse">↓</button>
      <button type="button" aria-label="Pausar">P</button>
    </div>
  `,
  styles: [
    `
      .touch-controls {
        bottom: 14px;
        display: none;
        gap: 10px;
        left: 14px;
        position: fixed;
        right: 14px;
        z-index: 20;
      }
      button {
        border: 0;
        border-radius: 8px;
        flex: 1;
        font-size: 1.4rem;
        font-weight: 900;
        min-height: 56px;
      }
      @media (pointer: coarse) {
        .touch-controls {
          display: flex;
        }
      }
    `,
  ],
})
export class TouchControlsComponent {}
