[![Build Status](https://travis-ci.org/reergymerej/nomar.svg?branch=master)](https://travis-ci.org/reergymerej/nomar)

Convert to/from [Roman numerals](https://en.wikipedia.org/wiki/Roman_numerals#Roman_numeric_system) with ease.

```js
var nomar = require('nomar');

nomar('LXXXIX');  // 89
nomar('lxxxix');  // 89
nomar(89);        // LXXXIX
nomar(0);         // ''

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
