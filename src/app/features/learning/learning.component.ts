import { Component } from '@angular/core';

@Component({
  selector: 'app-learning',
  standalone: true,
  template: `
    <section class="page-shell">
      <article class="panel">
        <h1>La hidratación es clave para tu rendimiento</h1>
        <ul>
          <li>Beber agua antes del ejercicio.</li>
          <li>Mantener la hidratación durante la actividad física.</li>
          <li>Rehidratarse al finalizar.</li>
          <li>Escuchar las señales del cuerpo.</li>
          <li>Descansar cuando sea necesario.</li>
        </ul>
      </article>
    </section>
  `,
})
export class LearningComponent {}
