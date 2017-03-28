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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Board {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.missiles = this.game.addMissiles();
  }

  start() {
    // this.bindKeyHandlers();
    this.lastTime = 0;
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);

    this.game.draw(this.ctx);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = Board;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Missile = __webpack_require__(2);
const CounterMissile = __webpack_require__(7);

class Game {
  constructor() {
    this.missiles = [];
    this.counter_missiles = [];

    this.getInput();
  }

  addMissiles() {

    for (let i = 0; i < Game.NUM_Missles; i++) {
      const missile = new Missile(
        { radius: 5, color: "#00FF00", game: this}
      );

      this.missiles.push(missile);
    }

  }

  addCounterMissile(pos){
    const counter_missile = new CounterMissile(
      { pointOfImpact: pos, game: this}
    );

    this.counter_missiles.push(counter_missile);
  }

  allObjects() {
    return [].concat(this.missiles, this.counter_missiles);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  step(delta) {
    this.moveObjects(delta);
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  remove(object){
    if(object instanceof Missile){
      this.missiles.splice(this.missiles.indexOf(object), 1);

      const missile = new Missile(
        { radius: 5, color: "#00FF00", game: this}
      );

      this.missiles.push(missile);
    } else {
      this.counter_missiles.splice(this.counter_missiles.indexOf(object), 1);
    }

  }

  getInput(){
    const compareValues = this.compareValues;
    $('#user-prompt').on( ' keyup', () => {
      this.compareValues($('#user-prompt').val());
    });
  }

  compareValues(value){
    this.allObjects().some((object) => {

      if(value === object.text){
        this.addCounterMissile(object.prepareForRemove());

        $('#user-prompt').val('');
        return true;
      }

      return false;
    });
  }

}

Game.BG_COLOR = "#ffffff";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_Missles = 2;

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(4);
const Util = __webpack_require__(5);

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
      ctx.fillStyle = this.color;

      ctx.beginPath();
      ctx.arc(
        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
      );

      ctx.fill();

      if(this.toBeDeleted){
        ctx.fillRect(this.pointOfImpact[0], this.pointOfImpact[1], 10, 10);
      }

      ctx.fillStyle = "black"; // font color to write the text with
      let font = "bold " + this.radius +"px serif";
      ctx.font = font;
      // Move it down by half the text height and left by half the text width
      let width = ctx.measureText(this.text).width;
      let height = ctx.measureText("w").width; // this is a GUESS of height
      ctx.fillText(this.text, this.pos[0] - (width/2) ,this.pos[1] + (height/2));

    }

    prepareForRemove(){
      this.color = '#ADD8E6';
      this.toBeDeleted = true;
      this.pointOfImpact = Util.pointOfImpact(this.vel, this.pos);
      return this.pointOfImpact;
    }

}


module.exports = Missile;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
const Board = __webpack_require__(0);

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];

  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new Board(game, ctx).start();
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(5);

class MovingObject {
  constructor(options) {
    this.pos = options.pos || Util.randomPos();
    this.vel = options.vel || Util.randomVel();
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;

    this.isWrappable = false;

  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );

    ctx.fill();

  }

  move(timeDelta) {
    const velocityScale = 1;
    const offsetX = this.vel[0] * velocityScale;
    const offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if(this.toBeDeleted){
      this.timeLeft--;
    }

    if(this.timeLeft < 0){
      this.remove();
    }

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  }

  remove() {
    this.game.remove(this);
  }

}

module.exports = MovingObject;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const Util = {
  randomVel(){
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    let x = (plusOrMinus)* (Math.floor(Math.random() * (2 - 1 + 1)) + 1)/2;
    let y = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

    return [x, y];
  },

  randomPos(){
    // let x = Math.ceil(Math.random()*(200- 100 +1)) + 100;
    // let y = Math.ceil(Math.random()*100);
    return [500, 0];
  },

  randomText(){
    let words = ["hello", "absolute", "javascript", "missile", "board", "game"];

    let randomIndex = Math.floor(Math.random() * (words.length));

    return words[randomIndex];
  },

  pointOfImpact(vel, pos){
    return [vel[0]*100 + pos[0], vel[1]*100 + pos[1]];
  },

  counter_velocity(start, finish, time){
    let x = (finish[0] - start[0])/time;
    let y = (finish[1] - start[1])/time;

    return [x, y];
  }
};

module.exports = Util;


/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(4);
const Util = __webpack_require__(5);

class CounterMissile extends MovingObject{
  constructor(options = {}) {
    super(options);
    this.color = '#ADD8E6';
    this.pos = [500, 600];
    this.radius = 5;
    this.pointOfImpact = options.pointOfImpact;
    this.vel = Util.counter_velocity(this.pos, this.pointOfImpact, 100);


    this.timeLeft = 100;
    this.toBeDeleted = true;

  }

}


module.exports = CounterMissile;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map