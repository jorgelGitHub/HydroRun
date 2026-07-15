import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  private player?: Phaser.GameObjects.Image;

  constructor() {
    super('GameScene');
  }

  create(): void {
    this.add.rectangle(640, 650, 1280, 140, 0x22c55e);
    this.add.rectangle(640, 600, 1280, 36, 0xf97316);
    this.player = this.add.image(160, 535, 'water-runner').setDisplaySize(72, 96);
    this.add.text(1080, 530, 'Meta', {
      color: '#0f172a',
      fontFamily: 'Arial',
      fontSize: '36px',
      fontStyle: 'bold',
    });
    this.add.text(32, 32, 'Escena base de carrera - etapa 1', {
      color: '#0f172a',
      fontFamily: 'Arial',
      fontSize: '24px',
    });
  }

  override update(): void {
    if (!this.player) {
      return;
    }

    const cursors = this.input.keyboard?.createCursorKeys();
    if (cursors?.left.isDown) {
      this.player.x -= 4;
    }
    if (cursors?.right.isDown) {
      this.player.x += 4;
    }
  }
}
