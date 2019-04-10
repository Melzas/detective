export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'PreloadScene',
      active: true,
      physics: {
        default: 'arcade',
        arcade: {
          debug: true
        }
      },
      pack: {
        files: [
          {
            type: 'image',
            key: 'logonoob',
            url: 'assets/images/logo-noob.png'
          }
        ]
      }
    });
  }

  preload() {

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.cameras.main.setBackgroundColor('#222C36');

    this.load.image('logo', 'assets/images/logo.png');

    this.load.image('forest1', 'assets/images/forest1.jpg');
    this.load.image('forest2', 'assets/images/forest2.jpg');
    // this.load.image('wall', 'assets/images/walli.png');
    this.load.image('inventory', 'assets/images/inventory.png');
    this.load.image('currency', 'assets/images/currency.png');
    this.load.spritesheet('sparadra', 'assets/images/sparadra.png', { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('gaia', 'assets/images/gaia.png', { frameWidth: 150, frameHeight: 200 });

    // this.load.audio('opening', ['assets/audio/opening.mp3']);
    // this.load.audio('bg', ['assets/audio/scene2.mp3']);

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.lineStyle(2, 0xFFFFFF, 1.0);
    progressBox.strokeRect((width - 150) / 2, height / 2, 150, 20);

    let logo = this.add.image(width / 2, height / 2 - 75, 'logonoob');

    this.load.on('progress', function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff);
      progressBar.fillRect((width - 150) / 2, height / 2, 150 * value, 20);
    });

    this.load.on('complete', function () {
      logo.destroy();
      progressBar.destroy();
      progressBox.destroy();
    });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.scene.start("MainScene");
    //const music = this.sound.add('opening').setLoop(true)
    //music.play();

    this.add.image(width / 2, height / 2 - 50, 'logo');

    this.add.text(width / 2 - 35, height / 2 + 50, 'PLAY', { font: '30px monospace', fill: '#fff' })
      .setInteractive()
      .on('pointerdown', () => {
        //console.log(this.scene);
        this.scene.start("MainScene");
        //music.stop()
      })

  }
}
