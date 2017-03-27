const Game = require("./game");
const Board = require("./board");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  console.log(canvasEl);
  console.log("hi there");

  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new Board(game, ctx).start();
});
