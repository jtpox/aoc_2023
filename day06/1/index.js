const fs = require('fs');
const path = require('path');

function get_distance(hold_time, max_time) {
  const run_time = max_time - hold_time;
	return hold_time * run_time;
}

if (require.main === module) {
	console.time('benchmark');

	const file = fs.readFileSync(
		path.join(__dirname, '../input.txt'),
		{ encoding: 'utf8', flag: 'r' }
	);
	let [times, distances] = file.split('\r\n');
	times = [...times.matchAll(/\d+/g)].map(val => parseInt(val[0]));
	distances = [...distances.matchAll(/\d+/g)].map(val => parseInt(val[0]));
	
	const races = times.map((val, index) => {
		return [val, distances[index]];
	});

	const number_of_wins = races.reduce((acc, curr) => {
		const [time, distance] = curr;
		let wins = 0;

		for(let i = 0; i < time; i++) {
			const calculated_distance = get_distance(i, time);
			if(calculated_distance > distance) wins += 1;
		}

		acc.push(wins);
		return acc;
	}, []);

	console.log(number_of_wins.reduce((acc, curr) => acc * curr, 1));

	console.timeEnd('benchmark');
}

module.exports = {
	get_distance,
};