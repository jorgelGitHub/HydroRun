import Phaser from 'phaser';
import { BootScene } from './boot.scene';
import { GameScene } from './game.scene';
import { MenuScene } from './menu.scene';
import { PauseScene } from './pause.scene';
import { PreloadScene } from './preload.scene';
import { ResultScene } from './result.scene';

export function createHydroRunScenes(): Phaser.Types.Scenes.SceneType[] {
  return [BootScene, PreloadScene, MenuScene, GameScene, PauseScene, ResultScene];
}
