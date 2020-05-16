import { PathData } from "./data";

export class Board {
  dice = 0;
  pathData = new PathData();

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

export class Player {
  id: number;
  path: any[];
  coins: Coin[] = null;
  playerPath = null;
  playerHome = null;
  pathData = null;

  activeCoin: Coin;

  color = null;
  visitedBoxs: any[] = [];

  constructor(type, color) {
    this.pathData = new PathData();
    this.id = type;
    this.color = color;
    this.playerPath = this.getPath(type);
    this.playerHome = this.pathData.homes[type];
    this.coins = this.getCoins(type, color);
    this.activeCoin = this.coins[0];
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

  getCoins(playerId, color) {
    var coins = [];
    switch (playerId) {
      case 1:
        coins.push(new Coin(this.pathData.path1Coins[1], color));
        coins.push(new Coin(this.pathData.path1Coins[2], color));
        coins.push(new Coin(this.pathData.path1Coins[3], color));
        coins.push(new Coin(this.pathData.path1Coins[4], color));
        break;
      case 2:
        coins.push(new Coin(this.pathData.path2Coins[1], color));
        coins.push(new Coin(this.pathData.path2Coins[2], color));
        coins.push(new Coin(this.pathData.path2Coins[3], color));
        coins.push(new Coin(this.pathData.path2Coins[4], color));
        break;
      case 3:
        coins.push(new Coin(this.pathData.path3Coins[1], color));
        coins.push(new Coin(this.pathData.path3Coins[2], color));
        coins.push(new Coin(this.pathData.path3Coins[3], color));
        coins.push(new Coin(this.pathData.path3Coins[4], color));
        break;
      case 4:
        coins.push(new Coin(this.pathData.path4Coins[1], color));
        coins.push(new Coin(this.pathData.path4Coins[2], color));
        coins.push(new Coin(this.pathData.path4Coins[3], color));
        coins.push(new Coin(this.pathData.path4Coins[4], color));
        break;
    }
    return coins;
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

export class Coin {
  x = 0;
  y = 0;
  currentPosition: number = -1;
  color: string = "";

  constructor(_initalPos: any, _color) {
    this.x = _initalPos.x;
    this.y = _initalPos.y;
    this.color = _color;
  }

  getIsPositionEqual(coin: Coin){
    return (this.x == coin.x && this.y == coin.y);
  }
}
