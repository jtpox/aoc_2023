const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(
  path.join(__dirname, '../input.txt'),
  { encoding: 'utf8', flag: 'r' }
);
const lines = file.split('\r\n');

const sum = lines.reduce((acc, current, index) => {
  // Get rid of `Game n:`
  const [, contents] = current.split(':');
  const sets = contents.split(';');

  const minimum_cubes = {
    red: 1,
    blue: 1,
    green: 1,
    power: 0,
  };

  const power = sets.reduce((sets_acc, sets_current, sets_index) => {
    const set = [...sets_current.matchAll(/((\d{0,})\s(red|blue|green))/g)];
    for(let i = 0; i < set.length; i++) {
      const [,, number, color] = set[i];
      if(parseInt(number) > sets_acc[color]) sets_acc[color] = parseInt(number);
    }

    if(sets_index === sets.length - 1) {
      sets_acc.power = sets_acc.red * sets_acc.blue * sets_acc.green;
    }

    return sets_acc;
  }, minimum_cubes);

  return acc + power.power;
}, 0);

console.log(sum);