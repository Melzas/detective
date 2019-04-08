import Player from '../objects/Player'
import Pnj from '../objects/Pnj'

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

    //PLAYER
    this.player = new Player(this, 110, ground);

    //PNJ
    this.gaia = new Pnj(this, 1200, ground, 'gaia', this.player);
    this.gaia.on('pointerdown', this.dialogGaia);

  }

  update() {
    this.player.update();
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
