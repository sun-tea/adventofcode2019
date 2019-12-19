// Day 6: Universal Orbit Map
import { parseFile } from 'helpers';

const part1 = content => {
  const graph = content.reduce((result, orbit) => {
    const [first, second] = orbit.split(')');

    result[first] = {
      ...(result[first] ? result[first] : { orbitsAround: null }),
      satellites: result[first]
        ? [...result[first].satellites, second]
        : [second],
    };

    result[second] = {
      ...(result[second] ? result[second] : { satellites: [] }),
      orbitsAround: first,
    };

    return result;
  }, {});

  const result = Object.keys(graph).reduce((orbitsCount, planet) => {
    const count = getIndirectOrbitsCount(graph, planet, 0);
    return orbitsCount + count;
  }, 0);

  return result;
};

const getIndirectOrbitsCount = (graph, planet, count) => {
  if (!graph[planet].orbitsAround) {
    return count;
  }
  return getIndirectOrbitsCount(graph, graph[planet].orbitsAround, ++count);
};

(() => {
  const args = process.argv.slice(2);
  const filePath = args[0] || 'day6.txt';
  const content = parseFile(filePath);
  console.log(`part1: ${part1(content)}`);
})();
