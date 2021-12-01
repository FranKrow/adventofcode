const fs = require('fs');
const readline = require('readline');

var start = new Date();
const fileValuesArray = [];
const file = readline.createInterface({
  input: fs.createReadStream('10.txt'),
  output: process.stdout,
  terminal: false,
});

const init = async () => {
  for await (let line of file) {
    if (line.length > 0) {
      fileValuesArray.push(Number.parseInt(line));
    }
  }

  // TODO: The solution for this problem

  let chargingOutlet = 0;
  let minMaxJolts = 3;
  let fileValuesArraySorted = fileValuesArray.sort((a, b) => a - b);
  let joltageAdapters = [],
    adaptersOf1 = [],
    adaptersOf3 = [];
  do {
    console.log(`Searching for ${chargingOutlet}`);

    joltageAdapters = fileValuesArraySorted.filter((currentValue) => {
      if (currentValue <= chargingOutlet + minMaxJolts) {
        if (currentValue == chargingOutlet + 1) {
          adaptersOf1.push(currentValue);
        }

        if (currentValue == chargingOutlet + 3) {
          adaptersOf3.push(currentValue);
        }

        return currentValue;
      }
    });

    console.log(joltageAdapters);
    joltageAdapters.shift();
    chargingOutlet = joltageAdapters.shift();
  } while (chargingOutlet != undefined);

  console.info('Execution time: %dms', new Date() - start);
};

init();
