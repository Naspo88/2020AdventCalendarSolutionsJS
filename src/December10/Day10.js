import { returnArrayFromText, numericalOrderSorting } from '../utils/helpers';

export function solvePart1 (text) {
    const array = returnArrayFromText(text);
    const sorted = array.map(el => parseInt(el)).sort(numericalOrderSorting);
    sorted.push(sorted[sorted.length - 1] + 3);
    const collector = {
        '1': 0,
        '2': 0,
        '3': 0
    };
    let startPlug = 0;

    sorted.forEach(num => {
        switch (num - startPlug) {
            case 1:
                collector['1']++;
                startPlug = num;
                break;
            case 2:
                collector['2']++;
                startPlug = num;
                break;
            case 3:
                collector['3']++;
                startPlug = num;
                break;
            default:
                break;
        }
    });

    return collector['1'] * collector['3'];
}

function calculatePathFromIndx(array) {
    const collection = {0: 1};
    for (let i = 0; i < array.length; i++) {
        let j = i + 1;
        while(array[j] <= array[i] + 3) {
            collection[j] = (collection[j] || 0) + collection[i];
            j++;
        }
    }

    return collection[array.length - 1];
}

export function solvePart2 (text) { 
    const array = returnArrayFromText(text);
    const sorted = array.map(el => parseInt(el)).sort(numericalOrderSorting);
    sorted.push(sorted[sorted.length - 1] + 3);
    let isAFullPath = calculatePathFromIndx([0, ...sorted]);

    return isAFullPath;
}