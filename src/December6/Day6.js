import { returnArrayFromText } from '../utils/helpers';

function getYesAnswerInTheGroup (group) {
    const yes = [];
    const persons = returnArrayFromText(group);
    persons.forEach(person => {
        for (let i = 0; i < person.length; i++) {
            if (!yes.includes(person[i])) {
                yes.push(person[i]);
            }
        }
    });

    return yes.length;
};

function getYesAnswerInTheGroupForAll (group) {
    const yes = {};
    const persons = returnArrayFromText(group);
    persons.forEach(person => {
        for (let i = 0; i < person.length; i++) {
            if (yes[person[i]]) {
                yes[person[i]] ++;
            } else {
                yes[person[i]] = 1;
            }
        }
    });

    return Object.keys(yes).filter(key => yes[key] === persons.length).length;
};

export function solvePart1 (text) {
    let tot = 0;
    const groups = returnArrayFromText(text, '\n\n');

    groups.forEach(group => {
        const yesAnswer = getYesAnswerInTheGroup(group);
        tot += yesAnswer;
    });

    return tot;
}

export function solvePart2 (text) {
    let tot = 0;
    const groups = returnArrayFromText(text, '\n\n');

    groups.forEach(group => {
        const yesAnswer = getYesAnswerInTheGroupForAll(group);
        tot += yesAnswer;
    });

    return tot;
}
