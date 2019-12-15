// Day 3: Crossed Wires
import { parseFile } from 'helpers';

const parseDirection = (value: string) => {
  const direction = value.charAt(0);
  const distance = parseInt(value.substr(1), 10);

  return { direction, distance };
};

const getStepsScore = (path, intersection) =>
  path.findIndex(([x, y]) => x === intersection[0] && y === intersection[1]);

const checkCrossingPath = (path, position) =>
  path.some(([x, y]) => x === position[0] && y === position[1]);

const move = (path, distance, direction, data) => {
  const [x, y] = path[path.length - 1];
  for (let i = 1; i <= distance; i++) {
    if (data && typeof data.stepsScore !== 'undefined') {
      data.stepsScore++;
    }

    const nextPos =
      direction === 'U'
        ? [x, y + i]
        : direction === 'D'
        ? [x, y - i]
        : direction === 'L'
        ? [x - i, y]
        : [x + i, y];
    if (data && checkCrossingPath(data.pathFirstWire, nextPos)) {
      if (typeof data.stepsScore !== 'undefined') {
        const firstScore = getStepsScore(data.pathFirstWire, nextPos);
        data.crossingPoints.push({
          coords: nextPos,
          scores: [firstScore, data.stepsScore],
        });
      } else {
        data.crossingPoints.push({ coords: nextPos });
      }
    }
    path.push(nextPos);
  }
};

const generatePath = ({ path, data }, { direction, distance }) => {
  move(path, distance, direction, data);
  return { path, data };
};

const shortestManhattanDistance = intersections =>
  intersections.reduce((res, { coords: [x, y] }) => {
    const distance = Math.abs(x) + Math.abs(y);
    return distance < res ? distance : res;
  }, Math.abs(intersections[0].coords[0]) + Math.abs(intersections[0].coords[1]));

const part1 = content => {
  const firstWire = content[0].split(',').map(parseDirection);
  const secondWire = content[1].split(',').map(parseDirection);
  let crossingPoints = [];

  const { path } = firstWire.reduce(generatePath, { path: [[0, 0]] });

  const pathSecondWire = secondWire.reduce(generatePath, {
    path: [[0, 0]],
    data: { crossingPoints, pathFirstWire: path },
  });

  return shortestManhattanDistance(crossingPoints);
};

const part2 = content => {
  const firstWire = content[0].split(',').map(parseDirection);
  const secondWire = content[1].split(',').map(parseDirection);
  let crossingPoints = [];

  const { path } = firstWire.reduce(generatePath, { path: [[0, 0]] });

  const pathSecondWire = secondWire.reduce(generatePath, {
    path: [[0, 0]],
    data: { crossingPoints, pathFirstWire: path, stepsScore: 0 },
  });

  const result = crossingPoints.reduce(
    (res, { scores: [firstScore, secondScore] }) => {
      const scoresSum = firstScore + secondScore;
      return scoresSum < res ? scoresSum : res;
    },
    crossingPoints[0].scores[0] + crossingPoints[0].scores[1]
  );

  return result;
};

(() => {
  const args = process.argv.slice(2);
  const filePath = args[0] || 'day3.txt';
  const content = parseFile(filePath);
  // console.log(`part1: ${part1(content)}`);
  console.log(`part2: ${part2(content)}`);
})();
