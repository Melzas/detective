import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    const ground = 520;

    //BG
    this.add.image(0, 0, 'forest1').setOrigin(0, 0);

    //AUDIO
    let music = this.sound.add('bg');
    //music.play();

    //PLATFORMS
    // this.platforms = this.physics.add.staticGroup();
    // this.platforms.create(800, 0, 'wall').setOrigin(0, 0).setScale(2).refreshBody();

    //PNJ
    // this.pnj = this.physics.add.staticGroup();
    // this.pnj.create(300, ground, 'gaia').setFrame(9).setInteractive().setBounce(0);
    this.pnj = this.physics.add.sprite(1200, ground, 'gaia').setFrame(9).setInteractive();
    this.pnj.body.setImmovable(true);
    this.pnj.body.setAllowGravity(false);
    this.pnj.on('pointerdown', this.dialogGaia);

    //PLAYER
    this.player = this.physics.add.sprite(110, ground, 'sparadra').setFrame(6);
    this.player.body.setAllowGravity(false);

    this.physics.add.collider(this.player, this.pnj);


    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('sparadra', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('sparadra', { start: 8, end: 15 }),
      frameRate: 10,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {

    if (typeof this.currentAnim === 'undefined') {
      this.currentAnim = 'right';
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.currentAnim = 'left';
      this.player.anims.play(this.currentAnim, true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.currentAnim = 'right';
      this.player.anims.play(this.currentAnim, true);
    }
    else {
      this.player.setVelocityX(0);

      this.player.anims.play(this.currentAnim, true);
      //this.player.anims.stop();
    }
  }

  dialogGaia(pointer, object) {
    let padding = 15;
    let x = this.x;
    let y = this.y;

    let bubble = this.scene.make.text({
      x: x - 100,
      text: "Tiens, Sparadra! Il paraît que tu enquêtes sur la disparition des smourbiffs. J'peux te donner une info gratuitement si tu me rapportes 1.000 crédits <3",
      origin: { x: 0.5, y: 0.5 },
      padding: { left: padding, top: padding, right: padding, bottom: padding },
      style: {
        font: '18px Arial',
        fill: 'black',
        backgroundColor: 'white',
        wordWrap: { width: 300 }
      }
    });

    var graphics = this.scene.add.graphics({ fillStyle: { color: 0xffffff } });
    var triangle = Phaser.Geom.Triangle.BuildEquilateral(x - 30, y - 100, 50);
    Phaser.Geom.Triangle.Rotate(triangle, 45);
    graphics.fillTriangleShape(triangle);

    bubble.setY(y - bubble.height);
    //console.log(bubble);
  }
}
