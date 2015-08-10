[![Build Status](https://travis-ci.org/reergymerej/nomar.svg?branch=1.0.0)](https://travis-ci.org/reergymerej/nomar)

Convert to/from [Roman numerals](https://en.wikipedia.org/wiki/Roman_numerals#Roman_numeric_system) with ease.

```js
var nomar = require('nomar');

nomar('LXXXIX');        // 89
nomar('lxxxix');        // 89
nomar(89);              // LXXXIX
nomar(0);               // ''
nomar(['I', 4, 'X']);   // [1, 'IV', 10]

// invalid values
nomar();          // undefined
nomar(null);      // undefined
nomar(-1);        // undefined
nomar(4000);      // undefined
```

### Installation

```sh
npm install nomar
```
