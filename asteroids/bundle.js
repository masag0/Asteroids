/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 900;
  canvasEl.height = 900;

  const ctx = canvasEl.getContext("2d");
  ctx.fillRect(0, 0, 900, 900);
  ctx.fillStyle = '#000';

  const gameView = new GameView(ctx);
  gameView.start();
});





/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);
const Ship = __webpack_require__(6);

function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
  this.ship = this.game.ship;
}

GameView.prototype.start = function() {
  const one = setInterval(this.game.moveObjects.bind(this.game), 15);
  const two = setInterval(this.game.draw.bind(this.game, this.ctx), 15);
  const three = setInterval(this.game.step.bind(this.game), 15);
  const four = setInterval(() => {
    if (this.checkWon()) {
      clearInterval(one);
      clearInterval(two);
      clearInterval(three);
      clearInterval(four);
      this.ctx.clearRect(0,0,900,900);
      this.ctx.font = "100px sans-serif";
      this.ctx.fillText("Game Over",150,450);
      alert("You Won!");
    }
  }, 500);
  this.bindKeyHandlers();
  // this.game.draw(this.ctx);
};

GameView.prototype.checkWon = function () {
  if (this.game.asteroids.length === 0) {
    return true;
  } else {
    return false;
  }
};

GameView.prototype.bindKeyHandlers = function () {
  let that = this;
  key('a', function () {
    that.ship.power([-0.5, 0]);
  });
  key('s', function () {
    that.ship.power([0, 0.5]);
  });
  key('d', function () {
    that.ship.power([0.5, 0]);
  });
  key('w', function () {
    that.ship.power([0, -0.5]);
  });
  key('space', function () {
    that.ship.fireBullet();
  });
};



module.exports = GameView;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(3);
const Ship = __webpack_require__(6);
const Bullet = __webpack_require__(7);

function Game() {
  this.DIM_X = 900;
  this.DIM_Y = 900;
  this.NUM_ASTEROIDS = 10;
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship(this.randomPosition(), this);
  this.bullets = [];
}

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(this.randomPosition(), this));
  }
};

Game.prototype.randomPosition = function () {
  const result = [];
  result[0] = Math.floor(Math.random() * this.DIM_X);
  result[1] = Math.floor(Math.random() * this.DIM_Y);
  return result;
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,900,900);
  ctx.fillStyle = '#000';
  ctx.fillRect(0,0,900,900);
  for (let i = 0; i < this.allObjects().length; i++) {

    console.log(this.allObjects()[i]);
    this.allObjects()[i].draw(ctx);
  }


};

Game.prototype.moveObjects = function () {
  console.log(this.allObjects());
  for (let i = 0; i < this.allObjects().length; i++) {
    this.allObjects()[i].move();
  }
};

Game.prototype.wrap = function (pos) {
  if (pos[0] < 0) {
    pos[0] += 900;
  } else if (pos[0] > 900) {
    pos[0] -= 900;
  }
  if (pos[1] < 0) {
    pos[1] += 900;
  } else if (pos[1] > 900) {
    pos[1] -= 900;
  }
  return pos;
};

