import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-restart-button',
  standalone: true,
  template: `<button class="btn btn-secondary" type="button" (click)="restart.emit()">Reiniciar</button>`,
})
export class RestartButtonComponent {
  @Output() readonly restart = new EventEmitter<void>();
}
