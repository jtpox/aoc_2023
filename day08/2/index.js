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
const starting_nodes = Object.keys(network).filter(val => val.endsWith('A'));
console.log(`Starting Nodes: ${starting_nodes}`);
const ending_nodes = Object.keys(network).filter(val => val.endsWith('Z'));
console.log(`Ending Nodes: ${ending_nodes}`);

const all_steps = [];
for(j = 0; j < starting_nodes.length; j++) {
  starting_node = starting_nodes[j];
  let steps = 1;
  let last_node_in_loop = null;

  while(true) {
    for(let i = 0; i < instructions.length; i++) {
      const direction = instructions[i];
      let current_node_directions = (last_node_in_loop === null)? network[starting_node] : network[last_node_in_loop];
      const next = current_node_directions[+ (direction !== 'L')];
      last_node_in_loop = next;
      if(ending_nodes.includes(next)) break;
      steps += 1;
    }
    if(ending_nodes.includes(last_node_in_loop)) break;
  }
  all_steps.push(steps);
}

console.log(all_steps);

/*
 * Find lowest common multiple of the array of numbers using cake method.
 */
function gcd(a, b) {
  while(b !== 0) {
    [a, b] = [b, a % b];
  }

  return a;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

console.log(all_steps.reduce((acc, curr) => lcm(acc, curr)));

