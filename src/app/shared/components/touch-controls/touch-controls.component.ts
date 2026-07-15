import { Component } from '@angular/core';

@Component({
  selector: 'app-touch-controls',
  standalone: true,
  template: `
    <div class="touch-controls" aria-label="Controles táctiles">
      <button type="button" aria-label="Mover a la izquierda" (pointerdown)="press('left', true)" (pointerup)="press('left', false)" (pointerleave)="press('left', false)">←</button>
      <button type="button" aria-label="Mover a la derecha" (pointerdown)="press('right', true)" (pointerup)="press('right', false)" (pointerleave)="press('right', false)">→</button>
      <button type="button" aria-label="Saltar" (pointerdown)="press('jump', true)" (pointerup)="press('jump', false)" (pointerleave)="press('jump', false)">↑</button>
      <button type="button" aria-label="Agacharse" (pointerdown)="press('crouch', true)" (pointerup)="press('crouch', false)" (pointerleave)="press('crouch', false)">↓</button>
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
export class TouchControlsComponent {
  press(action: 'left' | 'right' | 'jump' | 'crouch', active: boolean): void {
    window.dispatchEvent(new CustomEvent('hydrorun:touch', { detail: { action, active } }));
  }
}
