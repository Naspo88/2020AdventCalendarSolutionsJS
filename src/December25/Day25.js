import { returnArrayFromText } from '../utils/helpers';

export function solveDayPart1(text) {
	const [card, door] = returnArrayFromText(text).map(n => +n);
	
	let key = 1;
	let target = 1;
	
	while (target !== door) {
		target = (target * 7) % 20201227;
		key = (key * card) % 20201227;
	}

    return key;
};
