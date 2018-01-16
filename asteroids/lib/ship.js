const Util = require('./utils');
const MovingObject = require('./moving_object');
const Bullet = require('./bullet');

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