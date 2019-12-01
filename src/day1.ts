// Day 1: The Tyranny of the Rocket Equation
import { parseFile } from 'helpers';

const getRequiredFuel = (acc, mass) => acc + Math.floor(mass / 3) - 2;

const part1 = content => content.reduce(getRequiredFuel, 0);

const getRequiredFuelRecursive = mass => {
  const requiredFuel = Math.floor(mass / 3) - 2;

  if (requiredFuel <= 0) {
    return 0;
  }
  return requiredFuel + getRequiredFuelRecursive(requiredFuel);
};

const part2 = content =>
  content.reduce((acc, mass) => acc + getRequiredFuelRecursive(mass), 0);

(() => {
  const args = process.argv.slice(2);
  const filePath = args[0] || 'day1.txt';
  const content = parseFile(filePath);
  console.log(`part1: ${part1(content)}`);
  console.log(`part2: ${part2(content)}`);
})();
