let playerDestination = new Phaser.Math.Vector2();

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'sparadra');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    //Settings
    this.setFrame(6);
    this.body.setAllowGravity(false);

    scene.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNumbers('sparadra', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'left',
      frames: scene.anims.generateFrameNumbers('sparadra', { start: 8, end: 15 }),
      frameRate: 10,
      repeat: -1
    });

    var object = this;
    scene.input.on('pointerdown', function (pointer) {
      playerDestination.x = pointer.x;
      playerDestination.y = y;

      scene.physics.moveTo(object, pointer.x, y, 160);
    });
  }

  update() {
    let distance = Phaser.Math.Distance.Between(this.body.center.x, this.body.center.y, playerDestination.x, playerDestination.y);

    if (typeof this.currentAnim === 'undefined') {
      this.currentAnim = 'right';
    }

    if (this.body.speed > 0) {
      if (this.body.center.x > playerDestination.x) {
        this.setVelocityX(-160);
        this.currentAnim = 'left';
        this.anims.play(this.currentAnim, true);
      }
      else if (this.body.center.x <= playerDestination.x) {
        this.setVelocityX(160);
        this.currentAnim = 'right';
        this.anims.play(this.currentAnim, true);
      }
      else {
        this.setVelocityX(0);

        this.anims.play(this.currentAnim, true);
        //this.anims.stop();
      }

      if (distance < 4) {
        this.body.reset(playerDestination.x, playerDestination.y);
      }
    }
  }
}
