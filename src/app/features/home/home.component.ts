import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="home page-shell">
      <div class="hero">
        <div class="copy">
          <p class="eyebrow">Videojuego educativo</p>
          <h1>HydroRun</h1>
          <p class="subtitle">Corre, salta e hidrátate</p>
          <div class="button-row" aria-label="Acciones principales">
            <a class="btn btn-primary" routerLink="/registro">Comenzar aventura</a>
            <a class="btn btn-secondary" routerLink="/introduccion">¿Cómo jugar?</a>
            <a class="btn btn-ghost" routerLink="/ranking">Ver ranking</a>
          </div>
        </div>
        <div class="mascot" aria-label="Personaje original de agua" role="img">
          <span class="drop"></span>
          <span class="shadow"></span>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        align-items: center;
        background:
          radial-gradient(circle at 76% 22%, rgb(250 204 21 / 55%), transparent 20%),
          linear-gradient(180deg, #bae6fd 0 55%, #86efac 56% 100%);
        border-radius: 8px;
        display: grid;
        gap: 28px;
        grid-template-columns: 1.1fr 0.9fr;
        min-height: 520px;
        overflow: hidden;
        padding: clamp(24px, 6vw, 64px);
        position: relative;
      }

      .hero::after {
        background: repeating-linear-gradient(90deg, #f97316 0 34px, #ffffff 34px 44px);
        bottom: 0;
        content: '';
        height: 70px;
        left: 0;
        position: absolute;
        right: 0;
      }

      .copy {
        position: relative;
        z-index: 1;
      }

      .eyebrow {
        color: var(--water-700);
        font-weight: 900;
        margin: 0 0 8px;
      }

      h1 {
        font-size: clamp(3rem, 10vw, 7rem);
        line-height: 0.9;
        margin: 0;
      }

      .subtitle {
        color: var(--ink-600);
        font-size: clamp(1.25rem, 3vw, 2rem);
        font-weight: 800;
        margin: 14px 0 28px;
      }

      .mascot {
        align-items: center;
        display: grid;
        justify-items: center;
        min-height: 320px;
        position: relative;
        z-index: 1;
      }

      .drop {
        animation: bounce 2.4s ease-in-out infinite;
        background: linear-gradient(160deg, #67e8f9, #0284c7);
        border: 8px solid #ffffff;
        border-radius: 55% 55% 58% 58%;
        clip-path: path('M 100 0 C 140 60 190 105 190 165 C 190 220 150 255 100 255 C 50 255 10 220 10 165 C 10 105 60 60 100 0 Z');
        height: 255px;
        width: 200px;
      }

      .shadow {
        background: rgb(15 23 42 / 18%);
        border-radius: 50%;
        height: 28px;
        margin-top: -18px;
        width: 180px;
      }

      @keyframes bounce {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-18px);
        }
      }

      @media (max-width: 780px) {
        .hero {
          grid-template-columns: 1fr;
          min-height: auto;
        }
      }
    `,
  ],
})
export class HomeComponent {}
