const fs = require('fs');
const easySolver = require('./easy-solver');
const hardSolver = require('./hard-solver');

const input = fs.readFileSync('input.txt', 'utf-8').trim();

const easyResult = solver(input);
console.log(`Easy result: ${easyResult}`);

const hardResult = solver(input);
console.log(`Hard result: ${hardResult}`);
