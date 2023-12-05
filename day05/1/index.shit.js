const fs = require('fs');
const path = require('path');

console.time('benchmark');

const file = fs.readFileSync(
  path.join(__dirname, '../input.txt'),
  { encoding: 'utf8', flag: 'r' }
);

// const seeds = [...file.match(/seeds:\s(.*)/)[1].matchAll(/\d+/g)].map(([val]) => val);
const seeds = [...file.match(/seeds:\s(.*)/)[1].matchAll(/\d+/g)].map(([val]) => parseInt(val));

// Make a lists of all maps.
let [, ...maps] = file.split(/\r\n\s*\n/); // Remove "seed: n"
maps = maps.map(m => {
  let [, ...map] = m.split('\r\n'); // Remove header.
  map = map.map(sm => [...sm.matchAll(/\d+/g)].map(([n]) => parseInt(n)));
  return [...map];
});

// Calculate all maps.
const calculated_maps = maps.reduce((map_acc, map_curr) => {
  const list = map_curr.reduce((acc, curr) => {
    const [destination, source, length] = curr;
    for(let i = 0; i < length; i++) {
      acc = [
        ...acc,
        {
          seed: source + i,
          destination: destination + i,
        }
      ];
    }

    return acc;
  }, []);

  return [...map_acc, list];
}, []);

function map_to_location(source, map_to_look = 0) {
  if(!calculated_maps[map_to_look]) return source;

  const find_destination = calculated_maps[map_to_look].filter(val => val.seed === source)[0]?.destination || source;
  return map_to_location(find_destination, map_to_look + 1);
}

const locations = seeds.reduce((acc, curr) => [...acc, map_to_location(curr)], []);
console.log(locations.sort((a, b) => a - b)[0]);
console.timeEnd('benchmark');