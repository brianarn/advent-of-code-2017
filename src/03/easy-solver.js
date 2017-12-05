const log = require('loglevel');

if (process.env.LOGLEVEL) {
  log.setLevel(process.env.LOGLEVEL);
}

module.exports = function solver(input) {
  log.debug(`Input received: ${input}`);
  input = parseInt(input, 10);
  log.debug(`Parsed input: ${input}`);

  // Special case: Square 1 requires no movement
  if (input === 1) {
    log.debug(`Input is 1, returning 0`);
    return 0;
  }

  let steps = 0;
  log.debug(`Starting steps: ${steps}`);

  // Algorithm
  // - Get the square root of the value, rounded up to nearest integer, as sideSize
  // - if sideSize is even, add 1 to get to next odd size
  // - Square sideSize to get bottom right corner, as maxValue
  // - Determine distance from center on current side
  // - Add steps to get to center

  let sideSize = Math.ceil(Math.sqrt(input));
  log.debug(`Initial side size: ${sideSize}`);
  if (sideSize % 2 === 0) {
    log.debug('Adjusting side size to next largest odd value');
    sideSize++;
  }
  log.debug(`Side size: ${sideSize}`);

  let maxValue = sideSize**2;
  log.debug(`Max value: ${maxValue}`);

  // Find the nearest corner below our input
  // noting that the lowest one isn't _truly_ the corner
  // but it'll still work out
  let midpoint = maxValue;
  do {
    midpoint -= (sideSize - 1);
  } while (midpoint >= input);
  log.debug(`Lowest corner value: ${midpoint}`);
  midpoint += Math.floor(sideSize/2);
  log.debug(`Nearest midpoint: ${midpoint}`);

  // Take steps to get to that midpoint
  steps += Math.abs(midpoint - input);
  log.debug(`Steps to get to midpoint: ${steps}`);

  // Determine steps to get into center
  const centerSteps = Math.floor(sideSize / 2);
  log.debug(`Steps in to center: ${centerSteps}`);
  steps += centerSteps;

  log.debug(`Final step count: ${steps}`);
  return steps;
};
