const fs = require('fs');
const readline = require('readline');

var start = new Date();
let colorsWithShinyGold = [];
let searchingColor = 'shiny gold';
let colorCounter = 0;
let file = readline.createInterface({
  input: fs.createReadStream('7.1.txt'),
  output: process.stdout,
  terminal: false,
});

const init = async () => {
  for await (let line of file) {
    if (line.includes(searchingColor)) {
      let lineArr = line.split(' ');
      let currentColor = `${lineArr[0]} ${lineArr[1]}`;
      if (currentColor != searchingColor) {
        colorsWithShinyGold.push(currentColor);
        colorCounter++;
      }
    }
  }

  for (const currentColor of colorsWithShinyGold) {
    console.log(`------------------------------------------`);
    console.log(`Level 1 ${currentColor}`);
    await searchColor(currentColor);
  }

  console.log(`Total of colors: ${colorCounter}`);

  console.info('Execution time: %dms', new Date() - start);
};

init();

const searchColor = async (color) => {
  file = readline.createInterface({
    input: fs.createReadStream('7.1.txt'),
    output: process.stdout,
    terminal: false,
  });
  console.log(`Searching ${color} at this moment we have ${colorCounter}`);
  for await (let line of file) {
    console.log(line);
    let lineArr = line.split(' ');
    let lineCurrentColor = `${lineArr[0]} ${lineArr[1]}`;

    if (line.includes(color) && lineCurrentColor != color) {
      console.log(`Found ${color} in ${line}`);
      colorCounter++;
      console.log(`------------------------------------------`);
      console.log(`Level 2 ${lineCurrentColor}`);
      searchColor(lineCurrentColor);
    }
  }
};
