const log = require('loglevel');

if (process.env.LOGLEVEL) {
  log.setLevel(process.env.LOGLEVEL);
}

module.exports = function solver(input) {
  let sum = 0;

  log.debug(`Received input: ${input}`);
  log.debug(`Starting sum: ${sum}`);

  // Split the input into an array and then normalize into integers
  input = input.split('').map(value => parseInt(value, 10));

  log.debug(`Input pre-analysis: ${input}`);

  // We're told every value should be even length, so this should always be safe
  const inputLength = input.length;
  const halfDistance = inputLength / 2;
  input.forEach((value, index) => {
    log.debug(`Analysizing ${value} at index ${index}`);

    // Compare to the halfway value
    const compIndex = (index + halfDistance) % inputLength;
    const compValue = input[compIndex];
    log.debug(`Comparison value: ${compValue}`);
    if (value === compValue) {
      sum += value;
      log.debug(`Values are equal, new sum: ${sum}`);
    } else {
      log.debug(`Values not equal, not adjusting sum`);
    }
  });

  log.debug(`Final sum: ${sum}`);
  return sum;
};
