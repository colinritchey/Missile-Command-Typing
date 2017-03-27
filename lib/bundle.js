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

class Game {
  constructor() {
    this.missiles = [];

  }

  addMissiles() {

    for (let i = 0; i < Game.NUM_Missles; i++) {

      const missile = new Missile(
        { pos: [30+i*10, 30+i*10], vel: [2, 2], radius: 5, color: "#00FF00", game: this}
      );
      // this.missiles.push(new Missile({ game: this }));
      this.missiles.push(missile);
    }

    // console.log(this.missiles, "add Missiles");
  }

  // addMissile(){
  //   const missile = new Missile(
  //     { pos: [35, 35], vel: [0.3, 0.3], radius: 5, color: "#00FF00", game: this}
  //   );
  //   this.missiles.push(missile);
  // }

  allObjects() {
    return [].concat(this.missiles);
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
      // console.log(object.pos);
    });
  }

  step(delta) {
    this.moveObjects(delta);
    // this.checkCollisions();
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  remove(object){
    this.missiles.splice(this.missiles.indexOf(object), 1);

    const missile = new Missile(
      { pos: [30, 30], vel: [2, 2], radius: 5, color: "#00FF00", game: this}
    );

    this.missiles.push(missile);
    // console.log(this.missiles);
    // this.addMissile();
  }

  wrap(pos) {
    return [
      this.Utilwrap(pos[0], Game.DIM_X), this.Utilwrap(pos[1], Game.DIM_Y)
    ];
  }

  Utilwrap (coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }

}

Game.BG_COLOR = "#ffffff";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_Missles = 1;

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(4);

class Missile extends MovingObject {
    constructor(options = {}) {

      options.color = '#FF0000';
      options.pos = options.pos;
      options.radius = 25;
      options.vel = options.vel;
      super(options);
    }

    // collideWith(otherObject) {
    //   if (otherObject instanceof Ship) {
    //     otherObject.relocate();
    //         return true;
    //   } else if (otherObject instanceof Bullet) {
    //         this.remove();
    //         otherObject.remove();
    //         return true;
    //     }
    // }
}


module.exports = Missile;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
const Board = __webpack_require__(0);

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {


class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.isWrappable = false;
    // super(options);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );

    ctx.fill();

    let text = "Hello World";

    ctx.fillStyle = "black"; // font color to write the text with
    let font = "bold " + this.radius +"px serif";
    ctx.font = font;
    // Move it down by half the text height and left by half the text width
    let width = ctx.measureText(text).width;
    let height = ctx.measureText("w").width; // this is a GUESS of height
    ctx.fillText(text, this.pos[0] - (width/2) ,this.pos[1] + (height/2));

    // To show where the exact center is:
    // ctx.fillRect(this.pos[0],this.pos[1],5,5);
  }

  move(timeDelta) {
    //timeDelta is number of milliseconds since last move
    //if the computer is busy the time delta will be larger
    //in this case the MovingObject should move farther in this frame
    //velocity of object is how far it should move in 1/60th of a second
    // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    //     offsetX = this.vel[0] * velocityScale,
    //     offsetY = this.vel[1] * velocityScale;
    const velocityScale = 1;
    const offsetX = this.vel[0] * velocityScale;
    const offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

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

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = MovingObject;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map