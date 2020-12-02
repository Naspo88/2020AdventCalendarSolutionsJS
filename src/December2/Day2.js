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

export function solvePart2 (text) {
    let count = 0;
    const array = returnArrayFromText(text);

    array.forEach(txt => {
        const [sol, pwd] = returnArrayFromText(txt, ': ');
        const [positions, letter] = returnArrayFromText(sol, ' ');
        const [pos1, pos2] = returnArrayFromText(positions, '-');

        const char1Correct = pwd.charAt(pos1 - 1) === letter;
        const char2Correct = pwd.charAt(pos2 - 1) === letter;
        
        if ((char1Correct && !char2Correct) || (!char1Correct && char2Correct)) {
            count++;
        }
    });
    
    return count;
}
