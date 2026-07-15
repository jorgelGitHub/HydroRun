import Phaser from 'phaser';
import { educationalMessages } from '../config/educational-messages.config';
import { scoringConfig } from '../config/scoring.config';

type TouchAction = 'left' | 'right' | 'jump' | 'crouch';

export class GameScene extends Phaser.Scene {
  private player?: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private keyA?: Phaser.Input.Keyboard.Key;
  private keyD?: Phaser.Input.Keyboard.Key;
  private keyS?: Phaser.Input.Keyboard.Key;
  private keySpace?: Phaser.Input.Keyboard.Key;
  private keyP?: Phaser.Input.Keyboard.Key;
  private keyEsc?: Phaser.Input.Keyboard.Key;
  private drops?: Phaser.Physics.Arcade.StaticGroup;
  private obstacles?: Phaser.Physics.Arcade.Group;
  private puddles?: Phaser.Physics.Arcade.StaticGroup;
  private checkpoints?: Phaser.Physics.Arcade.StaticGroup;
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private ground?: Phaser.GameObjects.Rectangle;
  private finish?: Phaser.Types.Physics.Arcade.ImageWithStaticBody;
  private messageText?: Phaser.GameObjects.Text;
  private hydration = 100;
  private energy = 100;
  private score = 0;
  private dropsCollected = 0;
  private elapsedSeconds = 0;
  private penalties = 0;
  private lastCheckpoint = new Phaser.Math.Vector2(160, 500);
  private finished = false;
  private nextDecayAt = 3000;
  private startTime = 0;
  private readonly levelWidth = 3600;
  private shownMessages = new Set<string>();
  private touchInput: Record<TouchAction, boolean> = {
    left: false,
    right: false,
    jump: false,
    crouch: false,
  };
  private readonly touchListener = (event: Event): void => {
    const detail = (event as CustomEvent<{ action: TouchAction; active: boolean }>).detail;
    if (detail?.action in this.touchInput) {
      this.touchInput[detail.action] = detail.active;
    }
  };

  constructor() {
    super('GameScene');
  }

