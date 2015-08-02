'use strict';

var will = require('willy').will;
var app = require('../app.js');

describe('1-10', function () {
  it('should return I for 1', function () {
    will(app(1)).be('I');
  });
});