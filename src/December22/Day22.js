import { returnArrayFromText, isExctalySameArray } from '../utils/helpers';

function calculateWinnerPoints(winnerArray) {
	let sum = 0;
	
	for (let i = 0; i < winnerArray.length; i++) {
		const positionPoints = winnerArray[i] * (winnerArray.length - i); 
		sum += positionPoints;
	}

	return sum;
}

function runCombat(arr1, arr2) {
	while (arr1.length !== 0 && arr2.length !== 0) {
		const player1FirstN = arr1.shift();
		const player2FirstN = arr2.shift();

		if (player1FirstN > player2FirstN) {
			arr1.push(player1FirstN)
			arr1.push(player2FirstN);
		} else {
			arr2.push(player2FirstN);
			arr2.push(player1FirstN);
		}
	}

	return arr1.length ? arr1 : arr2;
}

function isInHistory(history, arr1, arr2) {
	return Object.keys(history).some(i => isExctalySameArray(history[i].p1, arr1) && isExctalySameArray(history[i].p2, arr2));
}

function runRecursiveCombat(arr1, arr2, round = 0) {
	const history = {};
	while (arr1.length !== 0 && arr2.length !== 0) {
		if (isInHistory(history, arr1, arr2)) {
			return [arr1, 'p1'];
		}

		history[round] = {
			p1: [...arr1],
			p2: [...arr2]
		}

		const player1FirstN = arr1.shift();
		const player2FirstN = arr2.shift();

		if (player1FirstN <= arr1.length && player2FirstN <= arr2.length) {
			const winningPlayer = runRecursiveCombat(arr1.slice(0, player1FirstN), arr2.slice(0, player2FirstN))[1];
			if (winningPlayer === 'p1') {
				arr1.push(player1FirstN);
				arr1.push(player2FirstN);
			} else {
				arr2.push(player2FirstN);
				arr2.push(player1FirstN);
			}
		} else {
			if (player1FirstN > player2FirstN) {
				arr1.push(player1FirstN);
				arr1.push(player2FirstN);
			} else {
				arr2.push(player2FirstN);
				arr2.push(player1FirstN);
			}
		}

		round++;
	}

	return arr1.length ? [arr1, 'p1'] : [arr2, 'p2'];
}

function getPlayersCards(text) {
	const array = returnArrayFromText(text, "\n\n");
	let player1 = returnArrayFromText(array[0]);
	let player2 = returnArrayFromText(array[1]);
	player1.shift();
	player2.shift();
	player1 = player1.map(n => +n);
	player2 = player2.map(n => +n);

	return [player1, player2];
}

export function solveDayPart1(text) {
	const [player1, player2] = getPlayersCards(text);
	
	return calculateWinnerPoints(runCombat(player1, player2));
};

export function solveDayPart2(text) {
	const [player1, player2] = getPlayersCards(text);

	return calculateWinnerPoints(runRecursiveCombat(player1, player2)[0]);
};
