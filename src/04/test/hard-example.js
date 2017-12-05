const tap = require('tap');

const solver = require('../hard-solver');

tap.equal(solver('abcde fghij'), true);
tap.equal(solver('abcde xyz ecdab'), false);
tap.equal(solver('a ab abc abd abf abj'), true);
tap.equal(solver('iiii oiii ooii oooi oooo'), true);
tap.equal(solver('oiii ioii iioi iiio'), false);
