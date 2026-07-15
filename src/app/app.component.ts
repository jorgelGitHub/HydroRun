import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SoundSettingsComponent } from './shared/components/sound-settings/sound-settings.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, SoundSettingsComponent],
  template: `
    <header class="topbar" aria-label="Navegación principal">
      <a class="brand" routerLink="/inicio" aria-label="Ir al inicio de HydroRun">
        <img src="assets/icons/hydrorun-drop.svg" alt="" width="36" height="36" />
        <span>HydroRun</span>
      </a>
      <nav>
        <a routerLink="/inicio">Inicio</a>
        <a routerLink="/aprendizaje">Aprendizaje</a>
        <a routerLink="/ranking">Ranking</a>
      </nav>
      <app-sound-settings />
    </header>
    <main>
      <router-outlet />
    </main>
  `,
  styles: [
    `
      .topbar {
        align-items: center;
        background: rgb(255 255 255 / 92%);
        border-bottom: 1px solid rgb(14 165 233 / 18%);
        display: grid;
        gap: 16px;
        grid-template-columns: auto 1fr auto;
        padding: 12px clamp(16px, 4vw, 40px);
        position: sticky;
        top: 0;
        z-index: 10;
      }

      .brand {
        align-items: center;
        color: var(--water-700);
        display: inline-flex;
        font-size: 1.25rem;
        font-weight: 900;
        gap: 8px;
        text-decoration: none;
      }

      nav {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
      }

      nav a {
        color: var(--ink-600);
        font-weight: 800;
        text-decoration: none;
      }

      @media (max-width: 700px) {
        .topbar {
          grid-template-columns: 1fr auto;
        }

        nav {
          grid-column: 1 / -1;
          justify-content: flex-start;
        }
      }
    `,
  ],
})
export class AppComponent {}
