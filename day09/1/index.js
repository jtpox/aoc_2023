const fs = require('fs');
const path = require('path');

function get_history(history = []) {
  const latest_history = history[history.length - 1];
  const is_zero = latest_history.filter(val => val === 0).length === latest_history.length;
  if(is_zero) return history;

  const new_history = latest_history.reduce((acc, curr, index) => {
    if(index === 0) return acc;
    return [
      ...acc,
      curr - latest_history[index - 1],
    ];
  }, []);

  return get_history([
    ...history,
    new_history,
  ]);
}

if (require.main === module) {
  const file = fs.readFileSync(
    path.join(__dirname, '../input.txt'),
    { encoding: 'utf8', flag: 'r' }
  );
  let input = file.split('\r\n').map(val => val.split(/\s+/).map(spl => parseInt(spl)));

  const sum = input.reduce((total, current_sequence, index) => {
    const history = get_history([current_sequence]);
    return total + current_sequence[current_sequence.length - 1] + history.reduce((acc, curr, index) => {
      if(index === 0) return acc;
      return acc + curr[curr.length - 1];
    }, 0);
  }, 0);
  
  // Answer should be 1684566095
  console.log(sum);
}

module.exports = {
  get_history,
};