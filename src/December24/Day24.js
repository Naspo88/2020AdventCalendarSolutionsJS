import { returnArrayFromText } from '../utils/helpers';

const coord = {
	ne: [1, 1],
	nw: [-1, 1],
	se: [1, -1],
	sw: [-1, -1],
	e: [2, 0],
	w: [-2, 0],
};

const moveTile = ([x, y], dir) => [x + coord[dir][0], y + coord[dir][1]];
  
const getBlackTiles = (directions) => {
	return directions.reduce((acc, line) => {
		const position = line.match(/(e|se|sw|w|nw|ne)/g).reduce(moveTile, [0, 0]);
		const key = position.join(";");
		return acc.delete(key) ? acc : acc.add(key);
	}, new Set());
};
  
const getNeighbours = (tile) => {
	const position = tile.split(";").map(Number);
	return Object.keys(coord).map((x) => moveTile(position, x).join(";"));
};
  
const flip = (blackTiles) => {
	const counts = new Map();
	for (const tile of blackTiles) {
		getNeighbours(tile).forEach((x) => counts.set(x, (counts.get(x) || 0) + 1));
	}

	const result = new Set();
	for (const [tile, count] of counts) {
		if ((blackTiles.has(tile) && count === 1) || count === 2) {
			result.add(tile);
		}
	}

	return result;
};

export function solveDayPart1(text) {
	const directions = returnArrayFromText(text);
	
	return getBlackTiles(directions).size;
};

export function solveDayPart2(text) {
	const directions = returnArrayFromText(text);
	const blackTiles = getBlackTiles(directions);
	
	return Array.from({ length: 100 }).reduce((acc) => flip(acc), blackTiles).size;
};
