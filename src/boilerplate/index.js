const fs = require('fs');
const solver = require('./solver');

const input = fs.readFileSync('input.txt', 'utf-8').trim();

const result = solver(input);
console.log(`Result: ${result}`);
