import { PathData } from "./data";

export class Board {
  dice = 0;
  xplane: number[] = Array(13)
    .fill(13)
    .map((x, i) => i + 1);
  yplane: number[] = Array(13)
    .fill(13)
    .map((x, i) => i + 1);

  players: Player[] = [
    new Player(1, "red"),
    new Player(2, "blue"),
    new Player(3, "green"),
    new Player(4, "yellow"),
  ];
}

class Player {
  id: number;
  path: any[];
  num = new Coin(1);
  coins: Coin[] = null;
  playerPath = null;
  playerHome = null;
  pathData = null;

  activeCoin = new Coin(1);

  color = null;
  visitedBoxs: any[] = [];

  constructor(type, color) {
    this.pathData = new PathData();
    this.id = type;
    this.color = color;
    this.playerPath = this.getPath(type);
    this.playerHome = this.pathData.homes[type];
    this.coins = [new Coin(1), new Coin(2), new Coin(3), new Coin(4)];
  }

  move() {
    var currPos = this.activeCoin.currentPosition;
    if (currPos >= this.playerPath.length - 1 || currPos < 0) return;
    this.activeCoin.currentPosition = currPos + 1;
    this.activeCoin.x = this.playerPath[currPos].x;
    this.activeCoin.y = this.playerPath[currPos].y;
    this.visitedBoxs.push(this.playerPath[currPos]);
  }

  moveReverse() {
    var currPos = this.activeCoin.currentPosition;
    if (currPos < 0) return;
    if (currPos > 0) this.activeCoin.currentPosition = currPos - 1;
    this.activeCoin.x = this.playerPath[currPos].x;
    this.activeCoin.y = this.playerPath[currPos].y;
  }

  getPath(type) {
    switch (type) {
      case 1:
        return this.pathData.path1;
        break;
      case 2:
        return this.pathData.path2;
        break;
      case 3:
        return this.pathData.path3;
        break;
      case 4:
        return this.pathData.path4;
        break;
    }
  }

  randomNumberGenerator(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

class Coin {
  x = 0;
  y = 0;
  currentPosition: any;

  constructor(position: number) {
    this.currentPosition = position;
  }
}
