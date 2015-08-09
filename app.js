'use strict';

var UNITS = [1, 5, 10, 50, 100, 500, 1000];
var ROMAN = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

var cache = {};

var lookupRoman = function (num) {
  var index = UNITS.indexOf(num);
  return (index > -1) ? ROMAN[index] : undefined;
};

var getNextUnit = function (num) {
  var _unit;

  UNITS.every(function (unit) {
    if (num < unit) {
      _unit = unit;
    }

    return !_unit;
  });

  return _unit;
};

var getPreviousUnit = function (num) {
  var index;

  UNITS.forEach(function (unit, i) {
    if (num > unit) {
      index = i;
    }
  });

  return UNITS[index];
};

var getNextRoman = function (num) {
  var nextUnit = getNextUnit(num);
  return nextUnit ? ROMAN[UNITS.indexOf(nextUnit)] : undefined;
};

var getPreviousRoman = function (num) {
  var previousUnit = getPreviousUnit(num);
  return previousUnit ? ROMAN[UNITS.indexOf(previousUnit)] : undefined;
};

var toRoman = function (num) {
  var result;
  var previousRoman;
  var nextRoman;
  var diffPrev;
  var diffNext;
  var nextUnit;
  var previousUnit;

  result = cache[num];

  if (num > 0 && !result) {
    result = lookupRoman(num);
    
    if (!result) {
      nextRoman = getNextRoman(num);
      previousRoman = getPreviousRoman(num);
      nextUnit = getNextUnit(num);
      previousUnit = getPreviousUnit(num);
      diffPrev = num - previousUnit;
      diffNext = nextUnit - num;

      if (diffNext === 1) {
        result = toRoman(diffNext) + nextRoman;

      } else {
        result = previousRoman + toRoman(diffPrev);

      }
    }

    cache[num] = result;
  }

  return result;
};

// ================================================

var SYMBOLS = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000
};

var fromRoman = function (roman) {
  var sum = 0;
  var lastVal;

  roman.split('').reverse().forEach(function (val) {
    val = SYMBOLS[val.toUpperCase()];

    if (val < lastVal) {
      sum -= val;
    } else {
      sum += val;
    }

    lastVal = val;
  });

  return sum;
};

var isNumber = function (number) {
  return typeof number === 'number' || number.constructor === Number;
};

module.exports = function (input) {
  return isNumber(input) ? toRoman(input) : fromRoman(input);
};
