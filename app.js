'use strict';

var toRomanNumerals = function (num) {

  var result;

  switch (num) {
    case 1:
      result = 'I';
      break;
    case 2:
      result = 'II';
      break;
    case 3:
      result = 'III';
      break;
    case 4:
      result = 'IV';
      break;
    case 5:
      result = 'V';
      break;
    case 6:
      result = 'VI';
      break;
    case 7:
      result = 'VII';
      break;
    case 8:
      result = 'VIII';
      break;
    case 9:
      result = 'IX';
      break;
    case 10:
      result = 'X';
      break;
  }

  return result;
};


module.exports = toRomanNumerals;