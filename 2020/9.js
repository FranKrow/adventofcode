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
      fileValuesArray.push(Number.parseInt(line));
    }
  }
  // PART 1
  // let preamble = 5,
  //   indexArr = 0,
  //   found = false;

  // for (let index = preamble; index < fileValuesArray.length; index++) {
  //   const currentNumber = fileValuesArray[index];
  //   let subArr = fileValuesArray.slice(indexArr, preamble);
  //   // console.log(`Searching: ${currentNumber}`);
  //   found = false;
  //   subArr.forEach((current, ind) => {
  //     subArr.forEach((val, i) => {
  //       if (ind != i) {
  //         if (!found) {
  //           // console.log(`${current} + ${val} = ${current + val}`);
  //           found = current + val == currentNumber;
  //           // console.log(current + val);
  //         }
  //       }
  //     });
  //   });
  //   if (!found) {
  //     console.log(`This value ${currentNumber} is not the sum of 2 numbers.`);
  //     break;
  //   }

  // Part 2
  let indexArr = 0,
    lastIndex = 1,
    found = false;
  const TARGET_NUMBER = 2089807806;

  while (!found && lastIndex < fileValuesArray.length) {
    let contiguosRange = fileValuesArray.slice(indexArr, lastIndex);
    let reducer = (accumulator, currentVal) => accumulator + currentVal;
    let contiguosRangeSum = contiguosRange.reduce(reducer);

    lastIndex++;
    if (contiguosRangeSum == TARGET_NUMBER) {
      contiguosRange.sort((a, b) => a - b);
      let smallest = contiguosRange[0];
      let largest = contiguosRange[contiguosRange.length - 1];
      console.log(`Smallest is ${smallest} largest is ${largest} the sum is ${smallest + largest}`);
      found = true;
    } else if (contiguosRangeSum > TARGET_NUMBER) {
      indexArr++;
      lastIndex = indexArr + 1;
    }
  }

  console.info('Execution time: %dms', new Date() - start);
};

init();
