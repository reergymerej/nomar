'use strict';

var SYMBOLS = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000
};

var HASH = {
  ones: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
  tens: ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
  hundreds: ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
  thousands: ['M', 'MM', 'MMM']
};

var getRomanByUnit = function (num, unit) {
  return HASH[unit][num - 1];
};

var getParts = function (num) {
  num = (num + '').split('').reverse().map(function (x) {
    return parseInt(x);
  });

  return {
    ones: num[0],
    tens: num[1],
    hundreds: num[2],
    thousands: num[3]
  };
};

var toRoman = function (num) {
  var parts;
  var roman = '';

  if (num < 0) {
    roman = undefined;
  } else {
    parts = getParts(num);

    if (parts.thousands) {
      roman += getRomanByUnit(parts.thousands, 'thousands');
    }

    if (parts.hundreds) {
      roman += getRomanByUnit(parts.hundreds, 'hundreds');
    }

    if (parts.tens) {
      roman += getRomanByUnit(parts.tens, 'tens');
    }

    if (parts.ones) {
      roman += getRomanByUnit(parts.ones, 'ones');
    }
  }

  return roman;
};

var fromRoman = function (roman) {
  var sum = 0;
  var lastVal;

  roman.split('').reverse().forEach(function (val) {
    val = SYMBOLS[val && val.toUpperCase()] || 0;

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
  return (number !== undefined && number !== null) &&
    (number === 'number' || number.constructor === Number);
};

module.exports = function (input) {
  return (input === undefined || input === null) ?
    undefined :
    isNumber(input) ? toRoman(input) : fromRoman(input);
};
