import { Routes } from '@angular/router';
import { GamePageComponent } from './features/game-page/game-page.component';
import { HomeComponent } from './features/home/home.component';
import { IntroductionComponent } from './features/introduction/introduction.component';
import { LearningComponent } from './features/learning/learning.component';
import { RankingComponent } from './features/ranking/ranking.component';
import { RegistrationComponent } from './features/registration/registration.component';
import { ResultComponent } from './features/result/result.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'inicio', component: HomeComponent, title: 'HydroRun | Inicio' },
  { path: 'registro', component: RegistrationComponent, title: 'HydroRun | Registro' },
  { path: 'introduccion', component: IntroductionComponent, title: 'HydroRun | Introducción' },
  { path: 'juego', component: GamePageComponent, title: 'HydroRun | Carrera' },
  { path: 'resultado', component: ResultComponent, title: 'HydroRun | Resultado' },
  { path: 'aprendizaje', component: LearningComponent, title: 'HydroRun | Aprendizaje' },
  { path: 'ranking', component: RankingComponent, title: 'HydroRun | Ranking' },
  { path: '**', redirectTo: 'inicio' },
];
