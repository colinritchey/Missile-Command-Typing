const Game = require("./game");
const Board = require("./board");

document.addEventListener("DOMContentLoaded", function(){
  document.body.onkeyup = (e) => {
    if(e.keyCode === 32){
    const canvasEl = document.getElementsByTagName("canvas")[0];
    const user_input = document.getElementById("user-prompt");

    canvasEl.width = Game.DIM_X;
    canvasEl.height = Game.DIM_Y;

    let ctx = canvasEl.getContext("2d");


      // debugger;


      let game = new Game();
      let board = new Board(game, ctx);
      board.start();

      user_input.focus();
    }
  };

});
