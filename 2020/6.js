const fs = require('fs');
const readline = require('readline');

var start = new Date();

let groups = 0;
let yesAnswersByGroup = [];
let yesAnswersByGroupCounter = 0;
let validGroup = true;
const file = readline.createInterface({
  input: fs.createReadStream('6.txt'),
  output: process.stdout,
  terminal: false,
});

const init = async () => {
  for await (let line of file) {
    if (line.length != 0) {
      if (validGroup) {
        if (yesAnswersByGroup.length == 0) {
          yesAnswersByGroup = [...new Set(yesAnswersByGroup.concat(line.split('')))];
        } else {
          yesAnswersByGroup = line.split('').filter((value) => yesAnswersByGroup.includes(value));
          validGroup = yesAnswersByGroup.length != 0;
        }
      }
    } else {
      yesAnswersByGroupCounter += [...new Set(yesAnswersByGroup)].length;
      // console.log(`This group has ${yesAnswersByGroup.length} all yes answers`);
      groups++;
      yesAnswersByGroup = [];
      validGroup = true;
    }
  }

  if (yesAnswersByGroup.length != 0) {
    yesAnswersByGroupCounter += [...new Set(yesAnswersByGroup)].length;
    // console.log(`This group has ${yesAnswersByGroup.length} all yes answers`);
    groups++;
    yesAnswersByGroup = [];
  }

  console.log(
    `Total groups: ${groups} number of questions to which everyone answered "yes" ${yesAnswersByGroupCounter}`
  );

  console.info('Execution time: %dms', new Date() - start);
};

init();
