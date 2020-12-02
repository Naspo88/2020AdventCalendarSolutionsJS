import { returnArrayFromText } from '../utils/helpers';;

export function solvePart1 (text) {
    let count = 0;
    const array = returnArrayFromText(text);

    array.forEach(txt => {
        const [sol, pwd] = returnArrayFromText(txt, ': ');
        const [range, letter] = returnArrayFromText(sol, ' ');
        const [min, max] = returnArrayFromText(range, '-');

        const occurrences = pwd.match(new RegExp(letter, "g")) || [];
        if (occurrences.length >= min && occurrences.length <= max) {
            count++;
        }
    });
    
    return count;
}