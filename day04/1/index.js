const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(
  path.join(__dirname, '../input.txt'),
  { encoding: 'utf8', flag: 'r' }
);
// const lines = file.split('\r\n').map((s) => s.split(''));
const lines = file.split('\r\n');

const sum = lines.reduce((acc, current, index) => {
  const [, cards] = current.split(':');
  let [winning_cards, my_cards] = cards.split('|');
  winning_cards = [...winning_cards.matchAll(/\d+/g)].map(val => parseInt(val[0]));
  my_cards = [...my_cards.matchAll(/\d+/g)].map(val => parseInt(val[0]));

  const points = my_cards
    .filter((val) => winning_cards.indexOf(val) !== -1)
    .reduce((fil_acc, fil_curr, index) => {
      if(fil_acc === 0) return fil_acc + 1;
      return fil_acc * 2;
    }, 0);

  return acc + points;
}, 0);


// Answer should be 23673
console.log(sum);