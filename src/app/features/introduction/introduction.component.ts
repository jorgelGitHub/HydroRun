import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlayerService } from '../../core/services/player.service';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-shell">
      <article class="panel intro">
        <div class="runner" aria-label="Ilustración animada del personaje de agua" role="img"></div>
        <div>
          <h1>Hola, {{ playerName }}.</h1>
          <p>
            Durante el ejercicio tu cuerpo pierde agua a través del sudor. Cuando no te hidratas
            adecuadamente puedes sentir cansancio, disminuir tu velocidad, perder concentración y
            reducir tu rendimiento deportivo.
          </p>
          <p>
            En este desafío deberás completar una carrera recogiendo gotas de agua para mantener tu
            energía. Mientras más hidratado permanezcas, mejor será tu desempeño.
          </p>
          <p>¿Estás listo para demostrar que una buena hidratación te ayuda a llegar más lejos?</p>
          <div class="controls" aria-label="Controles del juego">
            <span>← → moverse</span>
            <span>Espacio saltar</span>
            <span>↓ agacharse</span>
          </div>
          <div class="button-row">
            <a class="btn btn-primary" routerLink="/juego">Iniciar carrera</a>
            <a class="btn btn-ghost" routerLink="/registro">Volver</a>
          </div>
        </div>
      </article>
    </section>
  `,
  styles: [
    `
      .intro {
        align-items: center;
        display: grid;
        gap: 28px;
        grid-template-columns: 220px 1fr;
      }

      .runner {
        animation: float 2s ease-in-out infinite;
        background: linear-gradient(150deg, #7dd3fc, #0284c7);
        border: 8px solid #ffffff;
        border-radius: 48% 48% 42% 42%;
        height: 220px;
        width: 170px;
      }

      .controls {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 20px 0;
      }

      .controls span {
        background: var(--water-100);
        border-radius: 8px;
        font-weight: 900;
        padding: 10px 12px;
      }

      @keyframes float {
        50% {
          transform: translateY(-12px);
        }
      }

      @media (max-width: 720px) {
        .intro {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class IntroductionComponent {
  private readonly playerService = inject(PlayerService);
  readonly playerName = this.playerService.getPlayer()?.name ?? 'deportista';
}
