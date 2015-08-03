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

var cache = {};

var getNextRoman = function (num) {
  var next;

  Object.keys(KEYS).every(function (key) {
    key = parseInt(key, 10);
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
    key = parseInt(key, 10);
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

  result = cache[num];

  if (num > 0 && !result) {
    if (KEYS[num]) {
      result = KEYS[num];

    } else {
      next = getNextRoman(num);
      previous = getPreviousRoman(num);
      diffPrev = num - previous;
      diffNext = next - num;

      if (diffNext === 1) {
        result = toRoman(diffNext) + KEYS[next];

      } else {
        result = KEYS[previous] + toRoman(diffPrev);

      }
    }

    cache[num] = result;
  }

  return result;
};


module.exports = toRoman;
