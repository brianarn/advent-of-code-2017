const log = require('loglevel');

class Memory {
  constructor() {
    log.debug('Memory: New instance of Memory being created');
    // Our default interior memory, with one value defined
    this._memory = [[1]];

    // This array will hold determined results, with the following results:
    // 0: Invalid input, using NaN as special case, should never be used.
    // 1: Starts with the value 1 as defined in the problem.
    this._cachedResults = [NaN, 1];

    // How long is each side of memory currently?
    this._memorySize = 1;

    // What's our currently defined index into memory?
    this._memX = 0;
    this._memY = 0;

    // When calculating, what should our next coordinate steps be?
    // By default, we'll increase our X by 1, but not our Y.
    this._stepX = 1;
    this._stepY = 0;

    // What was the last value calculated?
    this._lastValueCalculated = 1;
  }

  calculate(value) {
    log.debug(`Memory: calculate(${value}) called`);

    if (value < 1) {
      const msg = `Memory: Invalid value ${value} requested`;
      log.error(msg);
      throw new Error(msg);
    }

    let calcValue = this._cachedResults[value];
    if (calcValue) {
      log.debug(`Already calculated ${value} as ${calcValue}`);
      return calcValue;
    }

    while (this._lastValueCalculated < value) {
      this._calcNextValue();
    }

    calcValue = this._cachedResults[value];
    if (!calcValue) {
      const msg = `Memory: Value still not calculated somehow for ${value}`;
      log.error(msg);
      throw new Error(msg);
    }

    log.debug(`Memory: Returning ${calcValue} for ${value}`);
    return calcValue;
  }

  _grow() {
    log.debug('Memory: _grow called');

    // Our new size will always be +2 of the prior
    const newMemorySize = this._memorySize + 2;
    log.debug(`Memory: Growing memory to a size of ${newMemorySize}`);

    // Set up our new memory and get a reference to current
    const newMemory = [];
    const currentMemory = this._memory;

    // Add a full new empty row across the top
    newMemory.push(Array(newMemorySize));

    // For each row of the current memory,
    // push it in with null'd padding
    currentMemory.forEach(row => {
      newMemory.push([null, ...row, null]);
    });

    // Add one more empty row
    newMemory.push(Array(newMemorySize));

    // Set our new memory values
    this._memory = newMemory;
    this._memorySize = newMemorySize;

    // Increment our current position to represent the position in the new
    // memory
    this._memX++;
    this._memY++;
    log.debug(`Memory: New memory position: (${this._memX}, ${this._memY})`);
  }

  _calcNextValue() {
    log.debug('Memory: _calcNextValue called');

    // Do we need to grow before stepping?
    log.debug(`Memory: Checking if we should grow:
-- memX: ${this._memX}
-- memY: ${this._memY}
-- mem length: ${this._memorySize}`);
    if (this._memX === this._memY && this._memX + 1 === this._memorySize) {
      log.debug(`Memory: Growing`);
      this._grow();
    } else {
      log.debug('Memory: No need to grow memory yet');
    }

    // Step to the next position
    log.debug(`Memory: Stepping from (${this._memX}, ${this._memY}) by (${this._stepX}, ${this._stepY})`);
    this._memX += this._stepX;
    this._memY += this._stepY;
    if (this._memX >= this._memorySize || this._memY >= this._memorySize) {
      const msg = `Memory: Invalid position reached: (${this._memX}, ${this._memY})`;
      console.error(this);
      log.error(msg);
      throw new Error(msg);
    }

    // Calculate surrounding sum
    const value = this._getSurroundingSum();
    this._memory[this._memX][this._memY] = value;
    this._cachedResults.push(value);
    this._lastValueCalculated++;
    log.debug(`Memory: Calculated value ${this._lastValueCalculated} as ${value}`);

    // Determine next step
    const memX = this._memX;
    const memY = this._memY;
    const memSize = this._memorySize - 1;
    let stepX, stepY;

    log.debug(`Memory: At (${memX}, ${memY}) with memory size ${memSize}, determining step`);
    if (memX === memSize && memY === memSize - 1) {
      stepX = 0;
      stepY = -1;
    } else if (memX === memSize && memY === 0) {
      stepX = -1;
      stepY = 0;
    } else if (memX === 0 && memY === 0) {
      stepX = 0;
      stepY = 1;
    } else if (memX === 0 && memY === memSize) {
      stepX = 1;
      stepY = 0;
    }

    // If we figured out a new step value, use it
    if (stepX !== undefined) {
      log.debug(`Memory: Changing step to be (${stepX}, ${stepY})`);
      this._stepX = stepX;
      this._stepY = stepY;
    } else {
      log.debug('Memory: Not changing step');
    }
  }

  _getSurroundingSum() {
    log.debug('Memory: _getSurroundingSum called');

    // Where are we?
    const memX = this._memX;
    const memY = this._memY;
    log.debug(`Memory: Current position: (${memX}, ${memY})`);

    // Determine our possible maximum safe index
    const maxIndex = this._memory.length - 1;
    log.debug(`Memory: Max index: ${maxIndex}`);

    // Figure out our min and max X/Y values to check
    const minX = Math.max(memX - 1, 0);
    const maxX = Math.min(memX + 1, maxIndex);
    const minY = Math.max(memY - 1, 0);
    const maxY = Math.min(memY + 1, maxIndex);

    // The eventual sum
    let sum = 0;

    log.debug(`Memory: Getting sum from (${minX}, ${minY}) to (${maxX}, ${maxY})`);
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        log.debug(`Memory: Evaluating (${x}, ${y})`);

        if (x === memX && y === memY) {
          log.debug('Memory: Same as origin, skipping');
          continue;
        }

        const value = this._memory[x][y];
        if (!value) {
          log.debug(`Memory: No value, skipping`);
          continue;
        }

        log.debug(`Memory: Adding ${value} to sum`);
        sum += value;
        log.debug(`Memory: New sum: ${sum}`);
      }
    }

    log.debug(`Memory: Returning sum: ${sum}`);
    return sum;
  }
}

module.exports = Memory;
