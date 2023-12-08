const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(
  path.join(__dirname, '../input.txt'),
  { encoding: 'utf8', flag: 'r' }
);
let input = file.split('\r\n');

const instructions = input.shift().split('');
input.shift(); // Remove blank line.

const network = input.reduce((acc, curr) => {
  const [
    [node],
    [left],
    [right],
  ] = [...curr.matchAll(/\w+/g)];
  acc[node] = [left, right];
  return acc;
}, {});

// const ending_node = Object.keys(network)[Object.keys(network).length - 1];
const starting_node = 'AAA';
const ending_node = 'ZZZ';
let steps = 1;
let last_node_in_loop = null;

while(true) {
  for(let i = 0; i < instructions.length; i++) {
    const direction = instructions[i];
    let current_node_directions = (last_node_in_loop === null)? network[starting_node] : network[last_node_in_loop];
    const next = current_node_directions[+ (direction !== 'L')];
    last_node_in_loop = next;
    if(next === ending_node) break;
    steps += 1;
  }
  if(last_node_in_loop === ending_node) break;
}

// Correct answer: 13301
console.log(steps);