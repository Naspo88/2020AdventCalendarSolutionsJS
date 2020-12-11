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

export function numericalOrderSorting (a, b) {
    return a - b
}

export function setCharAt(str, index, chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}
