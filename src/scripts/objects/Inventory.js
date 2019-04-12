import InventoryItem from "./InventoryItem";

let inventoryItems = [];

export default class Inventory extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 0, 0, 'inventory');

    this.scene = scene;
    scene.add.existing(this);

    this.setOrigin(0, 0).setInteractive();

    this.inventoryContainerX = 90;
    this.inventoryContainerY = 40;
  }

  update() {
  }

  addItem(texture) {
    let ml = (inventoryItems.length >= 1 ? 40 : 0);
    let x = this.inventoryContainerX + (inventoryItems.length * (150 + ml));
    //console.log(x, ml, inventoryItems.length);
    let item = new InventoryItem(this.scene, x, this.inventoryContainerY, texture);
    inventoryItems.push(item);
  }
}
