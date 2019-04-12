import DropZone from "./DropZone";

export default class InventoryItem extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);

    this.setOrigin(0, 0).setInteractive();
    this.depth = 1;

    // var graphics = scene.add.graphics();
    // graphics.lineStyle(2, 0xffff00);
    // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    let dz = new DropZone();
    let zones = dz.getItems();

    if (typeof zones !== 'undefined' && zones.length) {
      scene.input.setDraggable(this);
      scene.input.dragDistanceThreshold = 16;

      this.on('dragstart', function (pointer) {
        this.setAlpha(.5);
      });

      this.on('drag', function (pointer, dragX, dragY) {
        this.x = dragX;
        this.y = dragY;
      });

      let object = this;
      zones.forEach(function (zone) {
        object.on('drop', function (pointer) {
          object.x = zone.x;
          object.y = zone.y;
          console.log(zone);
          // object.input.enabled = false;
        });
      });

      this.on('dragend', function (pointer, dragX, dragY, dropped) {
        if (!dropped) {
          this.x = this.input.dragStartX;
          this.y = this.input.dragStartY;
        }
        this.setAlpha(1);
      });

      this.on('pointerdown', function (pointer) {
        //console.log(texture);
      });
    }
  }

  update() {
  }
}
