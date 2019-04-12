let dropZones = [];

export default class DropZone {

  constructor() { }

  static add(object) {
    let zone = object.scene.add.zone(object.x, object.y, object.width, object.height).setRectangleDropZone(object.width, object.height);
    zone.depth = -1;
    dropZones.push({ target: object, item: zone });
  }

  static getItems() {
    return dropZones;
  }
}
