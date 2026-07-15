# HYDRORUN: CORRE E HIDRÁTATE

HydroRun es un videojuego educativo web para enseñar la importancia de la hidratación durante el ejercicio físico. El jugador corre, salta, recoge gotas de agua y conserva hidratación y energía para llegar a la meta.

## Objetivo educativo

Ayudar a niños y adolescentes de 7 a 17 años a comprender que hidratarse antes, durante y después de la actividad física favorece el rendimiento, la concentración y la seguridad.

## Tecnologías

- Angular con TypeScript estricto.
- Phaser con HTML5 Canvas.
- Angular Reactive Forms.
- LocalStorage para jugador, preferencias y ranking local.
- SCSS responsive.
- ESLint, Prettier y Karma/Jasmine.
- GitHub Actions para GitHub Pages.

## Requisitos

- Node.js 20 LTS o superior.
- npm 10 o superior.

## Instalación

```bash
npm install
```

## Ejecución local

```bash
npm start
```

Luego abre `http://localhost:4200/`.

## Compilación

```bash
npm run build
```

Para GitHub Pages en este repositorio, ejecuta:

```bash
ng build --configuration production --base-href ./
```

## Pruebas

```bash
npm test
```

Las pruebas unitarias de la lógica principal se agregan en la etapa 7.

## Estructura

```text
src/app/core/models        Interfaces principales
src/app/core/services      Servicios de jugador, ranking, puntuación y estado
src/app/features           Pantallas por ruta
src/app/shared/components  HUD, controles y componentes reutilizables
src/app/game/config        Configuración del juego
src/app/game/scenes        Escenas Phaser
src/app/game/systems       Sistemas independientes de lógica
src/assets                 Recursos originales o placeholders
```

## Rutas

- `/inicio`
- `/registro`
- `/introduccion`
- `/juego`
- `/resultado`
- `/aprendizaje`
- `/ranking`

## Controles previstos

- Flecha izquierda o A: moverse a la izquierda.
- Flecha derecha o D: moverse a la derecha.
- Espacio o flecha arriba: saltar.
- Flecha abajo o S: agacharse.
- P o Escape: pausar.
- M: activar o desactivar sonido.

## Mecánicas previstas

- Hidratación y energía inician en 100%.
- Cada 3 segundos bajan 1%.
- Cada gota suma 10% de hidratación y 10 puntos.
- Llegar a la meta suma 100 puntos.
- Hidratación final superior a 75% suma 50 puntos.
- La velocidad y el salto se ajustan según la hidratación.

## Publicación en GitHub Pages

1. Inicializa Git: `git init`.
2. Agrega archivos: `git add .`.
3. Crea el primer commit: `git commit -m "Initial HydroRun project"`.
4. Crea un repositorio en GitHub llamado `HydroRun`.
5. Configura el remoto: `git remote add origin https://github.com/jorgelGitHub/HydroRun.git`.
6. Sube la rama principal: `git branch -M main && git push -u origin main`.
7. En GitHub, activa Pages con fuente GitHub Actions.
8. Verifica que el workflow `.github/workflows/deploy.yml` compile con `--base-href ./`.

## Capturas

Agrega capturas en `docs/screenshots/` cuando la interfaz jugable esté completa.

## Créditos

Proyecto creado para la Federación Deportiva de Loja como experiencia educativa sobre hidratación. Los recursos visuales iniciales son originales o placeholders documentados en `ASSETS.md`.

## Licencia

Código bajo licencia MIT. Los recursos originales del proyecto se documentan en `ASSETS.md`.

## Mejoras futuras

- API REST para ranking institucional.
- Panel docente.
- Más niveles y obstáculos.
- Más opciones de accesibilidad.
- Exportación de resultados.
