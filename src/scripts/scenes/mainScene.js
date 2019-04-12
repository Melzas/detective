import Player from '../objects/Player'
import Pnj from '../objects/Pnj'
import Inventory from '../objects/Inventory';

export default class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    const ground = 520;

    //BG
    let bg = this.add.image(0, 0, 'forest1').setOrigin(0, 0).setInteractive();
    // this.inventory.addItem('currency');
    // this.inventory.addItem('currency');
    // this.inventory.addItem('currency');
    // this.inventory.addItem('currency');
    // this.inventory.addItem('currency');

    //AUDIO
    //let music = this.sound.add('bg');
    //music.play();

    //PLATFORMS
    // this.platforms = this.physics.add.staticGroup();
    // this.platforms.create(800, 0, 'wall').setOrigin(0, 0).setScale(2).refreshBody();

    //PLAYER
    this.player = new Player(this, 110, ground, bg);

    //PNJ
    let gaia = new Pnj(this, 1200, ground, 'gaia', this.player);
    gaia.on('pointerdown', function () {
      gaia.dialog(1);
    });
    //gaia.dialog(2);

    //INVENTORY
    this.inventory = new Inventory(this);
    this.inventory.addItem('currency');
  }

  update() {
    this.player.update();
  }
}
