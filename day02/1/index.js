const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(
  path.join(__dirname, '../input.txt'),
  { encoding: 'utf8', flag: 'r' }
);
const lines = file.split('\r\n');

const conditions = {
  red: 12,
  green: 13,
  blue: 14,
};

const sum = lines.reduce((acc, current, index) => {
  // Get rid of `Game n:`
  const [, contents] = current.split(':');
  const sets = contents.split(';');

  let allow = false;
  for(let i = 0; i < sets.length; i++) {
    const set = [...sets[i].matchAll(/((\d{0,})\s(red|blue|green))/g)];
    allow = set.reduce((set_acc, set_current) => {
      if(!set_acc) return false;
      
      const [,,number, color] = set_current;
      if(parseInt(number) > conditions[color]) return false;
      return true;
    }, true);

    if(!allow) break;
  }
  return (allow)? acc + index + 1 : acc;
}, 0);

console.log(sum);