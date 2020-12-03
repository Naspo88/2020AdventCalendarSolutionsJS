export function returnArrayFromText (simpleText, splitFor = '\n') {
    if (!simpleText) {
        return [];
    }
    return simpleText.split(splitFor);
}

export const reducerSum = (accumulator, currentValue) => accumulator + currentValue;
export const reducerMult = (accumulator, currentValue) => accumulator * currentValue;
