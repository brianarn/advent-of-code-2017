const fs = require('fs');
const easySolver = require('./easy-solver');
const hardSolver = require('./hard-solver');

const input = fs.readFileSync('input.txt', 'utf-8').trim();

const easyResult = easySolver(input);
console.log(`Easy result: ${easyResult}`);

// Start with the first square and build up
let currentSquare = 0;
let currentValue;
do {
  currentSquare++;
  currentValue = hardSolver(currentSquare);
} while (currentValue < input);
console.log(`Hard result: ${currentValue} at square ${currentSquare}`);
