const fs = require('fs');
const readline = require('readline');

var start = new Date();

const file = readline.createInterface({
  input: fs.createReadStream('8.txt'),
  output: process.stdout,
  terminal: false,
});

const fileDataInArr = [];
let commandIndexExecuted = [];
let acc = 0,
  newIndex = 0;
let orderExecutionArr = [];
let jumpToNop = 0,
  nopToJump = 0,
  skipJump = 0;
let duplicated = false;
const init = async () => {
  for await (let line of file) {
    if (line.length != 0) fileDataInArr.push(line);
  }

  executeCommands(fileDataInArr);

  console.info('Execution time: %dms', new Date() - start);
};

init();

function executeCommand(commandArg) {
  let command = commandArg.split(' ');
  switch (command[0]) {
    case 'acc':
      acc += Number.parseInt(command[1]);
      break;
    case 'jmp':
      jumpToNop++;
      if (jumpToNop == skipJump) {
        // console.log(`Nop instead of Jump ${skipJump}`);
      } else {
        newIndex += Number.parseInt(command[1]);
      }

      // newIndex += Number.parseInt(command[1]);

      break;

    default:
      // nopToJump++;
      // if (nopToJump == skipJump) {
      //   // console.log(`---- Jump instead of nop ${skipJump}`);
      //   newIndex += Number.parseInt(command[1]);
      // }
      break;
  }
}

function executeCommands(commandsArray) {
  for (let iJump = 1; iJump <= 100; iJump++) {
    nopToJump = 0;
    jumpToNop = 0;
    skipJump = iJump;
    commandIndexExecuted = [];
    orderExecutionArr = [];
    duplicated = false;
    acc = 0;
    for (let index = 0; index < fileDataInArr.length; index++) {
      let executionObj = { index };
      if (commandIndexExecuted.includes(index)) {
        duplicated = true;
        // console.log(`Value of ACC in ${index} of [${fileDataInArr.length}] is ${acc}`);
        // console.log(`----------- We have this index again ${index} `);
        break;
      } else {
        commandIndexExecuted.push(index);
      }
      newIndex = index;
      executionObj.prevAcc = acc;
      executeCommand(fileDataInArr[index]);
      executionObj.command = fileDataInArr[index];
      executionObj.afterAcc = acc;
      executionObj.NewIndex = newIndex;

      if (newIndex != index) {
        index = newIndex - 1;
      }
      executionObj.AfterIndex = index;
      orderExecutionArr.push(executionObj);
    }
    // console.log({ nopToJump, jumpToNop, skipJump });

    if (!duplicated) {
      console.log(`|:: Value of ACC is ${acc} ::| ${fileDataInArr[skipJump]}`);
      console.table(orderExecutionArr);
      break;
    }
  }
}
