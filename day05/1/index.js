/*
 * I'm a fucking idiot
 */
const fs = require('fs');
const path = require('path');

function map_to_location(maps, source, map_to_look = 0) {
  if(!maps[map_to_look]) return source;

  const map = maps[map_to_look];
  let lowest = source;
  for(let i = 0; i < map.length; i++) {
    const [destination_range, source_range, length] = map[i];
    // console.log(`${source}: ${source_range} + ${length} - 1`);
    if(
      source < source_range
      || source > source_range + length
    ) continue;

    const dest = source - source_range;
    // console.log(`Dest ${i} ${source_range}: ${dest} | ${source_range + length - 1}`);
    lowest = dest + destination_range;
    // console.log(lowest);
    break;
  }

  return map_to_location(maps, lowest, map_to_look + 1);
}

if (require.main === module) {
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

  const locations = seeds.reduce((acc, curr) => acc = [...acc, map_to_location(maps, curr)], []);

  // Answer should be 993500720
  console.log(locations.sort((a, b) => a-b)[0]);
  console.timeEnd('benchmark');
}

module.exports = {
  map_to_location,
};