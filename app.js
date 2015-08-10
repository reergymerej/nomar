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

var UNITS = {
  ONES: 'ONES',
  TENS: 'TENS',
  HUNDREDS: 'HUNDREDS',
  THOUSANDS: 'THOUSANDS'
};

var HASH = {};
HASH[UNITS.ONES] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
HASH[UNITS.TENS] =  ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
HASH[UNITS.HUNDREDS] = ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'];
HASH[UNITS.THOUSANDS] = ['M', 'MM', 'MMM'];

var DESC_UNITS = [
  UNITS.THOUSANDS,
  UNITS.HUNDREDS,
  UNITS.TENS,
  UNITS.ONES
];

var MAX = 3999;

var getRomanByUnit = function (num, unit) {
  return HASH[unit][num - 1];
};

var getParts = function (num) {
  var parts = {};
  num = (num + '').split('').reverse().map(function (x) {
    return parseInt(x);
  });

  parts[UNITS.ONES] = num[0];
  parts[UNITS.TENS] = num[1];
  parts[UNITS.HUNDREDS] = num[2];
  parts[UNITS.THOUSANDS] = num[3];

  return parts;
};

var toRoman = function (num) {
  var parts;
  var roman = '';

  if (num < 0 || num > MAX) {
    roman = undefined;
  } else {
    parts = getParts(num);

    DESC_UNITS.forEach(function (unit) {
      if (parts[unit]) {
        roman += getRomanByUnit(parts[unit], unit);
      }
    });
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

var convert = function (input) {
  return (input === undefined || input === null) ?
    undefined :
    isNumber(input) ? toRoman(input) : fromRoman(input);
};

module.exports = function (input) {
  var result = [];

  if (Array.isArray(input)) {
    input.forEach(function (input) {
      result.push(convert(input));
    });

    return result;
  }

  return convert(input);
};
