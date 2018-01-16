// Function.prototype.inherits = function (parent) {
//   function Surrogate(){}
//   Surrogate.prototype = parent.prototype;
//
//   this.prototype = new Surrogate;
//   this.prototype.constructor = this;
// };

Function.prototype.inherits = function (parent) {
  this.prototype = Object.create(parent.prototype);
  this.prototype.constructor = this;
};

function MovingObject (name) {
  this.name = name;
}

function Ship (name) {
  MovingObject.call(this, name);
}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);

MovingObject.prototype.move = function () {
  console.log("I am moving");
};

const s = new Ship('fred');
console.log(s.name);
s.move();