  create(): void {
    this.createTextures();
    this.createWorld();
    this.createPlayer();
    this.createTerrainColliders();
    this.createKeyboardControls();
    this.createCollectibles();
    this.createObstacles();
    this.createEducationalSigns();

    this.startTime = this.time.now;
    this.nextDecayAt = this.time.now + 3000;
    window.addEventListener('hydrorun:touch', this.touchListener);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      window.removeEventListener('hydrorun:touch', this.touchListener);
    });
    this.emitState();
  }

  override update(): void {
    if (!this.player || this.finished) {
      return;
    }

    this.elapsedSeconds = Math.floor((this.time.now - this.startTime) / 1000);
    if (this.time.now >= this.nextDecayAt) {
      this.hydration = Math.max(0, this.hydration - 1);
      this.energy = Math.max(0, this.energy - 1);
      this.nextDecayAt += 3000;
    }

    this.applyMovement();
    this.updateCameraProgress();
    this.updateObstacleMotion();
    this.checkEducationalMessages();

    if (this.player.y > 760) {
      this.respawnFromFall();
    }

    if (this.hydration <= 0 || this.energy <= 0) {
      this.finishRace('defeat');
    }

    this.emitState();
  }

  private createTextures(): void {
    this.add.graphics().fillStyle(0x0ea5e9).fillCircle(18, 18, 18).generateTexture('drop', 36, 36);
    this.add
      .graphics()
      .fillStyle(0xf97316)
      .fillTriangle(0, 48, 24, 0, 48, 48)
      .lineStyle(4, 0xffffff)
      .strokeTriangle(0, 48, 24, 0, 48, 48)
      .generateTexture('cone', 48, 48);
    this.add.graphics().fillStyle(0x0369a1).fillRect(0, 0, 160, 28).generateTexture('barrier', 160, 28);
    this.add.graphics().fillStyle(0x67e8f9).fillRoundedRect(0, 0, 140, 22, 10).generateTexture('puddle', 140, 22);
    this.add.graphics().fillStyle(0xfacc15).fillRect(0, 0, 28, 120).generateTexture('checkpoint', 28, 120);
    this.add.graphics().fillStyle(0x22c55e).fillRect(0, 0, 38, 180).generateTexture('finish-post', 38, 180);
    this.add.graphics().fillStyle(0xf97316).fillRect(0, 0, 260, 34).generateTexture('platform', 260, 34);
  }

  private createWorld(): void {
    this.cameras.main.setBounds(0, 0, this.levelWidth, 720);
    this.physics.world.setBounds(0, 0, this.levelWidth, 820);

    this.add.rectangle(this.levelWidth / 2, 330, this.levelWidth, 660, 0xbae6fd);
    this.add.rectangle(this.levelWidth / 2, 655, this.levelWidth, 130, 0x22c55e);
    this.add.rectangle(this.levelWidth / 2, 600, this.levelWidth, 34, 0xf97316);
    this.add.text(90, 96, 'Inicio fácil', this.labelStyle());
    this.add.text(1300, 96, 'Zona con obstáculos móviles', this.labelStyle());
    this.add.text(2600, 96, 'Tramo final', this.labelStyle());

    this.ground = this.add.rectangle(this.levelWidth / 2, 650, this.levelWidth, 100, 0x22c55e);
    this.physics.add.existing(this.ground, true);

    this.platforms = this.physics.add.staticGroup();
    [
      [980, 500],
      [1530, 450],
      [2140, 485],
      [2780, 430],
      [3140, 520],
    ].forEach(([x, y]) => this.platforms?.create(x, y, 'platform'));
  }

  private createPlayer(): void {
    this.player = this.physics.add.image(160, 500, 'water-runner').setDisplaySize(72, 96);
    this.player.setCollideWorldBounds(false);
    this.player.body.setSize(44, 82);
    this.player.body.setOffset(26, 30);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08, -260, 120);
  }

  private createTerrainColliders(): void {
    if (!this.player || !this.platforms || !this.ground) {
      return;
    }
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.ground);
  }

  private createKeyboardControls(): void {
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.keyA = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyS = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keySpace = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyP = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.keyEsc = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  private createCollectibles(): void {
    this.drops = this.physics.add.staticGroup();
    [360, 540, 760, 1020, 1240, 1500, 1730, 2050, 2320, 2600, 2860, 3200].forEach((x, index) => {
      const y = index % 3 === 0 ? 455 : 535;
      this.drops?.create(x, y, 'drop');
    });

    this.physics.add.overlap(this.player ?? [], this.drops, (_, drop) => {
      const sprite = drop as Phaser.Physics.Arcade.Sprite;
      sprite.disableBody(true, true);
      this.dropsCollected += 1;
      this.score += scoringConfig.dropPoints;
      this.hydration = Math.min(100, this.hydration + 10);
      this.showFloatingText('+10 hidratación', sprite.x, sprite.y);
    });
  }

  private createObstacles(): void {
    this.obstacles = this.physics.add.group({ allowGravity: false, immovable: true });
    this.puddles = this.physics.add.staticGroup();
    this.checkpoints = this.physics.add.staticGroup();

    this.obstacles.create(850, 555, 'cone');
    this.obstacles.create(1350, 500, 'barrier').setData('motion', { axis: 'y', origin: 500, range: 90, speed: 0.002 });
    this.obstacles.create(1780, 555, 'cone');
    this.obstacles.create(2350, 505, 'barrier').setData('motion', { axis: 'x', origin: 2350, range: 130, speed: 0.0018 });
    this.obstacles.create(2940, 555, 'cone');

    this.puddles.create(1150, 590, 'puddle');
    this.puddles.create(2020, 590, 'puddle');
    this.puddles.create(3020, 590, 'puddle');

    this.checkpoints.create(1220, 535, 'checkpoint').setData('checkpoint', { x: 1220, y: 500 });
    this.checkpoints.create(2450, 535, 'checkpoint').setData('checkpoint', { x: 2450, y: 500 });

    this.finish = this.physics.add.staticImage(3460, 500, 'finish-post').setDisplaySize(38, 180);
    this.add.text(3380, 380, 'Meta', {
      color: '#0f172a',
      fontFamily: 'Arial',
      fontSize: '42px',
      fontStyle: 'bold',
    });

    this.physics.add.overlap(this.player ?? [], this.obstacles, () => this.hitObstacle());
    this.physics.add.overlap(this.player ?? [], this.puddles, () => this.applyPuddleSlowdown());
    this.physics.add.overlap(this.player ?? [], this.checkpoints, (_, checkpoint) => {
      const data = (checkpoint as Phaser.GameObjects.GameObject).getData('checkpoint') as { x: number; y: number };
      this.lastCheckpoint.set(data.x, data.y);
      this.showFloatingText('Punto de control', data.x, data.y - 70);
    });
    this.physics.add.overlap(this.player ?? [], this.finish, () => this.finishRace('victory'));
  }

  private createEducationalSigns(): void {
    this.messageText = this.add
      .text(32, 86, '', {
        backgroundColor: '#ffffff',
        color: '#0369a1',
        fontFamily: 'Arial',
        fontSize: '20px',
        fontStyle: 'bold',
        padding: { x: 12, y: 8 },
        wordWrap: { width: 520 },
      })
      .setScrollFactor(0)
      .setDepth(20)
      .setVisible(false);
  }

  private applyMovement(): void {
    if (!this.player) {
      return;
    }
    const left = this.cursors?.left.isDown || this.keyA?.isDown || this.touchInput.left;
    const right = this.cursors?.right.isDown || this.keyD?.isDown || this.touchInput.right;
    const crouch = this.cursors?.down.isDown || this.keyS?.isDown || this.touchInput.crouch;
    const jump = this.cursors?.up.isDown || this.keySpace?.isDown || this.touchInput.jump;
    const multiplier = this.getMovementMultiplier();
    const speed = crouch ? 145 * multiplier : 260 * multiplier;

    if (left) {
      this.player.setVelocityX(-speed);
      this.player.setFlipX(true);
    } else if (right) {
      this.player.setVelocityX(speed);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(160 * multiplier);
    }

    if (jump && this.player.body.blocked.down) {
      this.player.setVelocityY(-520 * multiplier);
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyP!) || Phaser.Input.Keyboard.JustDown(this.keyEsc!)) {
      this.scene.pause();
      window.setTimeout(() => this.scene.resume(), 1200);
    }
  }

  private getMovementMultiplier(): number {
    if (this.hydration < 20) {
      return 0.68;
    }
    if (this.hydration < 40) {
      return 0.78;
    }
    if (this.hydration < 60) {
      return 0.9;
    }
    return 1;
  }

  private updateCameraProgress(): void {
    if (!this.player) {
      return;
    }
    this.player.x = Phaser.Math.Clamp(this.player.x, 40, this.levelWidth - 80);
  }

  private updateObstacleMotion(): void {
    this.obstacles?.children.each((child) => {
      const obstacle = child as Phaser.Physics.Arcade.Image;
      const motion = obstacle.getData('motion') as
        | { axis: 'x' | 'y'; origin: number; range: number; speed: number }
        | undefined;
      if (!motion) {
        return true;
      }
      obstacle[motion.axis] = motion.origin + Math.sin(this.time.now * motion.speed) * motion.range;
      obstacle.body?.updateFromGameObject();
      return true;
    });
  }

  private checkEducationalMessages(): void {
    const progress = this.getProgress();
    const message = educationalMessages.find(
      (item) => progress >= item.triggerProgress && !this.shownMessages.has(item.id),
    );
    if (!message || !this.messageText) {
      return;
    }
    this.shownMessages.add(message.id);
    this.messageText.setText(message.text).setVisible(true);
    this.time.delayedCall(message.durationMs, () => this.messageText?.setVisible(false));
  }

  private hitObstacle(): void {
    if (!this.player || this.player.getData('recentHit')) {
      return;
    }
    this.player.setData('recentHit', true);
    this.penalties += scoringConfig.fallPenalty;
    this.energy = Math.max(0, this.energy - 6);
    this.player.setVelocity(-220, -260);
    this.showFloatingText('- energía', this.player.x, this.player.y - 70);
    this.time.delayedCall(900, () => this.player?.setData('recentHit', false));
  }

  private applyPuddleSlowdown(): void {
    if (!this.player) {
      return;
    }
    this.player.setVelocityX(this.player.body.velocity.x * 0.72);
  }

  private respawnFromFall(): void {
    if (!this.player) {
      return;
    }
    this.penalties += scoringConfig.fallPenalty;
    this.energy = Math.max(0, this.energy - 10);
    this.player.setPosition(this.lastCheckpoint.x, this.lastCheckpoint.y);
    this.player.setVelocity(0, 0);
    this.showFloatingText('Reinicio suave', this.lastCheckpoint.x, this.lastCheckpoint.y - 80);
  }

  private finishRace(outcome: 'victory' | 'defeat'): void {
    if (this.finished) {
      return;
    }
    this.finished = true;
    if (outcome === 'victory') {
      this.score += scoringConfig.goalPoints;
    }
    this.emitState();
    window.dispatchEvent(
      new CustomEvent('hydrorun:finish', {
        detail: {
          outcome,
          hydration: this.hydration,
          energy: this.energy,
          score: this.score,
          dropsCollected: this.dropsCollected,
          elapsedSeconds: this.elapsedSeconds,
          penalties: this.penalties,
          reachedGoal: outcome === 'victory',
        },
      }),
    );
  }

  private getProgress(): number {
    return this.player ? Math.round((this.player.x / (this.levelWidth - 160)) * 100) : 0;
  }

  private emitState(): void {
    window.dispatchEvent(
      new CustomEvent('hydrorun:state', {
        detail: {
          hydration: this.hydration,
          energy: this.energy,
          score: this.score,
          dropsCollected: this.dropsCollected,
          elapsedSeconds: this.elapsedSeconds,
          penalties: this.penalties,
          progress: this.getProgress(),
        },
      }),
    );
  }

  private showFloatingText(text: string, x: number, y: number): void {
    const label = this.add
      .text(x, y, text, {
        color: '#0369a1',
        fontFamily: 'Arial',
        fontSize: '20px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
    this.tweens.add({
      targets: label,
      alpha: 0,
      duration: 900,
      y: y - 40,
      onComplete: () => label.destroy(),
    });
  }

  private labelStyle(): Phaser.Types.GameObjects.Text.TextStyle {
    return {
      color: '#0f172a',
      fontFamily: 'Arial',
      fontSize: '26px',
      fontStyle: 'bold',
    };
  }
}
