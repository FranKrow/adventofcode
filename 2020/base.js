const fs = require('fs');
const readline = require('readline');

var start = new Date();
const fileValuesArray = [];
const file = readline.createInterface({
  input: fs.createReadStream('9.txt'),
  output: process.stdout,
  terminal: false,
});

const init = async () => {
  for await (let line of file) {
    if (line.length > 0) {
      fileValuesArray.push(line);
    }
  }

  // TODO: The solution for this problem

  console.info('Execution time: %dms', new Date() - start);
};

init();
