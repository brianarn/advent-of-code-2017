const tap = require('tap');

const solver = require('../hard-solver');

tap.equal(solver(1), 1);
tap.equal(solver(2), 1);
tap.equal(solver(3), 2);
tap.equal(solver(4), 4);
tap.equal(solver(5), 5);
tap.equal(solver(9), 25);
tap.equal(solver(23), 806);
tap.equal(solver(24), 880);
tap.equal(solver(25), 931);
tap.equal(solver(26), 957);
tap.equal(solver(27), 1968);
