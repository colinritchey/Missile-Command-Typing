const Game = require("./game");
const Board = require("./board");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  const user_input = document.getElementById("user-prompt");

  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  let ctx = canvasEl.getContext("2d");

  ctx.fillStyle = "white";
  ctx.font = "48px 'Press Start 2P'";
  ctx.fillText('Missile Command', 40, 200);

  ctx.font = "24px 'Press Start 2P'";
  ctx.fillText('press "space" to start typing', 50, 300);

  document.body.onkeyup = (e) => {
    if(e.keyCode === 32){

      let game = new Game();
      let board = new Board(game, ctx);
      board.start();

      user_input.focus();
    }
  };

});
