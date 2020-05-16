import { Component } from "@angular/core";
import { Board } from "./models/board";
import { PathData } from "./models/data";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Ludo App";

  board = null;
  coins = ["1:1", "2:2"];
  player = null;

  ngOnInit() {
    this.board = new Board();
    this.player = this.board.players[0];
  }

  drawPath(i, j) {
    var data = this.player.playerPath.find(function (ele) {
      return ele.x === i && ele.y === j;
    });

    if (data) {
      return true;
    }
  }

  rollDice() {
    let num = this.randomNumberGenerator(1, 6);
    this.board.dice = num;

    let theLoop: (i: number, delay?) => void = (i: number, delay = 100) => {
      setTimeout(() => {
        this.player.move();
        if (--i) {
          theLoop(i);
        }
      }, delay);
    };
    theLoop(num);

    this.changePlayer();

    this.getCoinPosition();
  }

  changePlayer() {
    if (this.player.id === 4) {
      this.player = this.board.players[0];
    } else {
      this.player = this.board.players[this.player.id];
    }
  }

  killAnimation() {
    let currPos = this.player.activeCoin.currentPosition;
    let theLoop: (i: number, delay?) => void = (i: number, delay = 25) => {
      setTimeout(() => {
        this.player.moveReverse();
        i--;
        if (i > -1) {
          theLoop(i);
        }
      }, delay);
    };
    theLoop(currPos + 1);
  }

  getCoinPosition() {
    // return "transform('translateX:" + this.player.activeCoin.x + "px')";
    try {
      var id = this.player.activeCoin.x + ":" + this.player.activeCoin.y;
      var ele = document.getElementById(id);
      var rect = {
        left: ele.offsetLeft + 9,
        top: ele.offsetTop + 7,
      };

      return "translate(" + rect.left + "px," + rect.top + "px)";
    } catch {}

    return this.player.activeCoin.x;
  }

  getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  }

  drawHomes(x, y) {
    // var home1 = this.player.playerHome.find(function (ele) {
    //   return ele.x === x && ele.y === y;
    // });

    var path = this.player.visitedBoxs.find(function (ele) {
      return ele.x === x && ele.y === y;
    });

    // var coin = this.player.coins.find((ele) => {
    //   return ele.x === x && ele.y === y;
    // });

    var coin = this.player.activeCoin.x === x && this.player.activeCoin.y === y;

    // if (home1 && !coin) {
    //   return "home1";
    // } else

    if (path && !coin) {
      return this.player.color;
    }

    if (coin) {
      return this.player.color;
    }
  }

  randomNumberGenerator(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
