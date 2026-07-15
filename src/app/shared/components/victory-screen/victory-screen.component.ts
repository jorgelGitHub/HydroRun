import { Component } from '@angular/core';

@Component({
  selector: 'app-victory-screen',
  standalone: true,
  template: `
    <h1>¡Carrera completada!</h1>
    <p>
      Lograste completar la carrera. Mantener una buena hidratación te ayudó a conservar tu energía
      y rendimiento.
    </p>
  `,
})
export class VictoryScreenComponent {}
