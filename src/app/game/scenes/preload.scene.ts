import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload(): void {
    this.load.svg('water-runner', 'assets/sprites/water-runner.svg', {
      width: 96,
      height: 128,
    });
  }

  create(): void {
    this.scene.start('MenuScene');
  }
}
