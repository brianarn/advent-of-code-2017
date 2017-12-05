const tap = require('tap');

const solver = require('../easy-solver');

tap.equal(solver('aa bb cc dd ee'), true);
tap.equal(solver('aa bb cc dd aa'), false);
tap.equal(solver('aa bb cc dd aaa'), true);
