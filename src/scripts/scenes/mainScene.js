import Inventory from '../objects/Inventory';
import Place from '../objects/Place';

export default class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    let self = this;

    //List of places
    this.places = new Array();
    let places = Place.getItems();
    places.forEach(function (place) {
      self.places.push(place);
    });


    // console.log(this.places);
    this.place = new Place(this, 'forest');
    //this.place = new Place(this, 'waterfall');

    //INVENTORY
    this.inventory = new Inventory(this);
    this.inventory.addItem('currency');
  }

  update() {
    this.place.update(this);
  }
}
