import Player from "./Player";
import Pnj from "./Pnj";

const places = [
  {
    key: 'forest',
    ground: 520,
    background: 'forest1',
    player: { x: 110 },
    pnjs: [
      {
        key: 'gaia',
        x: 1200,
        defaultDialog: 1
      }
    ],
    directions: [
      {
        key: 'arrowTop',
        x: 600,
        y: 400,
        visible: false,
        callback: function (scene) {
          scene.place = new Place(scene, 'waterfall');
        }
      }
    ],
  },
  {
    key: 'waterfall',
    ground: 560,
    background: 'waterfall',
    player: { x: 1200, defaultFrame: 8 },
    directions: [
      {
        key: 'arrowRight',
        x: 1200,
        y: 400,
        callback: function (scene) {
          scene.place = new Place(scene, 'forest');
        }
      }
    ],
  }
];

export default class Place {

  constructor(scene, key) {
    let item = places.find(
      (itemObject) => {
        return itemObject.key === key;
      }
    );

    if (item) {
      //BG
      this.background = scene.add.image(0, 0, item.background).setOrigin(0, 0).setInteractive();

      //PLAYER
      let player = new Player(scene, item.player.x, item.ground, this.background, item.player.defaultFrame);
      this.player = player;

      //PNJs
      if (typeof item.pnjs !== 'undefined' && item.pnjs.length) {
        item.pnjs.forEach(function (pnjItem) {
          let pnj = new Pnj(scene, pnjItem.x, item.ground, pnjItem.key, player);

          if (pnjItem.defaultDialog > 0) {
            pnj.on('pointerdown', function () {
              pnj.dialog(pnjItem.defaultDialog);
            });
          }
        });
      }

      //Directions
      if (typeof item.directions !== 'undefined' && item.directions.length) {
        scene.directions = new Array();

        item.directions.forEach(function (directionItem) {
          let direction = scene.add.image(directionItem.x, directionItem.y, directionItem.key).setOrigin(0, 0).setInteractive();
          scene.directions.push(direction);
          direction.visible = typeof directionItem.visible !== 'undefined' ? directionItem.visible : true;
          if (typeof directionItem.callback !== 'undefined') {
            direction.on('pointerdown', function () {
              directionItem.callback(scene);
            });
          }
        });
      }
    }

  }

  update() {
    this.player.update();
  }
}
