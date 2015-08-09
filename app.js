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

var thresholds = Object.keys(SYMBOLS).map(function (symbol) {
  return SYMBOLS[symbol];
}).sort(function (a, b) {
  return b - a;
});

var REVERSE = {
  1: 'I',
  5: 'V',
  10: 'X',
  50: 'L',
  100: 'C',
  500: 'D',
  1000: 'M'
};

var SUBTRACTIVE = {
  4: 'IV',
  9: 'IX',
  40: 'XL',
  90: 'XC',
  400: 'XD',
  900: 'CM'
};

var SUB_THRESH = {
  5: 1,
  10: 1,
  50: 10,
  100: 10,
  500: 100,
  1000: 100
};

var getThreshold = function (num) {
  var _threshold;

  thresholds.every(function (threshold) {
    if (num >= threshold) {
      _threshold = threshold;
    }

    return !_threshold;
  });

  return _threshold;
};

var getNextThreshold = function (num) {
  var threshold = getThreshold(num);
  var index = thresholds.indexOf(threshold);
  return thresholds[index - 1];
};

var getSubtractiveThreshold = function (num) {
  return SUB_THRESH[num];
};

var getRoman = function (num) {
  var roman = '';
  var threshold = getThreshold(num);
  var thresholdRoman = REVERSE[threshold];
  var nextThreshold = getNextThreshold(num);
  var nextThresholdRoman = REVERSE[nextThreshold];
  var required = Math.floor(num / threshold);
  var accountedFor = 0;
  var isSubtractive = !!SUBTRACTIVE[num];
  var subtractiveThreshold;
  var subtractiveThresholdRoman;
  var remaining;
  
  if (required === 4 || isSubtractive) {
    subtractiveThreshold = getSubtractiveThreshold(nextThreshold);
    subtractiveThresholdRoman = REVERSE[subtractiveThreshold];

    roman += subtractiveThresholdRoman + nextThresholdRoman;
    accountedFor += nextThreshold - subtractiveThreshold;
  } else {
    while (required--) {
      roman += thresholdRoman;
      accountedFor += threshold;
    }
  }

  remaining = num - accountedFor;

  if (remaining) {
    roman += getRoman(remaining);
  }

  return roman;
};

var getParts = function (num) {
  num = (num + '').split('').reverse().map(function (x) {
    return parseInt(x);
  });

  return {
    ones: num[0],
    tens: num[1] && num[1] * 10,
    hundreds: num[2] && num[2] * 100,
    thousands: num[3] && num[3] * 1000
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
      roman += getRoman(parts.thousands);
    }

    if (parts.hundreds) {
      roman += getRoman(parts.hundreds);
    }

    if (parts.tens) {
      roman += getRoman(parts.tens);
    }

    if (parts.ones) {
      roman += getRoman(parts.ones);
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
