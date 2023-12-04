const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(
  path.join(__dirname, '../input.txt'),
  { encoding: 'utf8', flag: 'r' }
);
// const lines = file.split('\r\n').map((s) => s.split(''));
const lines = file.split('\r\n');
// lines.pop();

const sum = lines.reduce((acc, current, index) => {
  console.log(`Line: ${index+1}`);
  // console.log(current);
  // if(index > 4) return acc;

  const symbols = [...current.matchAll(/\*/g)];
  let total_power = 0;
  for(let i = 0; i < symbols.length; i++) {
    let ratios = [];
    const { index:symbol_pos } = symbols[i];
    // Check current line.
    // const current_line_numbers = [...current.substring(symbol_pos - 3, symbol_pos + 4).matchAll(/\d+/g)];
    const current_line_numbers = [...current.substring(symbol_pos - 3, symbol_pos + 4).matchAll(/((\d+)\*|\*(\d+))/g)];
    if(current_line_numbers.length > 0) {
      ratios = current_line_numbers.map((val) => {
        const [,, number1, number2] = val;
        return number1 || number2;
      });
    }
    // Check above line.
    const above_line_numbers = [...lines[index-1].substring(symbol_pos - 3, symbol_pos + 4).matchAll(/\d+/g)];
    if(above_line_numbers.length > 0) {
      // console.log(above_line_numbers);
      ratios = [
        ...ratios,
        ...above_line_numbers.filter((val) => {
          const { index:number_pos } = val;
          const [num] = val;
          if((number_pos + num.length) >= 3 && number_pos < 5) return true;
          return false;
        }).map((val) => val[0]),
      ];
    }

    // Check below line.
    if(lines[index+1]) {
      const below_line_numbers = [...lines[index+1].substring(symbol_pos - 3, symbol_pos + 4).matchAll(/\d+/g)];
      if(below_line_numbers.length > 0) {
        ratios = [
          ...ratios,
          ...below_line_numbers.filter((val) => {
            const { index:number_pos } = val;
            const [num] = val;
            if((number_pos + num.length) >= 3 && number_pos < 5) return true;
            return false;
          }).map((val) => val[0]),
        ];
      }
    }

    if(ratios.length > 1) {
      console.log(ratios);
      // const power = ratios.reduce((pow_acc, pow_curr) => parseInt(pow_acc) * parseInt(pow_curr), 1);
      const power = parseInt(ratios[0]) * parseInt(ratios[ratios.length - 1]);
      total_power += power;
    }
  }
  // console.log( acc + total_power);
  return acc + total_power;
}, 0);

// On managed to get it to work with example.
console.log(sum);