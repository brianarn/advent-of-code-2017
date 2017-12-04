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

    const max = Math.max.apply(Math, values);
    const min = Math.min.apply(Math, values);

    log.debug(`(max, min) = (${max}, ${min})`);

    const diff = max - min;
    log.debug(`diff: ${diff}`);

    checksum += diff;
    log.debug(`New checksum: ${checksum}`);
  });

  log.debug(`Final checksum: ${checksum}`);
  return checksum;
};
