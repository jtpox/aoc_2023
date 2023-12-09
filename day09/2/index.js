const fs = require('fs');
const path = require('path');

const { get_history } = require('../1');

const file = fs.readFileSync(
  path.join(__dirname, '../input.txt'),
  { encoding: 'utf8', flag: 'r' }
);
let input = file.split('\r\n').map(val => val.split(/\s+/).map(spl => parseInt(spl)));

const sum = input.reduce((total, current_sequence, index) => {
  const history = get_history([current_sequence]);
  return total + current_sequence[0] - history.reduceRight((acc, curr, index) => {
    if(index === 0) return acc;
    return curr[0] - acc;
  }, 0);
}, 0);

// Correct answer should be 1136
console.log(sum);