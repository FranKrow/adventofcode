const fs = require('fs');
const readline = require('readline');

var start = new Date();
var n = 128;
var rows = [...Array(n).keys()];
var n2 = 8;
var cols = [...Array(n2).keys()];
var seatsID = [];
const file = readline.createInterface({
  input: fs.createReadStream('5.txt'),
  output: process.stdout,
  terminal: false,
});

const init = async () => {
  for await (let line of file) {
    let currentCode = line.slice(0, 7).split('');
    for (const letter of currentCode) {
      getRows(letter);
      // console.log(letter, getRows(letter));
    }
    for (const letter of line.slice(7, line.length).split('')) {
      // console.log(letter, getRows(letter));
      getRows(letter);
    }

    // console.log(`For this ${line} seat ID is ${rows[0] * 8 + cols[0]}`);
    seatsID.push(rows[0] * 8 + cols[0]);

    rows = [...Array(n).keys()];
    cols = [...Array(n2).keys()];
  }
  seatsID = seatsID.sort((b, a) => a - b); // Sort the array desc (b,a) ascending (a,b)
  console.log(seatsID[0]);
  // PART 2
  for (const seatID of seatsID) {
    let mySeatId = seatID - 1;
    if (!seatsID.includes(mySeatId)) {
      console.log(mySeatId);
    }
  }
  console.info('Execution time: %dms', new Date() - start);
};

init();

function getRows(letter) {
  if (letter == 'F') {
    rows = rows.slice(0, rows.length / 2);
    return rows;
  } else if (letter == 'B') {
    rows = rows.slice(rows.length / 2, rows.length);
    return rows;
  } else if (letter == 'R') {
    cols = cols.slice(cols.length / 2, cols.length);
    return cols;
  } else if (letter == 'L') {
    cols = cols.slice(0, cols.length / 2);
    return cols;
  }
}
