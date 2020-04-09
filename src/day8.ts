// Day 8: Space Image Format
import { parseFile } from 'helpers';

const part1 = (content) => {
  const imageData = content[0].split('').map((n) => parseInt(n, 10));
  const layers = [];

  while (imageData.length) {
    layers.push(imageData.splice(0, 150)); // 25 * 6 pixels
  }

  let targetedLayer = 0;
  layers.reduce((min, layer, i) => {
    const numberOfZeros = layer.filter((digit) => digit === 0).length;

    if (min === undefined) {
      return numberOfZeros;
    } else if (numberOfZeros < min) {
      targetedLayer = i;
      return numberOfZeros;
    } else {
      return min;
    }
  }, undefined);

  const numberOfOnes = layers[targetedLayer].filter((digit) => digit === 1)
    .length;
  const numberOfTwos = layers[targetedLayer].filter((digit) => digit === 2)
    .length;

  return numberOfOnes * numberOfTwos;
};

(() => {
  const args = process.argv.slice(2);
  const filePath = args[0] || 'day8.txt';
  const content = parseFile(filePath);
  console.log(`part1: ${part1(content)}`);
})();
