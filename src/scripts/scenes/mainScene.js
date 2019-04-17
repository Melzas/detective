import Inventory from '../objects/Inventory';
import Place from '../objects/Place';

export default class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.place = new Place(this, 'forest');
    // const place = new Place(this, 'waterfall');

    //AUDIO
    //let music = this.sound.add('bg');
    //music.play();

    //INVENTORY
    this.inventory = new Inventory(this);
    this.inventory.addItem('currency');
  }

  update() {
    this.place.update();
  }
}
