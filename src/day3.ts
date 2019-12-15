// Day 3: Crossed Wires
import { parseFile } from 'helpers';

const parseDirection = (value: string) => {
  const direction = value.charAt(0);
  const distance = parseInt(value.substr(1), 10);

  return { direction, distance };
};

const checkCrossingPath = (path, position) =>
  path.some(([x, y]) => x === position[0] && y === position[1]);

const up = (path, distance, crossingPoints = null, pathFirstWire = null) => {
  const [x, y] = path[path.length - 1];
  for (let i = 1; i <= distance; i++) {
    const nextPos = [x, y + i];
    if (crossingPoints && checkCrossingPath(pathFirstWire, nextPos)) {
      crossingPoints.push(nextPos);
    }
    path.push(nextPos);
  }
};

const down = (path, distance, crossingPoints = null, pathFirstWire = null) => {
  const [x, y] = path[path.length - 1];
  for (let i = 1; i <= distance; i++) {
    const nextPos = [x, y - i];
    if (crossingPoints && checkCrossingPath(pathFirstWire, nextPos)) {
      crossingPoints.push(nextPos);
    }
    path.push(nextPos);
  }
};

const right = (path, distance, crossingPoints = null, pathFirstWire = null) => {
  const [x, y] = path[path.length - 1];
  for (let i = 1; i <= distance; i++) {
    const nextPos = [x + i, y];
    if (crossingPoints && checkCrossingPath(pathFirstWire, nextPos)) {
      crossingPoints.push(nextPos);
    }
    path.push(nextPos);
  }
};

const left = (path, distance, crossingPoints = null, pathFirstWire = null) => {
  const [x, y] = path[path.length - 1];
  for (let i = 1; i <= distance; i++) {
    const nextPos = [x - i, y];
    if (crossingPoints && checkCrossingPath(pathFirstWire, nextPos)) {
      crossingPoints.push(nextPos);
    }
    path.push(nextPos);
  }
};

const generatePath = (
  { path, crossingPoints, pathFirstWire },
  { direction, distance }
) => {
  switch (direction) {
    case 'U':
      up(path, distance, crossingPoints, pathFirstWire);
      break;
    case 'D':
      down(path, distance, crossingPoints, pathFirstWire);
      break;
    case 'R':
      right(path, distance, crossingPoints, pathFirstWire);
      break;
    case 'L':
      left(path, distance, crossingPoints, pathFirstWire);
      break;
  }
  return { path, crossingPoints, pathFirstWire };
};

const shortestManhattanDistance = coords =>
  coords.reduce((res, [x, y]) => {
    const distance = Math.abs(x) + Math.abs(y);
    return distance < res ? distance : res;
  }, Math.abs(coords[0][0]) + Math.abs(coords[0][1]));

const part1 = content => {
  const firstWire = content[0].split(',').map(parseDirection);
  const secondWire = content[1].split(',').map(parseDirection);
  let crossingPoints = [];

  const { path } = firstWire.reduce(generatePath, { path: [[0, 0]] });

  const pathSecondWire = secondWire.reduce(generatePath, {
    path: [[0, 0]],
    crossingPoints,
    pathFirstWire: path,
  });

  const result = shortestManhattanDistance(crossingPoints);

  console.log(result);
};

(() => {
  const args = process.argv.slice(2);
  const filePath = args[0] || 'day3.txt';
  const content = parseFile(filePath);
  console.log(`part1: ${part1(content)}`);
})();
