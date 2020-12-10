import { returnArrayFromText, numericalOrderSorting } from '../utils/helpers';

function getFirstHalfOfRange(min, max) {
    return Math.floor((min + max) / 2);
}

function cycleStringToGetPosition(array, minRange, maxRange, firstHalf) {
    let intMinRange = minRange;
    let intMaxRange = maxRange;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === firstHalf) {
            intMaxRange = getFirstHalfOfRange(intMinRange, intMaxRange);
        } else {
            intMinRange = getFirstHalfOfRange(intMinRange, intMaxRange) + 1;
        }
    }

    
    return intMinRange;
}

export function getBoardPassId (boradPass) {
    const rowInfo = boradPass.substring(0, 7);
    const colInfo = boradPass.substring(7);

    const row = cycleStringToGetPosition(rowInfo, 0, 127, 'F');
    const col = cycleStringToGetPosition(colInfo, 0, 7, 'L');

    return (row * 8) + col;
}

export function solvePart1 (text) {
    let max = 0;
    const allIds = [];
    const array = returnArrayFromText(text);

    array.forEach(boardPass => {
        const id = getBoardPassId(boardPass);
        allIds.push(id);
        if (id >= max) {
            max = id;
        }
    });

    const sorted = allIds.sort(numericalOrderSorting);
    for(var i = 0; i < sorted.length - 1; i++) {
        if (sorted[i + 1] - sorted[i] !== 1) {
            // console.log('My seat = ', sorted[i] + 1);
        }
    }
    
    return max;
}
