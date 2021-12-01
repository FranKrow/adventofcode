// Day 3: Toboggan Trajectory

const fs = require('fs');
const readline = require('readline');

var start = new Date();

let file = readline.createInterface({
  input: fs.createReadStream('3.txt'),
  output: process.stdout,
  terminal: false,
});

let row = 0,
  rigth = 3;
treeCounter = 0;

// Part 1
// const init = async () => {
//   for await (let line of file) {
//     if (row != 0) {
//       let lineArr = line.split('');

//       while (lineArr[rigth * row] == undefined) {
//         line = line.concat(line);
//         lineArr = line.split('');
//       }

//       if (lineArr[rigth * row] === '#') {
//         treeCounter++;
//       }
//     }
//     row++;
//   }
//   console.log(`Total trees: ${treeCounter}`);

//   console.info('Execution time: %dms', new Date() - start);
// };

// init();

// Part 2
row = 0;
rigth = [1, 3, 5, 7, 1];
let down = [1, 1, 1, 1, 2];
let answers = [];
const init = async () => {
  for (let r = 0; r < rigth.length; r++) {
    treeCounter = 0;
    row = 0;
    file = readline.createInterface({
      input: fs.createReadStream('3.txt'),
      output: process.stdout,
      terminal: false,
    });
    for await (let line of file) {
      let lineArr = line.split('');

      if (row != 0 && row % down[r] == 0) {
        while (lineArr[(rigth[r] * row) / down[r]] == undefined) {
          line = line.concat(line);
          lineArr = line.split('');
        }

        if (lineArr[(rigth[r] * row) / down[r]] === '#') {
          treeCounter++;
        }
      }
      row++;
    }
    console.log(`Total trees: ${treeCounter} in the slope ${rigth[r]}`);
    answers.push(treeCounter);
  }
  const reducer = (accumulator, currentValue) => accumulator * currentValue;
  console.log(`Total of trees is: ${answers.reduce(reducer)}`);

  console.info('Execution time: %dms', new Date() - start);
};

init();
