const Game = require('./game.js');
const Ship = require('./ship');

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