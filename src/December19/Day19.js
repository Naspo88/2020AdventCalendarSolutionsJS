import { returnArrayFromText, isStringStartAndEnd } from '../utils/helpers';

function getRulesObject (rulesTxt) {
    const rules = {};

    returnArrayFromText(rulesTxt).forEach(value => {
        const split = returnArrayFromText(value, ": ");
        const ruleNumber = parseInt(split[0]);
        if (!isNaN(ruleNumber)) {
            rules[ruleNumber] = {
                raw: split.slice(1).join(": "),
                regex: null
            };
        }
		
    });
    
    return rules;
}

export function solveDay(text, isPart2) {
    const array = returnArrayFromText(text, "\n\n");
    const rules = getRulesObject(array[0]);
    const messages = returnArrayFromText(array[1]);

    function buildRegex(ruleID) {
        let ruleObject = rules[ruleID];
        if (ruleObject.regex != null) {
            return ruleObject.regex;
        }
    
        let regex = "(?:";
        if (isStringStartAndEnd(ruleObject.raw, '"', '"')) {
            regex += ruleObject.raw.slice(1, -1);
        } else {
            const possibleSubrules = returnArrayFromText(ruleObject.raw, " | ");
            regex += "(?:";
            possibleSubrules.forEach((item, index) => {
                const orderedSubrules = returnArrayFromText(item, " ");
                if (index != 0) {
                    regex += "|";
                }
                regex += "(?:";
                orderedSubrules.forEach((item) => {
                    regex += buildRegex(parseInt(item));
                });
                regex += ")";
            });
            regex += ")";
        }
        regex += ")";
        ruleObject.regex = regex;
        return regex;
    }

	if (isPart2) {
		rules[8].regex = `${buildRegex(42)}+`;
        buildRegex(31);
        
		let rule11Regex = "(?:";
		// This is a very hacky solution and it'll only work if N <= max in (rule42){N}(rule31){N}
		const max = 10;
		for (let i=1; i<=max; i++) {
			rule11Regex += `(?:${rules[42].regex}{${i}}${rules[31].regex}{${i}})`;
			if (i != max) {
				rule11Regex += "|";
			}
		}
		rules[11].regex = rule11Regex + ")";
	}

    const regex = new RegExp(`^${buildRegex(0)}$`, "g");

	let sum = 0;
	messages.forEach((message)=>{
		if (message.match(regex) != null) {
			sum++;
		}
	});

	return sum;
}
