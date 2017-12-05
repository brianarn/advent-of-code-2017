const fs = require('fs');
const easySolver = require('./easy-solver');
const hardSolver = require('./hard-solver');

const input = fs.readFileSync('input.txt', 'utf-8').trim();

const inputInts = input.split('\n').map(value => parseInt(value, 10));

const easyResult = easySolver(inputInts.slice());
console.log(`Easy result: ${easyResult}`);

const hardResult = hardSolver(inputInts.slice());
console.log(`Hard result: ${hardResult}`);