Game.prototype.checkCollisions = function () {
  for (let i = 0; i < this.allObjects().length-1; i++) {
    for(let j = 1; j < this.allObjects().length; j++) {
      if (i === j){
        continue;
      } else if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
        this.allObjects()[i].collideWith(this.allObjects()[j]);
        // alert("collided");
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

// Game.prototype.remove = function (asteroid) {
//   const index = this.asteroids.indexOf(asteroid);
//   this.asteroids.splice(index, 1);
// };

Game.prototype.allObjects = function () {
  console.log(this.asteroids.concat([this.ship]).concat(this.bullets));
  return this.asteroids.concat([this.ship]).concat(this.bullets);
};

Game.prototype.add = function (obj) {
  if (obj instanceof Asteroid) {
    this.asteroids.push(obj);
  }
  if (obj instanceof Bullet) {
    this.bullets.push(obj);
  }
};

Game.prototype.remove = function (obj) {
  if (obj instanceof Asteroid) {
    const index = this.asteroids.indexOf(obj);
    this.asteroids.splice(index, 1);
  }
  if (obj instanceof Bullet) {
    const index = this.bullets.indexOf(obj);
    this.bullets.splice(index, 1);
  }
};

Game.prototype.isOutOfBounds = function (pos) {
  if (pos[0] > 900 || pos[0] < 0 || pos[1] > 900 || pos[1] < 0) {
    return true;
  }
  return false;
};







module.exports = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(4);
const MovingObject = __webpack_require__(5);
const Ship = __webpack_require__(6);
const Bullet = __webpack_require__(7);

Util.inherits(Asteroid, MovingObject);

function Asteroid(pos, game){
  this.COLOR = '#fff';
  this.RADIUS = 25;

  const options = {
    pos: pos,
    vel: Util.randomVec(0.5),
    radius: this.RADIUS,
    color: this.COLOR,
    game: game
  };

  MovingObject.call(this, options);
}

Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Ship ) {
    otherObject.relocate();
  }
  else if (otherObject instanceof Bullet) {
    this.game.remove(otherObject);
    this.game.remove(this);
  }
};

module.exports = Asteroid;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

const Util = {
  inherits: function(childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype);
    childClass.prototype.constructor = childClass;
  },

  randomVec: function(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

// Scale the length of a vector by the given amount.
  scale: function(vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};

module.exports = Util;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );
  ctx.fill();
};

MovingObject.prototype.move = function () {
  // this.pos = this.game.wrap(this.pos);
  if (this.game.isOutOfBounds(this.pos)) {
    if (this.isWrappable(this)) {
      this.game.wrap(this.pos);
    } else {
      this.game.remove(this);
    }
  }
  
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];

};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  const x1 = this.pos[0];
  const y1 = this.pos[1];
  const x2 = otherObject.pos[0];
  const y2 = otherObject.pos[1];

  const r1 = this.radius;
  const r2 = otherObject.radius;

  if ((r1+r2) > Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)) ) {
    return true;
  }

  return false;
};

MovingObject.prototype.collideWith = function (otherObject) {
  // this.game.remove(this);
  // this.game.remove(otherObject);
};

MovingObject.prototype.isWrappable = function () {
  return true;
};


module.exports = MovingObject;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(4);
const MovingObject = __webpack_require__(5);
const Bullet = __webpack_require__(7);

function Ship(pos, game) {
  this.COLOR = '#f00';
  this.RADIUS = 15;

  const options = {
    pos: pos,
    vel: [0, 0],
    radius: this.RADIUS,
    color: this.COLOR,
    game: game
  };

  MovingObject.call(this, options);
}

Util.inherits(Ship, MovingObject);

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.relocate = function () {
  this.vel = [0,0];
  this.pos = this.game.randomPosition();
};

Ship.prototype.fireBullet = function () {
  const pos = this.pos.slice();
  const vel = this.vel.slice();
  const color = this.color;
  const game = this.game;
  const bullet = new Bullet(pos, vel, color, game);

  this.game.add(bullet);

  // console.log(this.game.bullets);
  // console.log("fired bullet");
};







module.exports = Ship;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(5);
const Utils = __webpack_require__(4);
const Asteroid = __webpack_require__(3);


function Bullet(pos, vel, color, game) {
  this.COLOR = color;
  this.RADIUS = 2;
  vel[0] += vel[0]*2;
  vel[1] += vel[1]*2;
  const options = {
    pos: pos,
    vel: vel,
    radius: this.RADIUS,
    color: color,
    game: game
  };

  MovingObject.call(this, options);
}

Utils.inherits(Bullet, MovingObject);

Bullet.prototype.collideWith = function (otherObject) {
  if(otherObject instanceof Asteroid) {
    this.game.remove(this);
    this.game.remove(otherObject);
  }
};

Bullet.prototype.isWrappable = function () {
  return false;
};


module.exports = Bullet;

/***/ })
/******/ ]);