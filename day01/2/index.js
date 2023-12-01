const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(
  path.join(__dirname, '../input.txt'),
  { encoding: 'utf8', flag: 'r' }
);
const lines = file.split('\r\n');

let replacements = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const sum = lines.reduce((acc, current) => {
  const digits = [...current.matchAll(new RegExp(`(?=(\\d|${Object.keys(replacements).join('|')}))`, 'g'))];
  const convert_to_int = digits.map((match) => {
    const [,x] = match;
    if(isNaN(x)) return x.replace(x, replacements[x]);
    return x;
  });
  let number = 0;

  if(convert_to_int.length > 1) number = parseInt(`${convert_to_int[0]}${convert_to_int[convert_to_int.length-1]}`);
  if(convert_to_int.length === 1) number = parseInt(`${convert_to_int[0]}${convert_to_int[0]}`);

  return acc + number;
}, 0);

// Answer should be 54249
console.log(sum);