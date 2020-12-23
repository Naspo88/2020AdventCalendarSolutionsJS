import { returnArrayFromText } from '../utils/helpers';

export function solveDayPart1(text, moves) {
	let cups = returnArrayFromText(text, '');
	cups = cups.map(n => +n);
	
	for (let i = 0; i < moves; i++) {
		const extract = cups.slice(1, 4);
		const remaining = [cups[0]].concat(cups.slice(4));
		
		let cur = cups[0] - 1;
		while (true) {
			if (cur === 0) cur += cups.length;
			
			const pos = remaining.indexOf(cur);
			if (pos !== -1) {
				cups = remaining
					.slice(0, pos + 1)
					.concat(extract)
					.concat(remaining.slice(pos + 1));
				break;
			}
			
			cur--;
		}
		
		cups.push(cups.shift());
	}
	
	let index = cups.indexOf(1);
	let order = cups.slice(index + 1).concat(cups.slice(0, index));
	return order.join("");
};

const ONE_MILLION = 1000000;
export function solveDayPart2(text, moves) {
	let cups = returnArrayFromText(text, '');
	cups = cups.map(n => +n);
	for (let i = Math.max(...cups) + 1; i <= ONE_MILLION; i++) {
		cups.push(i);
	}
	
	cups.forEach((val, i) => (cups[i] = { val }));
	cups.forEach((val, i) => (cups[i].next = i < cups.length - 1 ? cups[i + 1] : cups[0]));

	const vMap = new Map(cups.map((item) => [item.val, item]));

	let head = cups[0];

	for (let i = 0; i < moves; i++) {
		const extract = [head.next.val, head.next.next.val, head.next.next.next.val];
		const extractHead = head.next;
		head.next = head.next.next.next.next;
	
		let cur = head.val - 1;
		while (true) {
			while (extract.includes(cur)) cur--;
			if (cur === 0) cur += cups.length;
			while (extract.includes(cur)) cur--;
			
			const pos = vMap.get(cur);
			if (pos) {
				extractHead.next.next.next = pos.next;
				pos.next = extractHead;
				break;
			}
		
			cur--;
		}
	
		head = head.next;
	}

	const posOne = vMap.get(1);
	
	return posOne.next.val * posOne.next.next.val;
};
