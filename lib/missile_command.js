const Game = require("./game");
const Board = require("./board");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  const user_input = document.getElementById("user-prompt");

  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");

  document.body.onkeyup = (e) => {
    if(e.keyCode === 32){
      const game = new Game();
      const board = new Board(game, ctx);
      board.start();

      user_input.focus();
    }
  };

});
