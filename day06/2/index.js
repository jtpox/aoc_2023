const fs = require('fs');
const path = require('path');
const { get_distance } = require('../1');

console.time('benchmark');

const file = fs.readFileSync(
    path.join(__dirname, '../input.txt'),
    { encoding: 'utf8', flag: 'r' }
);
const [times, distances] = file.split('\r\n');
const time = parseInt(times.split(/.*:/)[1].replace(/\s+/g, ''));
const distance = parseInt(distances.split(/.*:/)[1].replace(/\s+/g, ''));

let wins = 0;
for(let i = 0; i < time; i++) {
    const calculated_distance = get_distance(i, time);
    if(calculated_distance > distance) wins += 1;
}

console.log(wins);
console.timeEnd('benchmark');