// Day 4: Secure Container

const part1 = content => {
  const [start, end] = content.split('-');
  const possiblePasswords = [];

  const firstRegex = /(\d)\1/;
  const secondRegex = /^(?=\d{6}$)0*1*2*3*4*5*6*7*8*9*$/;
  for (let i = start; i <= end; i++) {
    if (firstRegex.exec(i) && secondRegex.exec(i)) {
      possiblePasswords.push(i);
    }
  }

  return possiblePasswords.length;
};

const part2 = content => {
  const [start, end] = content.split('-');
  const possiblePasswords = [];

  const firstRegex = /(?:^|(.)(?!\1))(\d)\2(?!\2)/;
  const secondRegex = /^(?=\d{6}$)0*1*2*3*4*5*6*7*8*9*$/;
  for (let i = start; i <= end; i++) {
    if (firstRegex.exec(i) && secondRegex.exec(i)) {
      possiblePasswords.push(i);
    }
  }

  return possiblePasswords.length;
};

(() => {
  console.log(`part1: ${part1('357253-892942')}`);
  console.log(`part2: ${part2('357253-892942')}`);
})();
