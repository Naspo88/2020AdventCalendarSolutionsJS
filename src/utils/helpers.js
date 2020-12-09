export function returnArrayFromText (simpleText, splitFor = '\n') {
    if (!simpleText) {
        return [];
    }
    return simpleText.split(splitFor);
}

export const reducerSum = (accumulator, currentValue) => accumulator + currentValue;
export const reducerMult = (accumulator, currentValue) => accumulator * currentValue;

export function getSumValue (arrayToSum) {
    return arrayToSum.reduce(reducerSum, 0);
}

export function isSumValue(val, arrayToSum) {
    return getSumValue(arrayToSum) === val;
} 
