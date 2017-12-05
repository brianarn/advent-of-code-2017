const tap = require('tap');

const solver = require('../easy-solver');

tap.equal(solver([-1]), 1);
tap.equal(solver([1,1]), 2);
tap.equal(solver([0, 3, 0, 1, -3]), 5);
