const fs = require('fs');
const easySolver = require('./easy-solver');
const hardSolver = require('./hard-solver');

const input = fs.readFileSync('input.txt', 'utf-8').trim();
const passwords = input.split('\n');

// Easy result
const easyValidPasswords = passwords.filter(easySolver);
console.log(`Number of easy passwords: ${easyValidPasswords.length}`);

// Hard result
const hardValidPasswords = passwords.filter(hardSolver);
console.log(`Number of hard passwords: ${hardValidPasswords.length}`);
