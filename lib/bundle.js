/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Words = __webpack_require__(8);

const Util = {
  isOver(session = true){
    return session;
  },

  randomVel(){
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    let x = (plusOrMinus)* ( Math.random() * (0.5 - 0.1) + 0.5);
    let y = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

    return [x, y];
  },

  randomPos(){ // might want to remove
    return [400, 0];
  },

  randomText(){

    let randomIndex = Math.floor(Math.random() * (Words.length));

    return Words[randomIndex];
  },

  pointOfImpact(vel, pos, time){
    return [vel[0]*time + pos[0], vel[1]*time + pos[1]];
  },

  counter_velocity(start, finish, time){
    let x = (finish[0] - start[0])/time;
    let y = (finish[1] - start[1])/time;

    return [x, y];
  },

  dist (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  timeLeft(pos){
    // let distFrom = this.dist(pos, [400, 500]);
    // let distFrom = 500 - pos[1];
    // console.log(distFrom, "distFrom");
    // console.log(100 - (pos[1]/500)*80, "new time");

    return 100 - (pos[1]/500)*80;
  }
};

module.exports = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

const NORMAL_FRAME_TIME_DELTA = 1000/60;

class MovingObject {
  constructor(options) {

    this.pos = options.pos || [0, 400];
    this.vel = options.vel || Util.randomVel();
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;

  }

  move(timeDelta) {
    const velocityScale = 1;
    const offsetX = this.vel[0] * velocityScale;
    const offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if(this.toBeDeleted){
      this.timeLeft--;
    }

    if(this.timeLeft <= 0){
      this.remove();
    }

    if (this.game.isOutOfBounds(this.pos)) {
      this.remove();
    }
  }

  remove() {
    this.game.remove(this);
  }

}



module.exports = MovingObject;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Board {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.playerInput = undefined;
    this.lastTime = 0;
  }

  start() {
    this.game.addMissiles();
    this.game.addBuildings();
    this.playerInput = this.game.getInput();
    this.game.isOver = false;

    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    if(this.game.isOver){
      document.getElementById("user-prompt").blur();

      return;
    }

    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);

    this.game.draw(this.ctx);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }

  endGame(){ // currently not in use
    this.ctx.font = '48px serif';
    this.ctx.fillText('Hello world', 10, 50);

    this.game.missiles.forEach((missile) => {
      missile.remove();
    });

    $('#user-prompt').off( 'input', this.playerInput);
  }
}

module.exports = Board;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Missile = __webpack_require__(6);
const CounterMissile = __webpack_require__(5);
const Building = __webpack_require__(4);
const Util = __webpack_require__(0);

class Game {
  constructor() {
    this.missiles = [];
    this.counter_missiles = [];
    this.buildings = [];

    this.hitPoints = Game.HIT_POINTS;
    this.isOver = true;

  }

  addBuildings(){

    for(let i = 0; i < Game.NUM_BUILDINGS; i++){
      let j = 0;

      if(i >= Game.NUM_BUILDINGS/2){ j = 150; }

      const building = new Building(
        { pos: [i*100 + 50 + j , 375], width: 60, height: 100,
          color: 'green', game: this }
      );

      this.buildings.push(building);
    }

  }

  addMissiles() {

    for (let i = 0; i < Game.NUM_Missles; i++) {
      const missile = new Missile(
        { radius: 5, color: "#ffffff", pos: [400, 0], game: this}
      );
      this.missiles.push(missile);
    }

  }

  addCounterMissile(pos, timeLeft){

    const counter_missile = new CounterMissile(
      { pointOfImpact: pos, pos: [400, 500], timeLeft: timeLeft, game: this}
    );

    this.counter_missiles.push(counter_missile);

  }

