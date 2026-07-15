import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create(): void {
    this.add
      .text(640, 260, 'HydroRun', {
        color: '#0f172a',
        fontFamily: 'Arial',
        fontSize: '64px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
    this.add
      .text(640, 340, 'Pulsa espacio o toca para iniciar la carrera', {
        color: '#0369a1',
        fontFamily: 'Arial',
        fontSize: '28px',
      })
      .setOrigin(0.5);

    this.input.keyboard?.once('keydown-SPACE', () => this.scene.start('GameScene'));
    this.input.once('pointerdown', () => this.scene.start('GameScene'));
  }
}
