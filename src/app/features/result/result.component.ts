import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DefeatScreenComponent } from '../../shared/components/defeat-screen/defeat-screen.component';
import { VictoryScreenComponent } from '../../shared/components/victory-screen/victory-screen.component';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [RouterLink, VictoryScreenComponent, DefeatScreenComponent],
  template: `
    <section class="page-shell">
      <div class="panel">
        <app-victory-screen />
        <div class="button-row">
          <a class="btn btn-primary" routerLink="/juego">Jugar nuevamente</a>
          <a class="btn btn-secondary" routerLink="/aprendizaje">Ver aprendizaje</a>
          <a class="btn btn-ghost" routerLink="/ranking">Ver ranking</a>
        </div>
      </div>
    </section>
  `,
})
export class ResultComponent {}
