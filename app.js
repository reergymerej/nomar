'use strict';

// var UNITS = [1, 5, 10, 50, 100, 500, 1000];
// var ROMAN = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

// var cache = {};

// var lookupRoman = function (num) {
//   var index = UNITS.indexOf(num);
//   return (index > -1) ? ROMAN[index] : undefined;
// };

// var getNextUnit = function (num) {
//   var _unit;

//   UNITS.every(function (unit) {
//     if (num < unit) {
//       _unit = unit;
//     }

//     return !_unit;
//   });

//   return _unit;
// };

// var getPreviousUnit = function (num) {
//   var index;

//   UNITS.forEach(function (unit, i) {
//     if (num > unit) {
//       index = i;
//     }
//   });

//   return UNITS[index];
// };

// var getNextRoman = function (num) {
//   var nextUnit = getNextUnit(num);
//   return nextUnit ? ROMAN[UNITS.indexOf(nextUnit)] : undefined;
// };

// var getPreviousRoman = function (num) {
//   var previousUnit = getPreviousUnit(num);
//   return previousUnit ? ROMAN[UNITS.indexOf(previousUnit)] : undefined;
// };

// var toRoman = function (num) {
//   var result;
//   var previousRoman;
//   var nextRoman;
//   var diffPrev;
//   var diffNext;
//   var nextUnit;
//   var previousUnit;

//   result = cache[num];

//   if (num > 0 && !result) {
//     result = lookupRoman(num);
    
//     if (!result) {
//       nextRoman = getNextRoman(num);
//       previousRoman = getPreviousRoman(num);
//       nextUnit = getNextUnit(num);
//       previousUnit = getPreviousUnit(num);
//       diffPrev = num - previousUnit;
//       diffNext = nextUnit - num;

//       if (diffNext === 1) {
//         result = toRoman(diffNext) + nextRoman;

//       } else {
//         result = previousRoman + toRoman(diffPrev);

//       }
//     }

//     cache[num] = result;
//   }

//   return result;
// };



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

// var ODDBALLS = {
//   4: { symbol: 'IV', regex: /.*4$/ },
//   9: { symbol: 'IX', regex: /.*9$/ },
//   40: { symbol: 'XL', regex: /.*/ },
//   90: { symbol: 'XC', regex: /.*/ },
//   400: { symbol: 'CD', regex: /.*/ },
//   900: { symbol: 'CM', regex: /.*/ }
// };

// var toRoman = function (num) {
//   var roman = '';
//   var str = num += '';

//   // TODO
//   var emergency = 0;

//   var handleNormal = function (str, num) {
//     var handled;
//     Object.keys(REVERSE).every(function (key) {


//       return !handled;
//     });

//     return num;
//   };

//   while (num && emergency++ < 5) {
//     // check oddballs
//     // Object.keys(ODDBALLS).forEach(function (oddball) {

//     //   if (ODDBALLS[4].regex.test(str)) {
//     //     roman = ODDBALLS[4].symbol + roman;
//     //     num -= 4;
//     //   }
//     // });

//     num = handleNormal(str, num);
//   } 

//   return roman;
// };

// ================================================

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

var getPreviousThreshold = function (num) {
  var threshold = getThreshold(num);
  var index = thresholds.indexOf(threshold);
  return thresholds[index + 1] || thresholds[thresholds.length - 1];
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
  var parts = getParts(num);
  var roman = '';

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
  return typeof number === 'number' || number.constructor === Number;
};

module.exports = function (input) {
  return isNumber(input) ? toRoman(input) : fromRoman(input);
};
