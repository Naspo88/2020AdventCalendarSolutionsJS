import { returnArrayFromText } from '../utils/helpers';

function recursiveCanContain (array, bagType, canContain = []) {
    array.forEach(rule => {
        const [bag, contain] = returnArrayFromText(rule, 'contain');
        const possibleBagToAdd = returnArrayFromText(bag, ' bags')[0];
        if (contain.includes(bagType) && !canContain.includes(possibleBagToAdd)) {
            canContain.push(possibleBagToAdd);
            canContain = recursiveCanContain(array, possibleBagToAdd, canContain);
        }
    });
    return canContain;
}

function recursiveHowManyContain (array, bagType, total = 0) {
    array.forEach(rule => {
        const [bag, contain] = returnArrayFromText(rule, 'contain');
        const consideredBag = returnArrayFromText(bag, ' bags')[0];
        if (consideredBag === bagType && !contain.includes('no other bags')) {
            const whatContains = returnArrayFromText(contain, ',');
            whatContains.forEach(typeContains => {
                const numberOfBag = parseInt(typeContains);
                const typeOfBag = typeContains.substring(typeContains.indexOf(`${numberOfBag} `) + 2, typeContains.indexOf(" bag"));
                total = total + numberOfBag + (numberOfBag * recursiveHowManyContain(array, typeOfBag));
            });
        }
    });
    return total;
}

export function solvePart1 (text, bagType) {
    const array = returnArrayFromText(text);
    const solution = recursiveCanContain(array, bagType);
    return solution.length;
}

export function solvePart2 (text, bagType) {
    const array = returnArrayFromText(text);
    const solution = recursiveHowManyContain(array, bagType);
    return solution;
}