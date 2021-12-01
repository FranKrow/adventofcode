const fs = require('fs');
const readline = require('readline');
const { inherits } = require('util');

var start = new Date();
let passportCounter = 0,
  validPassportCounter = 0;
const mandatoryKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const optionalKeys = ['cid'];
let foundedKeys = [];
const file = readline.createInterface({
  input: fs.createReadStream('4.txt'),
  output: process.stdout,
  terminal: false,
});

// Part 1
// const init = async () => {
//   for await (let line of file) {
//     if (line.length != 0) {
//       let passportData = line.split(' ');
//       for (const keyValuePair of passportData) {
//         let keyValue = keyValuePair.split(':');
//         if (!foundedKeys.includes(keyValue[0]) && mandatoryKeys.includes(keyValue[0])) {
//           foundedKeys.push(keyValue[0]);
//         }
//       }
//     } else {
//       if (foundedKeys.length == mandatoryKeys.length) {
//         validPassportCounter++;
//       }
//       // New Passport
//       passportCounter++;
//       foundedKeys = [];
//     }
//   }
//   console.log(`Total of passports ${passportCounter} valid passports ${validPassportCounter}`);
//   console.info('Execution time: %dms', new Date() - start);
// };

// init();

// Part 2
const validECL = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
const init = async () => {
  for await (let line of file) {
    if (line.length != 0) {
      let passportData = line.split(' ');
      for (const keyValuePair of passportData) {
        let keyValue = keyValuePair.split(':');
        if (!foundedKeys.includes(keyValue[0]) && mandatoryKeys.includes(keyValue[0])) {
          // Validate each field
          if (validateField(keyValue)) foundedKeys.push(keyValue[0]);
        }
      }
    } else {
      if (foundedKeys.length == mandatoryKeys.length) {
        validPassportCounter++;
      }
      // New Passport
      passportCounter++;
      foundedKeys = [];
    }
  }
  console.log(`Total of passports ${passportCounter} valid passports ${validPassportCounter}`);
  console.info('Execution time: %dms', new Date() - start);
};

init();

function validateField(passportKeyValue) {
  try {
    switch (passportKeyValue[0]) {
      case 'byr':
        return Number(passportKeyValue[1]) >= 1920 && Number(passportKeyValue[1]) <= 2002;
      case 'iyr':
        return Number(passportKeyValue[1]) >= 2010 && Number(passportKeyValue[1]) <= 2020;
      case 'eyr':
        return Number(passportKeyValue[1]) >= 2020 && Number(passportKeyValue[1]) <= 2030;
      case 'hgt':
        if (passportKeyValue[1].includes('cm')) {
          let number = passportKeyValue[1].substring(0, 3);
          return !isNaN(Number(number)) && Number(number) >= 150 && Number(number) <= 193;
        } else if (passportKeyValue[1].includes('in')) {
          let number = passportKeyValue[1].substring(0, 2);
          return !isNaN(Number(number)) && Number(number) >= 59 && Number(number) <= 76;
        } else {
          return false;
        }
      case 'hcl':
        let regexString = new RegExp(/#(?:[a-f\d]{6})/, 'gi');
        return passportKeyValue[1].trim().match(regexString)
          ? passportKeyValue[1].trim().match(regexString).length > 0
          : false;
      case 'ecl':
        return validECL.includes(passportKeyValue[1]);
      case 'pid':
        return !isNaN(Number(passportKeyValue[1])) && passportKeyValue[1].length == 9;
      default:
        return false;
    }
  } catch (error) {
    console.log(error);
  }
}
