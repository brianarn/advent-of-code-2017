const fs = require('fs');
const easySolver = require('./easy-solver');
const hardSolver = require('./hard-solver');

const input = fs.readFileSync('input.txt', 'utf-8').trim();

const easyResult = easySolver(input);
console.log(`Easy result: ${easyResult}`);

//const hardResult = hardSolver(input);
//console.log(`Hard result: ${hardResult}`);
