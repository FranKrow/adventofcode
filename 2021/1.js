// https://adventofcode.com/2021
// How many measurements are larger than the previous measurement?
const fs = require('fs');
const readline = require('readline');
const logger = fs.createWriteStream('1_test_mine.txt', {
    // flags: 'a' // 'a' means appending (old data will be preserved)
});

let file = readline.createInterface({
    input: fs.createReadStream('1.txt'),
    output: process.stdout,
    terminal: false,
});

const init = async () => {
    let prev = null;
    let increased = 0;
    for await (let line of file) {
        line = Number(line);
        if (!prev) {
            logger.write(`${line} [N/A - no previous measurement] \n`)
        } else {
            if (prev < line) {
                increased++;
                logger.write(`${line} [increased] \n`)

            } else {
                logger.write(`${line} [decreased] \n`)
            }
        }


        prev = line;
    }

    console.log(`The increased are: ${increased}`);
};

init();