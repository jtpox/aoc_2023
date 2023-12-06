// This is incorrect.
const fs = require('fs');
const path = require('path');

const { map_to_location } = require('../1');

console.time('benchmark');

const file = fs.readFileSync(
  path.join(__dirname, '../input.txt'),
  { encoding: 'utf8', flag: 'r' }
);

// Make a lists of all maps.
let [, ...maps] = file.split(/\r\n\s*\n/); // Remove "seed: n"
maps = maps.map(m => {
  let [, ...map] = m.split('\r\n'); // Remove header.
  map = map.map(sm => [...sm.matchAll(/\d+/g)].map(([n]) => parseInt(n)));
  return [...map];
});

// const seeds = [...file.match(/seeds:\s(.*)/)[1].matchAll(/\d+/g)].map(([val]) => val);
let seeds_ranges = [...file.match(/seeds:\s(.*)/)[1].matchAll(/(\d+\s\d+)/g)];
// Remove duplicate numbers.
seeds_ranges = seeds_ranges.reduce((acc, curr) => {
  const [range] = curr;
  let [[starting_point], [ending_point]] = [...range.matchAll(/\d+/g)];
  starting_point = parseInt(starting_point);
  ending_point = starting_point + parseInt(ending_point) - 1;
  // console.log(`Starting Points ${starting_point}, ${ending_point}`);
  // console.log(ending_point)

  // Filter starting points.
  /* const [higher_starting_point] = acc.filter(val => val[0] > starting_point).sort((a, b) => a[0] - b[0]);
  if(higher_starting_point) {
    // console.log('higher');
    ending_point = higher_starting_point[0] - 1;
    if(ending_point > higher_starting_point) {
      ending_point = higher_starting_point[0] - 1;
    }
  }; */

  // const [lower_ending_point] = acc.filter((val) => val[1] < starting_point).sort(a, b) => );

  return [
    ...acc,
    [starting_point, ending_point]
  ];
}, []);

const locations = seeds_ranges.reduce((acc, curr) => {
  const [starting_point, ending_point] = curr;
  console.time(`${starting_point}, ${ending_point}`);
  console.log(`${starting_point}, ${ending_point}`);

  let lowest = -1;
  console.time('mapping benchmark');
  for(let i = starting_point; i < ending_point + 1; i++) {
    const is_milestone = i % 1000_000 === 0;
    const lowest_loc = map_to_location(maps, i);

    if(is_milestone) {
      console.log(`Mapped up to: ${i}`);
      console.timeEnd('mapping benchmark');
      console.time('mapping benchmark');
    }

    if(lowest === -1) {
      lowest = lowest_loc;
    } else if(lowest_loc < lowest) {
      lowest = lowest_loc;
    }
  }

  console.timeEnd(`${starting_point}, ${ending_point}`);
  console.log(`Lowest: ${lowest}`);
  console.log();
  // acc.push(locations_for_seeds.sort((a, b) => a-b)[0]);
  acc.push(lowest);
  return acc;
}, []);

console.log(locations);

console.log(locations.sort((a, b) => a-b)[0]);
console.timeEnd('benchmark');