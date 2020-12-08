import { returnArrayFromText } from '../utils/helpers';

function treatValues (act, val, acc, ln) {
    if (act === 'acc') {
        acc += parseInt(val);
        ln++;
    } else if (act === 'jmp') {
        ln += parseInt(val);
        if (ln < 0) {
            ln = 0;
        }
    } else {
        ln++;
    }

    return [acc, ln];
}

function runUntilRepeat (array) {
    const passedBy = [];
    let ln = 0;
    let acc = 0;
    let isFullRun = true;
    while (ln < array.length) {
        if (!passedBy.includes(ln)) {
            passedBy.push(ln);
            const [act, val] = returnArrayFromText(array[ln], ' ');
            const [macc, mln] = treatValues(act, val, acc, ln);
            acc = macc;
            ln = mln;
        } else {
            ln = array.length;
            isFullRun = false;
        }
    }

    return [acc, isFullRun];
}

function recursiveRunWithChanges(array, lastChange = 0) {
    const newArray = [];
    let changedLine;
    array.forEach((el, i) => {
        const [act, val] = returnArrayFromText(el, ' ');
        if ((act === 'jmp' || act === 'nop') && i > lastChange && !changedLine) {
            changedLine = i;
            newArray[i] = `${act === 'jmp' ? 'nop' : 'jmp'} ${val}`;
        } else {
            newArray[i] = el;
        }
    });

    let [acc, isFullRun] = runUntilRepeat(newArray);
    if (!isFullRun) {
        return recursiveRunWithChanges(array, changedLine);
    }

    return acc;
}

export function solvePart1 (text) {
    const array = returnArrayFromText(text);
    const [acc] = runUntilRepeat(array);

    return acc;
}

export function solvePart2 (text) {
    const array = returnArrayFromText(text);
    let [acc, isFullRun] = runUntilRepeat(array);
    
    if (!isFullRun) {
        acc = recursiveRunWithChanges(array);
    }

    return acc;
}
