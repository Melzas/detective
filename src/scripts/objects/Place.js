import Player from "./Player";
import Pnj from "./Pnj";

const places = [
  {
    key: 'forest',
    ground: 520,
    background: 'forest1',
    music: 'forest',
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
    worldSizeW: 2560,
    ground: 560,
    background: 'waterfall',
    music: 'waterfall',
    player: { x: 2400, defaultFrame: 8 },
    pnjs: [
      {
        key: 'smourbiff1',
        x: 30,
        y: 600,
        defaultDialog: 1
      }
    ],
    directions: [
      {
        key: 'arrowRight',
        x: 2400,
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
    scene.placeCurrentIndex = places.map(e => e.key).indexOf(key);

    if (item) {

      if (typeof scene.dialogBox.visible !== 'undefined' || scene.dialogBox.visible === true) {
        scene.dialogBox.shutdown();
      }

      //BG
      if (typeof this.background !== 'undefined') {
        this.background.destroy();
      }
      this.background = scene.add.image(0, 0, item.background).setOrigin(0, 0).setInteractive();

      //PLAYER
      let player = new Player(scene, item.player.x, item.ground, this.background, item.player.defaultFrame);
      scene.player = player;

      //WORLD
      if (typeof item.worldSizeW !== 'undefined') {
        scene.cameras.main.setBounds(0, 0, item.worldSizeW, scene.sys.game.config.height).setName('main');
      }
      else {
        scene.cameras.main.setBounds(0, 0, scene.sys.game.config.width, scene.sys.game.config.height).setName('main');
      }
      scene.cameras.main.startFollow(scene.player, true, 0.5, 0.5);


      //AUDIO
      if (typeof item.music !== 'undefined') {
        if (typeof scene.musicCurrent !== 'undefined') {
          scene.musicCurrent.destroy();
        }
        scene.musicCurrent = scene.sound.add(item.music).setLoop(true);
        scene.musicCurrent.play();
      }

      //PNJs
      if (typeof item.pnjs !== 'undefined' && item.pnjs.length) {
        item.pnjs.forEach(function (pnjItem) {
          let pnj = new Pnj(scene, pnjItem.x, pnjItem.y || item.ground, pnjItem.key, player);

          if (pnjItem.defaultDialog > 0) {
            pnj.on('pointerdown', function () {
              pnj.dialog(pnjItem.defaultDialog);
            });
          }
        });
      }

      //Directions
      if (typeof item.directions !== 'undefined' && item.directions.length) {
        //On check si on n'a pas déjà ajouté ces élements à la scene
        if (typeof item.directionsObject === 'undefined') {
          item.directionsObject = new Array();
        }

        item.directions.forEach(function (directionItem, i) {
          let direction = scene.add.image(directionItem.x, directionItem.y, directionItem.key).setOrigin(0, 0).setInteractive();

          //Si on a pas déjà ajouté ces élements à la scene
          if (typeof item.directionsObject[i] !== 'undefined') {
            direction.visible = item.directionsObject[i].visible;
          }
          else {
            direction.visible = typeof directionItem.visible !== 'undefined' ? directionItem.visible : true;
            item.directionsObject.push(direction);
          }

          if (typeof directionItem.callback !== 'undefined') {
            direction.on('pointerdown', function () {
              directionItem.callback(scene);
            });
          }
        });
      }

    }

  }

  update(scene) {
    scene.player.update();
  }

  static getItems() {
    return places;
  }
}
