const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');

Util.inherits(Asteroid, MovingObject);

function Asteroid(pos, game){
  this.COLOR = '#fff';
  this.RADIUS = 15;

  const options = {
    pos: pos,
    vel: Util.randomVec(10),
    radius: this.RADIUS,
    color: this.COLOR,
    game: game
  };

  MovingObject.call(this, options);
}

module.exports = Asteroid;