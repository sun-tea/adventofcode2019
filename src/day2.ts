// Day 2: 1202 Program Alarm
import { parseFile } from 'helpers';

const part1 = content => {
  const numbers = content[0].split(',').map(n => parseInt(n, 10));

  numbers[1] = 12;
  numbers[2] = 2;

  for (let i = 0; i <= numbers.length; i += 4) {
    if (numbers[i] === 1) {
      numbers[numbers[i + 3]] =
        numbers[numbers[i + 1]] + numbers[numbers[i + 2]];
    } else if (numbers[i] === 2) {
      numbers[numbers[i + 3]] =
        numbers[numbers[i + 1]] * numbers[numbers[i + 2]];
    } else if (numbers[i] === 99) {
      console.log('Program halted');
      return numbers[0];
    } else {
      console.log('Something went wrong');
      return;
    }
  }
};

(() => {
  const args = process.argv.slice(2);
  const filePath = args[0] || 'day2.txt';
  const content = parseFile(filePath);
  console.log(`part1: ${part1(content)}`);
})();
