const tap = require('tap');

const solver = require('../hard-solver');

tap.equal(solver('1212'), 6);
tap.equal(solver('1221'), 0);
tap.equal(solver('123425'), 4);
tap.equal(solver('123123'), 12);
tap.equal(solver('12131415'), 4);
