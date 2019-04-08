export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'sparadra');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setFrame(6);
    this.body.setAllowGravity(false);

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {

    if (typeof this.currentAnim === 'undefined') {
      this.currentAnim = 'right';
    }

    if (this.cursors.left.isDown) {
      this.setVelocityX(-160);
      this.currentAnim = 'left';
      this.anims.play(this.currentAnim, true);
    }
    else if (this.cursors.right.isDown) {
      this.setVelocityX(160);
      this.currentAnim = 'right';
      this.anims.play(this.currentAnim, true);
    }
    else {
      this.setVelocityX(0);

      this.anims.play(this.currentAnim, true);
      //this.anims.stop();
    }
  }
}
