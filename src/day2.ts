// Day 2: 1202 Program Alarm
import { parseFile } from 'helpers';

const execute = memory => {
  for (let i = 0; i <= memory.length; i += 4) {
    if (memory[i] === 1) {
      memory[memory[i + 3]] = memory[memory[i + 1]] + memory[memory[i + 2]];
    } else if (memory[i] === 2) {
      memory[memory[i + 3]] = memory[memory[i + 1]] * memory[memory[i + 2]];
    } else if (memory[i] === 99) {
      return memory[0];
    } else {
      console.log('Something went wrong');
      return;
    }
  }
};

const part1 = content => {
  const memory = content[0].split(',').map(n => parseInt(n, 10));

  memory[1] = 12;
  memory[2] = 2;

  return execute(memory);
};

const part2 = content => {
  const memory = content[0].split(',').map(n => parseInt(n, 10));
  const expectedOutput = 19690720;

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      let input = [...memory];
      input[1] = noun;
      input[2] = verb;

      const output = execute(input);

      if (output === expectedOutput) {
        return 100 * noun + verb;
      }
    }
  }
};

(() => {
  const args = process.argv.slice(2);
  const filePath = args[0] || 'day2.txt';
  const content = parseFile(filePath);
  console.log(`part1: ${part1(content)}`);
  console.log(`part2: ${part2(content)}`);
})();
