// Day 7: Amplification Circuit
import { parseFile } from 'helpers';

const permute = (permArr, usedChars, input) => {
  let ch;
  for (let i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (!input.length) {
      permArr.push(usedChars.slice());
    }
    permute(permArr, usedChars, input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr;
};

const part1 = content => {
  const testProgram = content[0].split(',').map(n => parseInt(n, 10));

  const permArr = [];
  const usedChars = [];

  const phaseSettings = permute(permArr, usedChars, [0, 1, 2, 3, 4]);
  const thrusterSignals = [];

  for (const phaseSetting of phaseSettings) {
    let input = 0;

    // 5 amplifiers
    for (let i = 0; i < 5; i++) {
      let program = [...testProgram];
      let inputCount = 0;
      let index = 0;

      while (true) {
        let operation = program[index];
        if (operation === 99) {
          break;
        } else if (operation === 3) {
          program[program[index + 1]] = inputCount ? input : phaseSetting[i];
          inputCount = inputCount + 1;
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
                break;
              }
            } else if (i === operation.length - 3) {
              firstMode = parseInt(operation[i], 10);
            } else if (i === operation.length - 4) {
              secondMode = parseInt(operation[i], 10);
            }
          }

          const firstVal = firstMode
            ? program[index + 1]
            : program[program[index + 1]];
          const secondVal = secondMode
            ? program[index + 2]
            : program[program[index + 2]];

          if (intcode === '1') {
            program[program[index + 3]] = firstVal + secondVal;
            index += 4;
          } else if (intcode === '2') {
            program[program[index + 3]] = firstVal * secondVal;
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
            program[program[index + 3]] = firstVal < secondVal ? 1 : 0;
            index += 4;
          } else if (intcode === '8') {
            program[program[index + 3]] = firstVal === secondVal ? 1 : 0;
            index += 4;
          }
        }
      }
    }
    thrusterSignals.push(input);
  }

  const maxSignal = thrusterSignals.reduce(
    (max, value) => (max < value ? value : max),
    0
  );
  return maxSignal;
};

(() => {
  const args = process.argv.slice(2);
  const filePath = args[0] || 'day7.txt';
  const content = parseFile(filePath);
  console.log(`part1: ${part1(content)}`);
})();
