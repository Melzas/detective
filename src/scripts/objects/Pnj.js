import DropZone from "./DropZone";
import Inventory from "./Inventory";

const pnjs = [
  {
    key: 'gaia',
    name: 'Gaia',
    defaultFrame: 9,
    dialogs: [
      {
        id: 1,
        text: "Tiens, Sparadra! Il paraît que tu enquêtes sur la disparition des smourbiffs. J'peux te donner une info gratuitement si tu me rapportes 1.000 crédits <3"
      },
      {
        id: 2,
        text: "Merci !",
      }
    ],
    drops: [
      {
        key: 'currency',
        callback: function (object) {
          object.dialog(2);
          return true;
        }
      }
    ],
  }
];

export default class Pnj extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, key, player) {
    let item = pnjs.find(
      (itemObject) => {
        return itemObject.key === key;
      }
    );

    if (item) {
      super(scene, x, y, key);
      scene.add.existing(this);
      scene.physics.add.existing(this);

      this.item = item;

      this.setFrame(item.defaultFrame).setInteractive();
      this.body.setImmovable(true);
      this.body.setAllowGravity(false);
      DropZone.add(this);

      //console.log(this);

      scene.physics.add.collider(player, this);
    }

  }

  onDrop(object) {
    let key = object.texture.key;

    let drop = this.item.drops.find(
      (itemObject) => {
        return itemObject.key === key;
      }
    );
    if (drop) {
      if (drop.callback(this)) {
        Inventory.removeItem(object);
      }
    }
  }

  dialog(id) {
    //console.log(this.item.name);

    let dialog = this.item.dialogs.find(
      (itemObject) => {
        return itemObject.id === id;
      }
    );

    if (dialog) {

      console.log(this.scene.dialogBox.visible);
      if (typeof this.scene.dialogBox.visible === 'undefined' || this.scene.dialogBox.visible === false) {
        this.scene.dialogBox.init();
      }
      this.scene.dialogBox.setOwner(this.item.name);
      this.scene.dialogBox.setText(dialog.text, true);
      console.log(this.scene.dialogBox.visible);

      // let padding = 15;
      // let x = this.x;
      // let y = this.y;

      // let bubble = this.scene.make.text({
      //   text: dialog.text,
      //   // origin: { x: 0, y: 0 },
      //   padding: { x: padding, y: padding },
      //   style: {
      //     stroke: '#000',
      //     font: '18px Arial',
      //     fill: 'black',
      //     backgroundColor: 'white',
      //     wordWrap: { width: 300 }
      //   }
      // });

      // var graphics = this.scene.add.graphics({ fillStyle: { color: 0xffffff } });
      // var triangle = Phaser.Geom.Triangle.BuildEquilateral(x - this.width / 2 + 25, y - this.height / 2, 50);
      // Phaser.Geom.Triangle.Rotate(triangle, 45);
      // graphics.fillTriangleShape(triangle);

      // bubble.setX(x - (bubble.width / 2));
      // bubble.setY(y - this.height / 2 - bubble.height + 25);
      // console.log(bubble);
      // console.log(triangle.y1, bubble.height, triangle.y1 - bubble.height);

      if (typeof dialog.callback !== 'undefined') {
        dialog.callback();
      }
    }
  }
}
