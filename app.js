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

  Object.keys(KEYS).forEach(function (key) {
    key = parseInt(key);
    if (num > key) {
      previous = key;
    }
  });

  return previous;
};

var toRoman = function (num) {
  var result;
  var previous;
  var next;
  var diffPrev;
  var diffNext;

  if (num > 0) {
    if (KEYS[num]) {
      result = KEYS[num];

    } else {
      next = getNextRoman(num);
      previous = getPreviousRoman(num);
      diffPrev = num - previous;
      diffNext = next - num;

      if (diffPrev === 1) {
        result = KEYS[previous] + KEYS[1];

      } else if (diffNext === 1) {
        result = KEYS[1] + KEYS[next];

      } else if (diffPrev === 2) {
        result = KEYS[previous] + toRoman(2);

      } else if (diffPrev === 3) {
        result = KEYS[previous] + toRoman(3);

      } else if (next - num === 1) {
        result = KEYS[previous] + KEYS[next];

      }
    }
  }

  return result;
};


module.exports = toRoman;