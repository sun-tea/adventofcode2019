// Day 5: Sunny with a Chance of Asteroids
import { parseFile } from 'helpers';

const part1 = content => {
  const testProgram = content[0].split(',').map(n => parseInt(n, 10));
  let index = 0;
  let input = 1;

  while (true) {
    let operation = testProgram[index];
    if (operation === 99) {
      console.log('halt');
      return input;
    } else if (operation === 3) {
      testProgram[testProgram[index + 1]] = input;
      index += 2;
    } else {
      operation = operation.toString().split('');
      let intcode;
      let firstMode = 0;
      let secondMode = 0;

      for (let i = operation.length - 1; i >= 0; i--) {
        if (i === operation.length - 1) {
          intcode = operation[i];
          if (intcode === '9') {
            console.log('halt');
            return input;
          }
        } else if (i === operation.length - 3) {
          firstMode = parseInt(operation[i], 10);
        } else if (i === operation.length - 4) {
          secondMode = parseInt(operation[i], 10);
        }
      }

      const firstVal = firstMode
        ? testProgram[index + 1]
        : testProgram[testProgram[index + 1]];
      const secondVal = secondMode
        ? testProgram[index + 2]
        : testProgram[testProgram[index + 2]];

      if (intcode === '1') {
        testProgram[testProgram[index + 3]] = firstVal + secondVal;
        index += 4;
      } else if (intcode === '2') {
        testProgram[testProgram[index + 3]] = firstVal * secondVal;
        index += 4;
      } else if (intcode === '4') {
        input = firstMode
          ? testProgram[index + 1]
          : testProgram[testProgram[index + 1]];
        index += 2;
      }
    }
  }
};

const part2 = content => {
  const testProgram = content[0].split(',').map(n => parseInt(n, 10));
  let index = 0;
  let input = 5;

  while (true) {
    let operation = testProgram[index];
    if (operation === 99) {
      console.log('halt');
      return input;
    } else if (operation === 3) {
      testProgram[testProgram[index + 1]] = input;
      index += 2;
    } else {
      operation = operation.toString().split('');
      let intcode;
      let firstMode = 0;
      let secondMode = 0;

      for (let i = operation.length - 1; i >= 0; i--) {
        if (i === operation.length - 1) {
          intcode = operation[i];
          if (intcode === '9') {
            console.log('halt');
            return input;
          }
        } else if (i === operation.length - 3) {
          firstMode = parseInt(operation[i], 10);
        } else if (i === operation.length - 4) {
          secondMode = parseInt(operation[i], 10);
        }
      }

      const firstVal = firstMode
        ? testProgram[index + 1]
        : testProgram[testProgram[index + 1]];
      const secondVal = secondMode
        ? testProgram[index + 2]
        : testProgram[testProgram[index + 2]];

      if (intcode === '1') {
        testProgram[testProgram[index + 3]] = firstVal + secondVal;
        index += 4;
      } else if (intcode === '2') {
        testProgram[testProgram[index + 3]] = firstVal * secondVal;
        index += 4;
      } else if (intcode === '4') {
        input = firstVal;
        index += 2;
      } else if (intcode === '5') {
        if (firstVal) {
          index = secondVal;
          continue;
        }
        index += 3;
      } else if (intcode === '6') {
        if (!firstVal) {
          index = secondVal;
          continue;
        }
        index += 3;
      } else if (intcode === '7') {
        testProgram[testProgram[index + 3]] = firstVal < secondVal ? 1 : 0;
        index += 4;
      } else if (intcode === '8') {
        testProgram[testProgram[index + 3]] = firstVal === secondVal ? 1 : 0;
        index += 4;
      }
    }
  }
};

(() => {
  const args = process.argv.slice(2);
  const filePath = args[0] || 'day5.txt';
  const content = parseFile(filePath);
  // console.log(`part1: ${part1(content)}`);
  console.log(`part2: ${part2(content)}`);
})();
