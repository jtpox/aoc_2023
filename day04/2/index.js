const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(
  path.join(__dirname, '../input.txt'),
  { encoding: 'utf8', flag: 'r' }
);
// const lines = file.split('\r\n').map((s) => s.split(''));
const lines = file.split('\r\n');
let scratchcards = {};
for(let i = 0; i < lines.length; i++) {
  scratchcards[i+1] = 0;
};


lines.reduce((acc, current, index) => {
  // if(index > 0) return acc;
  const [, cards] = current.split(':');
  let [winning_cards, my_cards] = cards.split('|');
  winning_cards = [...winning_cards.matchAll(/\d+/g)].map(val => parseInt(val[0]));
  my_cards = [...my_cards.matchAll(/\d+/g)].map(val => parseInt(val[0]));

  let won_card = index + 1;
  scratchcards[won_card] += 1;
  const matching_numbers = my_cards.filter((num) => winning_cards.indexOf(num) !== -1);
  for(let i = 0; i < matching_numbers.length; i++) {
    won_card += 1;
    if(scratchcards[won_card] !== undefined) scratchcards[won_card] += 1;
  }

  if(index === 0) return acc;

  for(let i = 1; i < scratchcards[index+1]; i++) {
    let additional_won_cards = index + 1;
    const copy_matching_numbers = my_cards.filter((num) => winning_cards.indexOf(num) !== -1);
    for(let j = 0; j < copy_matching_numbers.length; j++) {
      additional_won_cards += 1;
      if(scratchcards[additional_won_cards] !== undefined) scratchcards[additional_won_cards] += 1;
    }
  }

  return acc;
}, 0);

const sum = Object.values(scratchcards).reduce((acc, current) => acc + current, 0);
// Correct answer should be 12263631
console.log(sum);