const Game = require("./game");
const Board = require("./board");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  const user_input = document.getElementById("user-prompt");

  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  let game = new Game();

  let isFirstGame = true;

  document.body.onkeyup = (e) => {
    if(e.keyCode === 32){
      $(".start-screen").hide();

      if(game.isOver){

        if(!isFirstGame){
          game = new Game();
        }

        let ctx = canvasEl.getContext("2d");
        let board = new Board(game, ctx);
        board.start();
        user_input.focus();

      }
      isFirstGame = false;
    }


  };

});
