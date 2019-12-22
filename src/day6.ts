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
    const count = getOrbitsCount(graph, planet, 0);
    return orbitsCount + count;
  }, 0);

  return result;
};

const getOrbitsCount = (graph, planet, count) => {
  if (!graph[planet].orbitsAround) {
    return count;
  }
  return getOrbitsCount(graph, graph[planet].orbitsAround, ++count);
};

const getAllParents = (graph, planet, parents) => {
  if (!graph[planet].orbitsAround) {
    return parents;
  }
  return getAllParents(graph, graph[planet].orbitsAround, [
    ...parents,
    graph[planet].orbitsAround,
  ]);
};

const goUp = (graph, planet) => graph[planet].orbitsAround;
const goDown = (graph, planet, santaPath) =>
  graph[planet].satellites.find(s => santaPath.includes(s));

const part2 = content => {
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

  const santaParents = getAllParents(graph, 'SAN', []);

  let count = -1;
  let planet = 'YOU';
  while (true) {
    planet = goUp(graph, planet);
    count++;
    if (santaParents.includes(planet)) {
      break;
    }
  }

  while (true) {
    planet = goDown(graph, planet, santaParents);
    count++;
    if (graph[planet].satellites[0] === 'SAN') {
      break;
    }
  }

  return count;
};

(() => {
  const args = process.argv.slice(2);
  const filePath = args[0] || 'day6.txt';
  const content = parseFile(filePath);
  console.log(`part1: ${part1(content)}`);
  console.log(`part2: ${part2(content)}`);
})();
