const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(
  path.join(__dirname, '../input.txt'),
  { encoding: 'utf8', flag: 'r' }
);
// const lines = file.split('\r\n').map((s) => s.split(''));
const lines = file.split('\r\n');
lines.pop();

// Get all symbols
const all_symbols = [...file.replaceAll('\r\n', '').matchAll(/[^\d\.]/g)];
const symbols = new Set();
for(let i = 0; i < all_symbols.length; i++) {
  const [sym] = all_symbols[i];
  symbols.add(`\\${sym}`);
}

const regex = new RegExp(`(${Array.from(symbols).join('|')})`);

const sum = lines.reduce((acc, current, index) => {
  // console.log(`Line: ${index+1}`);
  // console.log(current);
  // if(index > 0) return acc;

  const numbers = [...current.matchAll(/\d+/g)];
  // console.log(numbers);
  let sum_of_line = 0;
  for(let i = 0; i < numbers.length; i++) {
    const [number] = numbers[i];
    const { index:num_starting_point } = numbers[i];

    let valid_part = false;
    // Check same line
    const same_line_portion = current.substring(num_starting_point - 1, num_starting_point + number.length + 1)
    valid_part = regex.test(same_line_portion);

    // Check line above
    if(
      lines[index - 1]
      && !valid_part
    ) {
      const above_line = lines[index - 1];
      const portion = above_line.substring(num_starting_point - 1, num_starting_point + number.length + 1);
      // console.log(`Above: ${portion}`);
      valid_part = regex.test(portion);
    }

    // Check line below
    if(
      lines[index + 1]
      && !valid_part
    ) {
      const below_line = lines[index + 1];
      const portion = below_line.substring(num_starting_point - 1, num_starting_point + number.length + 1);
      // console.log(`Below: ${portion}`);
      valid_part = regex.test(portion);
    }

    if(valid_part) {
      // console.log(number);
      sum_of_line += parseInt(number);
    }
  }

  // console.log('---');
  return acc + sum_of_line;
}, 0);

console.log(sum);