  allObjects() {
    return [].concat(this.buildings, this.missiles,   this.counter_missiles);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // ctx.fillStyle = Game.BG_COLOR;
    // ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    let image = document.getElementById('sunset-city');
    ctx.drawImage(image, 0, 0, Game.DIM_X, Game.DIM_Y);



    if(this.isOver){
      ctx.fillStyle = Game.BG_COLOR;
      ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

      ctx.fillStyle = "white";
      ctx.font = "48px 'Press Start 2P', cursive ";
      ctx.fillText('Game Over', 200, 200);

      ctx.font = "24px 'Press Start 2P', cursive";
      ctx.fillText('press "space" to play again', 75, 300);

      this.allObjects().forEach((object) => {
        object.remove();
      });

      this.missiles = [];
      this.buildings = [];
      this.counter_missiles = [];

      $('#user-prompt').off( 'input', this.playerInput);

    } else {
      this.allObjects().forEach((object) => {
        object.draw(ctx);
      });
    }

  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      if( !(object instanceof Building) ){
        object.move(delta);
      }
    });
  }

  checkCollision(){
    this.missiles.forEach((missile) => {
      if(missile.toBeDeleted){return;}

      this.buildings.forEach((building) => {

        if(building.isCollidedWith(missile) && !missile.toBeDeleted){

          this.hitPoints--;
          this.remove(missile);

          building.destroyed = true;
        }

      });

    });

    if(this.hitPoints <= 0){
      this.isOver = true;
      // Game.isOver = true;
    }

  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollision();
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  remove(object){
    if(object instanceof Missile){
      let trash = this.missiles.splice(this.missiles.indexOf(object), 1)[0];

      trash = null;

      const missile = new Missile(
        { radius: 5, color: "#ffffff", pos: [400, 0], game: this}
      );

      this.missiles.push(missile);
    } else if(object instanceof CounterMissile){

      this.counter_missiles.splice(this.counter_missiles.indexOf(object), 1);
    } else{
      this.buildings.splice(this.buildings.indexOf(object), 1);
    }

  }

  getInput(){

    const playerInput= () => {this.compareValues($('#user-prompt').val());};

    $('#user-prompt').on( 'input', playerInput);

    return playerInput;
  }

  compareValues(value){
    this.missiles.some((object) => {
      if(object.toBeDeleted){ return; }

      if(value === object.text){

        let pos = object.prepareForRemove();
        this.addCounterMissile(pos, object.timeLeft);
        $('#user-prompt').val('');

        return true;
      }

      return false;
    });
  }

}

Game.BG_COLOR = "#000000";
Game.DIM_X = 800;
Game.DIM_Y = 500;
Game.FPS = 32;
Game.NUM_Missles = 2;
Game.NUM_BUILDINGS = 6;
Game.HIT_POINTS = 2;

// Game.isOver = true;

module.exports = Game;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class Building {
  constructor(options){
    // super(options);
    this.game = options.game;
    this.pos = options.pos;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;

    this.destroyed = false;
  }

  draw(ctx){

    if(this.destroyed){
      return;
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);

      ctx.fill();

      ctx.fillStyle = '#ffff00';

      for(let i = 0; i < 3; i++){

        for(let j = 0; j < 4; j++){
          ctx.fillRect(this.pos[0] + 5 + i*20, this.pos[1] + 5 + j*20, 10, 10);
        }

      }
      ctx.fill();
    }

  }

  isCollidedWith(object) {
    if (this.destroyed){ return false; }
    return object.pos[1] > this.pos[1] && (object.pos[0] > this.pos[0] && object.pos[0] < this.pos[0] + this.width);
  }

  remove() {
    this.game.remove(this);
  }


}

module.exports = Building;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(0);

class CounterMissile extends MovingObject{
  constructor(options = {}) {
    super(options);
    this.color = '#ADD8E6';
    // this.color = options.color;

    this.pos = [400, 500];
    this.pointOfImpact = options.pointOfImpact;
    this.timeLeft = options.timeLeft;
    // this.timeLeft = Util.timeLeft(this.pointOfImpact);
    // this.timeLeft = 70;
    this.vel = Util.counter_velocity(this.pos, this.pointOfImpact, this.timeLeft);

    this.toBeDeleted = true;

  }

  draw(ctx) {
    let image = document.getElementById('counter-missile');
    ctx.drawImage(image, this.pos[0] - 10, this.pos[1] - 10, 20, 20);
  }

}


module.exports = CounterMissile;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(0);

class Missile extends MovingObject {
    constructor(options = {}) {

      options.color = '#FF0000';
      options.pos = options.pos;
      options.radius = 25;
      options.vel = options.vel;
      super(options);

      this.text = Util.randomText();

      this.timeLeft = 100;
      this.toBeDeleted = false;
      this.pointOfImpact = [0,0];

    }

    draw(ctx) {

      let image = document.getElementById('missile');
      ctx.drawImage(image, this.pos[0] - 50, this.pos[1] - 15, 100, 30);


      ctx.fillStyle = this.color; // font color to write the text with
      let font = "bold " + (this.radius/2) +"px 'Press Start 2P'";
      ctx.font = font;

      // Move it down by half the text height and left by half the text width
      let width = ctx.measureText(this.text).width;
      let height = ctx.measureText("w").width; // this is a GUESS of height

      ctx.fillText(this.text, this.pos[0] - (width/2) ,this.pos[1] + (height/2));

    }

    prepareForRemove(){
      this.color = '#00ff00';

      this.toBeDeleted = true;
      this.timeLeft = Util.timeLeft(this.pos);
      this.pointOfImpact = Util.pointOfImpact(this.vel, this.pos, this.timeLeft);

      return this.pointOfImpact;
    }

}


module.exports = Missile;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(3);
const Board = __webpack_require__(2);

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


/***/ }),
/* 8 */
/***/ (function(module, exports) {

const Words = [
  "hello", "look", "ruby", "miss", "board", "game"
];

module.exports = Words;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map