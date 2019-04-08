const pnjs = [
  {
    key: 'gaia',
    defaultFrame: 9
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

      this.setFrame(item.defaultFrame).setInteractive();
      this.body.setImmovable(true);
      this.body.setAllowGravity(false);
    }

    scene.physics.add.collider(player, this);
  }

  update() {

  }
}
