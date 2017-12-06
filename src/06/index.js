const fs = require('fs');
const easySolver = require('./easy-solver');
const hardSolver = require('./hard-solver');

const input = fs.readFileSync('input.txt', 'utf-8').trim();
const memory = input.split('\t').map(value => parseInt(value, 10));

const easyResult = easySolver(Array.from(memory));
console.log(`Easy result: ${easyResult}`);

const hardResult = hardSolver(Array.from(memory));
console.log(`Hard result: ${hardResult}`);
