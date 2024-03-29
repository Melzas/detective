import 'phaser'
import '@babel/polyfill'

import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import DialogBox from './plugins/DialogBox'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720

const config = {
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene],
  plugins: {
    scene: [
      { key: "dialogBox", plugin: DialogBox, mapping: "dialogBox" }
    ]
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }
}

window.addEventListener('load', () => {
  let game = new Phaser.Game(config)
})
