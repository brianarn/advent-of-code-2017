const log = require('loglevel');

if (process.env.LOGLEVEL) {
  log.setLevel(process.env.LOGLEVEL);
}

module.exports = function solver(input) {
  log.debug(`Input received: ${input}`);

  // Clone input to be safe
  const memory = Array.from(input);

  let steps = 0;
  const memLength = memory.length;
  const seenMap = new Map();

  log.debug(`Starting memory: ${memory}`);

  while (!seenMap.has(memory.toString())) {
    seenMap.set(memory.toString(), steps);

    const maxValue = Math.max.apply(Math, memory);
    let index = memory.indexOf(maxValue);
    let countToDistribute = maxValue;
    memory[index] = 0;

    if (countToDistribute < 1) {
      throw new Error('Max value is somehow not positive, oops');
    }
    if (index < 0) {
      const msg = `Index came back ${index}, which is invalid`;
      log.error(msg);
      throw new Error(msg);
    }

    log.debug(`Max, index: ${maxValue}, ${index}`);

    do {
      index = (index + 1) % memLength;
      memory[index]++;
      countToDistribute--;
      log.debug(`+1 at ${index}: ${memory}`);
    } while (countToDistribute);

    steps++;
    log.debug(`After step ${steps}: ${memory}`);
  }

  const firstSeenSteps = seenMap.get(memory.toString());

  log.debug(`Final steps: ${steps}\nFirst seen Steps: ${firstSeenSteps}\nMemory: ${memory}`);

  return steps - firstSeenSteps;
};
