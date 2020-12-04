import { returnArrayFromText } from '../utils/helpers';

const informationsWithRules = [
    {
        key: 'byr',
        valid: (x) => x.length === 4 && x >= 1920 && x <= 2002
    }, 
    { 
        key: 'iyr',
        valid: (x) => x.length === 4 && x >= 2010 && x <= 2020
    },
    {
        key: 'eyr',
        valid: (x) => x.length === 4 && x >= 2020 && x <= 2030 
    }, 
    {
        key: 'hgt',
        valid: (x) => {
            const regEx = /\d+(cm|in)$/;
            if (regEx.test(x)) {
                if (x.includes('cm')) {
                    const num = parseInt(x);
                    return num >= 150 && num <= 193; 
                } else if (x.includes('in')) {
                    const num = parseInt(x);
                    return num >= 59 && num <= 76; 
                }
            }
            return false;
        }
    }, 
    {
        key: 'hcl',
        valid: (x) => {
            if (x[0] === '#') {
                const regEx = /#(\d|[a-f])+/
                return regEx.test(x);
            }
            return false;
        } 
    },
    {
        key: 'ecl',
        valid: (x) => {
            const validValues = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
            return validValues.includes(x);
        } 
    },
    {
        key: 'pid',
        valid: (x) => x.length === 9 && parseInt(x) !== NaN
    },
    {
        key: 'cid',
        valid: (x) => true
    }
];

const isMissingOnlyCid = (info) => {
    const infos = informationsWithRules.map(v => v.key);
    const contains = [];
    info.forEach(value => {
        const key = returnArrayFromText(value, ':')[0];
        contains.push(key);
    });
    const isMissing = infos.filter(x => !contains.includes(x));
    return  isMissing.length === 1 && isMissing[0] === 'cid';
}

const allValuesRespectRules = (values) => {
    let validation = true;
    values.some(val => {
        const [key, data] = returnArrayFromText(val, ':');
        const keyRule = informationsWithRules.find(item => item.key === key);
        if (!keyRule.valid(data)) {
            validation = false;
            return true;
        }
        return false;
    });
    return validation;
}

export function solvePart1 (text) {
    let count = 0;
    const array = returnArrayFromText(text, '\n\n');

    array.forEach(txt => {
        const values = returnArrayFromText(txt, /\n| /g);
        if (values.length >= informationsWithRules.length) {
            count++;
        } else if (values.length === informationsWithRules.length - 1 && isMissingOnlyCid(values)) {
            count++;
        }
        
    });
    
    return count;
}

export function solvePart2 (text) {
    let count = 0;
    const array = returnArrayFromText(text, '\n\n');

    array.forEach(txt => {
        const values = returnArrayFromText(txt, /\n| /g);
        if (allValuesRespectRules(values)) {
            if (values.length >= informationsWithRules.length) {
                count++;
            } else if (values.length === informationsWithRules.length - 1 && isMissingOnlyCid(values)) {
                count++;
            }
        }
    });
    
    return count;
}
