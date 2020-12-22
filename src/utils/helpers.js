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

export function cloneObject(object) {
    const newObject = JSON.parse(JSON.stringify(object));
    return newObject;
}

export function isStringStartAndEnd(str, start, end) {
    return str.startsWith(start) && str.endsWith(end);
}

export function getStringBetween(str, start, end) {
    const afterStart = returnArrayFromText(str, start)[1];
    return returnArrayFromText(afterStart, end)[0];
}

export function reverseString(str) {
    var splitString = returnArrayFromText(str, '');
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("");
    return joinArray;
}

export function isExctalySameArray(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  }
