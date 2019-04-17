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
        text: "Merci ! Va au nord de la forêt, il y a une cascade. Tu en trouveras surement un !",
      }
    ],
    drops: [
      {
        key: 'currency',
        callback: function (self) {
          self.dialog(2);

          console.log(self.scene.directions);
          let item = self.scene.directions.find(
            (itemObject) => {
              return itemObject.texture.key === 'arrowTop';
            }
          );

          if (item) {
            item.visible = true;
          }

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

    //On check si l'item dropped existe parmi les items recevable du PNJ
    let drop = this.item.drops.find(
      (itemObject) => {
        return itemObject.key === key;
      }
    );

    //Si c'est le cas
    if (drop) {
      //On execute la fonction associé
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
      if (typeof this.scene.dialogBox.visible === 'undefined' || this.scene.dialogBox.visible === false) {
        this.scene.dialogBox.init();
      }
      this.scene.dialogBox.setOwner(this.item.name);
      this.scene.dialogBox.setText(dialog.text, true);

      if (typeof dialog.callback !== 'undefined') {
        dialog.callback();
      }
    }
  }
}
