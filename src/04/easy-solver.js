const log = require('loglevel');

if (process.env.LOGLEVEL) {
  log.setLevel(process.env.LOGLEVEL);
}

module.exports = function solver(input) {
  log.debug(`Input received: ${input}`);

  const words = input.trim().split(/\s+/);

  const set = new Set();

  let isValid = true;
  for (let i = 0, l = words.length; i < l; i++) {
    const value = words[i];
    if (set.has(value)) {
      isValid = false;
      break;
    }
    set.add(value);
  }

  return isValid;
};
