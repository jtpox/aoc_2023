const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(
  path.join(__dirname, '../input.txt'),
  { encoding: 'utf8', flag: 'r' }
);

const lines = file.split('\r\n');
let numbers = [];

const sum = lines.reduce((acc, current) => {
  const digits = current.match(/\d/g);
  let number = 0;

  if(digits.length > 1) number = parseInt(`${digits[0]}${digits[digits.length-1]}`);
  if(digits.length === 1) number = parseInt(`${digits[0]}${digits[0]}`);

  return acc + number;
}, 0);


// Answer should be 53194
console.log(sum);