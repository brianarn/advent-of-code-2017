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

  // Prepend the last value as first for convenience in checking
  input.unshift(input[input.length - 1]);

  log.debug(`Input pre-analysis: ${input}`);

  const lastInput = input.length - 1;
  input.forEach((value, index) => {
    log.debug(`Analysizing ${value} at index ${index}`);

    // Ignore the last one
    if (index === lastInput) {
      log.debug('Last input, ignoring');
      return;
    }

    // Compare to next value
    const nextVal = input[index + 1];
    log.debug(`Next value: ${nextVal}`);
    if (value === nextVal) {
      sum += value;
      log.debug(`Values are equal, new sum: ${sum}`);
    } else {
      log.debug('Values not equal, not adjusting sum');
    }
  });

  log.debug(`Final sum: ${sum}`);
  return sum;
};
