import { Component } from "@angular/core";
import { Board, Coin, Player } from "./models/board";
import { PathData } from "./models/data";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Ludo App";

  board: Board;
  coins: Coin[];
  activePlayer = null;

  player1;
  player2;
  player3;
  player4;

  ngOnInit() {
    this.board = new Board();
    this.player1 = this.board.players[0];
    this.player2 = this.board.players[1];
    this.player3 = this.board.players[2];
    this.player4 = this.board.players[3];

    this.activePlayer = this.player1;
  }

  ngAfterViewInit() {
    var parent = this;

    setTimeout(() => {
      parent.coins = [
        ...parent.player1.coins,
        ...parent.player2.coins,
        ...parent.player3.coins,
        ...parent.player4.coins,
      ];
    });

    console.log(JSON.stringify(this.coins));
  }

  drawPath(i, j) {
    var data = this.activePlayer.playerPath.find(function (ele) {
      return ele.x === i && ele.y === j;
    });

    if (data) {
      return true;
    }
  }

  rollDice() {
    let num = this.randomNumberGenerator(1, 6);
    this.board.dice = num;

    if (
      this.activePlayer.activeCoin.currentPosition === -1
    ) {
      this.activePlayer.activeCoin.currentPosition = 0;
    }

    let theLoop: (i: number, delay?) => void = (i: number, delay = 100) => {
      var parent = this;
      setTimeout(() => {
        parent.activePlayer.move();
        this.killConflicts(parent.activePlayer);
        if (--i) {
          theLoop(i);
        }
      }, delay);
    };
    theLoop(num);

    this.changePlayer();

    this.getCoinPosition();
  }

  private killConflicts(activePlayer) {
    this.board.players.forEach((Player) => {
      if (Player.id != this.activePlayer.id) {
        let conflictCoins = Player.coins.filter((coin) => coin.getIsPositionEqual(activePlayer.activeCoin));
        if (conflictCoins && conflictCoins.length > 0) {
          Player.activeCoin = conflictCoins[0];
          this.killAnimation(Player);
        }
      }
    });
  }

  changePlayer() {
    if (this.activePlayer.id === 4) {
      this.activePlayer = this.board.players[0];
    } else {
      this.activePlayer = this.board.players[this.activePlayer.id];
    }
  }

  killAnimation(conflictingPlayer: Player) {
    let currPos = conflictingPlayer.activeCoin.currentPosition;
    let theLoop: (i: number, delay?) => void = (i: number, delay = 25) => {
      setTimeout(() => {
        conflictingPlayer.moveReverse();
        i--;
        if (i > -1) {
          theLoop(i);
        }
      }, delay);
    };
    theLoop(currPos + 1);
  }

  getCoinPosition() {
    // return "transform('translateX:" + this.activePlayer.activeCoin.x + "px')";
    try {
      var id =
        this.activePlayer.activeCoin.x + ":" + this.activePlayer.activeCoin.y;
      var ele = document.getElementById(id);
      var rect = {
        left: ele.offsetLeft + 9,
        top: ele.offsetTop + 7,
      };

      return "translate(" + rect.left + "px," + rect.top + "px)";
    } catch { }

    return this.activePlayer.activeCoin.x;
  }

  getCoinXYPosition(coin) {
    var id = coin.x + ":" + coin.y;
    var ele = document.getElementById(id);
    if (ele != undefined) {
      var rect = { left: ele.offsetLeft + 9, top: ele.offsetTop + 7 };
      return "translate(" + rect.left + "px," + rect.top + "px)";
    }

    return "translate(" + 0 + "px," + 0 + "px)";
  }

  getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  }

  drawHomes(x, y) {
    // var home1 = this.activePlayer.playerHome.find(function (ele) {
    //   return ele.x === x && ele.y === y;
    // });

    var path = this.activePlayer.visitedBoxs.find(function (ele) {
      return ele.x === x && ele.y === y;
    });

    // var coin = this.activePlayer.coins.find((ele) => {
    //   return ele.x === x && ele.y === y;
    // });

    var coin =
      this.activePlayer.activeCoin.x === x &&
      this.activePlayer.activeCoin.y === y;

    // if (home1 && !coin) {
    //   return "home1";
    // } else

    if (path && !coin) {
      return this.activePlayer.color;
    }

    if (coin) {
      return this.activePlayer.color;
    }
  }

  randomNumberGenerator(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
