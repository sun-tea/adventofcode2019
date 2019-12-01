// Day 1: The Tyranny of the Rocket Equation
import { parseFile } from 'helpers';

const part1 = content =>
  content.reduce((acc, mass) => acc + Math.floor(mass / 3) - 2, 0);

(() => {
  const args = process.argv.slice(2);
  const filePath = args[0] || 'day1.txt';
  const content = parseFile(filePath);
  console.log(`part1: ${part1(content)}`);
})();
