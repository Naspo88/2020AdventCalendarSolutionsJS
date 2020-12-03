import { returnArrayFromText, reducerSum, reducerMult } from '../utils/helpers';

function isSumValue(val, arrayToSum) {
    const sum = arrayToSum.reduce(reducerSum, 0);
    return sum === val;
} 

function getSolution(arrayToMult) {
    return arrayToMult.reduce(reducerMult, 1);
}

export function solvePart1 (text) {
    const array = returnArrayFromText(text);
    let resp;
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            const values = [parseInt(array[i]), parseInt(array[j])];
            if (isSumValue(2020, values)) {
                resp = getSolution(values);
                i = array.length;
                j = array.length;
            }
        }
    }
    return resp;
}

export function solvePart2 (text) {
    const array = returnArrayFromText(text);
    let resp;
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            for (let k = j + 1; k < array.length; k++) {
                const values = [parseInt(array[i]), parseInt(array[j]), parseInt(array[k])];
                if (isSumValue(2020, values)) {
                    resp = getSolution(values);
                    i = array.length;
                    j = array.length;
                    k = array.length;
                }
            }
        }
    }
    return resp;
}
