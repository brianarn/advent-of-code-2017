const tap = require('tap');

const solver = require('../hard-solver');

const input = `5 9 2 8
9 4 7 3
3 8 6 5`;

tap.equal(solver(input), 9);
