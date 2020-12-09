import { returnArrayFromText, isSumValue, getSumValue } from '../utils/helpers';

function isASumOfBaseNum(base, num) {
    let isSum = false;
    for (let i = 0; i < base.length; i++) {
        for (let j = i + 1; j < base.length; j++) {
            const values = [parseInt(base[i]), parseInt(base[j])];
            if (isSumValue(parseInt(num), values)) {
                isSum = true;
                i = base.length;
                j = base.length;
            }
        }
    }
    return isSum;
}

export function solvePart1 (text, base) {
    let resp;
    const array = returnArrayFromText(text);
    const baseNum = array.slice(0, base);
    const others = array.slice(base);

    for (let i = 0; i < others.length; i++) {
        const isSum = isASumOfBaseNum(baseNum, others[i]);
        if (!isSum) {
            resp = others[i];
            i = others.length;
        } else {
            baseNum.shift();
            baseNum.push(others[i]);
        }
    }

    return parseInt(resp);
}

export function solvePart2 (text, base) {
    let resp; 
    const array = returnArrayFromText(text);
    const invalid = solvePart1(text, base);

    for (let i = 0; i < array.length; i++) {
        const currentContiguos = [parseInt(array[i])];
        for (let j = i + 1; j < array.length; j++) {
            currentContiguos.push(parseInt(array[j]));
            const sum = getSumValue(currentContiguos);
            if (sum === invalid) {
                resp = currentContiguos[0] + currentContiguos[currentContiguos.length - 2];
                i = base.length;
                j = base.length;
            } else if (sum > invalid) {
                j = base.length;
            }
        }
    }

    return resp;
}
