const tap = require('tap');

const solver = require('../easy-solver');

tap.equal(solver('1122'), 3);
tap.equal(solver('1111'), 4);
tap.equal(solver('1234'), 0);
tap.equal(solver('91212129'), 9);
