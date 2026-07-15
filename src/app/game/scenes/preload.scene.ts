import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload(): void {
    // Los recursos definitivos se cargaran desde src/assets en las siguientes etapas.
  }

  create(): void {
    this.scene.start('MenuScene');
  }
}
