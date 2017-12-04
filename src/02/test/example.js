const tap = require('tap');

const solver = require('../solver');

const input = `5 1 9 5
7 5 3
2 4 6 8`;

tap.equal(solver(input), 18);
