function sum1(){
  let result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}

function sum2(...args){
  let result = 0;
  for (var i = 0; i < args.length; i++) {
    result += args[i];
  }
  return result;
}

Function.prototype.myBind1 = function(context) {
  const bindArgs = Array.from(arguments).slice(1);
  let that = this;
  return function() {
    const callArgs = Array.from(arguments);
    return that.apply(context, bindArgs.concat(callArgs));
  };
};


Function.prototype.myBind2 = function(context, ...bindArgs) {
  return (...callArgs) => this.apply(context, bindArgs.concat(callArgs));
};


function curriedSum(numArgs){
  const numbers = [];

  function _curriedSum(num) {
    numbers.push(num);

    if (numbers.length === numArgs){
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      return numbers.reduce(reducer);
    } else {
      return _curriedSum;
    }
  }

  return _curriedSum;
}

const sum = curriedSum(4);
console.log(sum(5)(30)(20)(1)); // => 56

// Function.prototype.curry = function(numArgs) {
//   const numbers = [];
//
//   let that = this;
//   function _curry(num) {
//     numbers.push(num);
//
//     if (numbers.length === numArgs){
//       return that.apply(that, numbers);
//     } else {
//       return _curry;
//     }
//   }
//
//   return _curry;
// };

Function.prototype.curry = function(numArgs) {
  const numbers = [];
  let that = this;

  function _curry(...args){
    numbers.push(...args);

    if (numbers.length >= numArgs) {
      console.log(numArgs);
      console.log(numbers);
      return that.apply(that, numbers);
    } else {
      return _curry;
    }
  }

  return _curry;
};


function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

// sumThree(4, 20, 6); // == 30

// you'll write `Function#curry`!
// let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
// f1 = f1(4); // [Function]
// f1 = f1(20); // [Function]
// f1 = f1(6); // = 30

// or more briefly:
console.log(sumThree.curry(4)(4,20,6)(2)); // == 30




























