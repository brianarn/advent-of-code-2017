const log = require('loglevel');

if (process.env.LOGLEVEL) {
  log.setLevel(process.env.LOGLEVEL);
}

module.exports = function solver(input) {
  log.debug(`Input received: ${input}`);

  const lines = input.split('\n');
  const spreadsheet = lines.map(line => {
    return line.split(/\s+/).map(value => parseInt(value, 10));
  });
  log.debug('Spreadsheet:');
  log.debug(spreadsheet);

  let checksum = 0;
  log.debug(`Starting checksum value: ${checksum}`);

  spreadsheet.forEach(values => {
    log.debug(`Processing values: ${values}`);

    let numerator, denominator;

    outer:
    for (let i = 0, l = values.length; i < l; i++) {
      for (let j = i + 1; j < l; j++) {
        let valA = values[i];
        let valB = values[j];
        if (valA % valB === 0) {
          numerator = valA;
          denominator = valB;
          break outer;
        } else if (valB % valA === 0) {
          numerator = valB;
          denominator = valA;
          break outer;
        }
      }
    }

    // Safety check: Make sure we found something
    if (numerator === undefined) {
      const msg = 'Could not find two values that evenly divided';
      log.error(msg);
      throw new Error(msg);
    }
    log.debug(`Found values: ${numerator} / ${denominator}`);

    const division = numerator / denominator;
    log.debug(`DivisionRvalue: ${division}`);

    checksum += division;
    log.debug(`New checksum: ${checksum}`);
  });

  log.debug(`Final checksum: ${checksum}`);
  return checksum;
};
