const log = require('loglevel');

if (process.env.LOGLEVEL) {
  log.setLevel(process.env.LOGLEVEL);
}

module.exports = function solver(input) {
  log.debug(`Input received: ${input}`);

  let steps = 0;
  let currentIndex = 0;
  let MaxIndex = input.length;

  log.debug('Starting up!');
  while (currentIndex > -1 && currentIndex < MaxIndex) {
    let prevIndex = currentIndex;
    currentIndex += input[prevIndex];
    steps++;
    log.debug(`Step ${steps} from input[${prevIndex}] (${input[prevIndex]}) to input[${currentIndex}] (${input[currentIndex]})`);

    // Adjust the previous jump location based on new rules
    if (input[prevIndex] >= 3) {
      log.debug(`Decreasing prior step`);
      input[prevIndex]--;
    } else {
      log.debug(`Increasing prior step`);
      input[prevIndex]++;
    }
  }

  log.debug(`Completed steps: ${steps}`);
  log.debug(`Final array: ${input}`);
  return steps;
};
