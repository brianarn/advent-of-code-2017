const log = require('loglevel');

if (process.env.LOGLEVEL) {
  log.setLevel(process.env.LOGLEVEL);
}

const Memory = require('./lib/Memory');
const memory = new Memory();

module.exports = function solver(input) {
  log.debug(`Input received: ${input}`);
  input = parseInt(input, 10);
  log.debug(`Parsed input: ${input}`);

  const value = memory.calculate(input);
  log.debug(`Calculated value: ${value}`);

  return value;
};
