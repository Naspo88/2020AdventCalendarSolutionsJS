import { returnArrayFromText } from '../utils/helpers';

export function solvePart1 (text, valueRequest) {
  const array = returnArrayFromText(text, ',').map(n => +n);
  const spokenNumbers = new Map();
  let next;

  for (let turn = 1; turn < valueRequest; turn++) {
      const curr = (turn <= array.length) ? array[turn - 1] : next;
      next = spokenNumbers.has(curr) ? turn - spokenNumbers.get(curr) : 0;
      spokenNumbers.set(curr, turn);
  }

  return next;
}
