'use strict';

var KEYS = {
  1: 'I',
  5: 'V',
  10: 'X',
  50: 'L',
  100: 'C',
  500: 'D',
  1000: 'M'
};

var getNextRoman = function (num) {
  var next;

  Object.keys(KEYS).every(function (key) {
    key = parseInt(key);
    if (num < key) {
      next = key;
    }

    return !next;
  });

  return next;
};

var getPreviousRoman = function (num) {
  var previous;

  Object.keys(KEYS).every(function (key) {
    key = parseInt(key);
    if (num > key) {
      previous = key;
    }
  });

  return previous;
};

var toRoman = function (num) {
  var result;
  var next;
  var previous;

  if (KEYS[num]) {
    result = KEYS[num];
  } else {
    next = getNextRoman(num);
    previous = getPreviousRoman(num);

    if (num - previous === 1) {
      result = KEYS[previous] + KEYS[1];
    } else if (num - previous === 2) {
      result = KEYS[previous] + KEYS[1] + KEYS[1];
    }
  }

  return result;
};


module.exports = toRoman;