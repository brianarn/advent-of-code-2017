const tap = require('tap');

const solver = require('../solver');

tap.equal(solver(1), 0);
tap.equal(solver(12), 3);
tap.equal(solver(23), 2);
tap.equal(solver(1024), 31);
