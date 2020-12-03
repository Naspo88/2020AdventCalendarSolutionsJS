import { returnArrayFromText, reducerMult } from '../utils/helpers';;

export function solveDay3 (text, testScenarios = [{r: 3, d: 1}]) {
    let scenarioTrees = [];
    const lines = returnArrayFromText(text);

    testScenarios.forEach(test => {
        let tree = 0;
        let row = 0;
        let col = 0;
        const lineLength = lines[0].length;
        while (lines.length > row) {
            if (row !== 0) {
                if (col >= lineLength) {
                    col = col - lineLength;
                }
                const char = lines[row].charAt(col);
                if (char === '#') {
                    tree++;
                }
            }
            col += test.r;
            row += test.d;
        }
        scenarioTrees.push(tree);
    });
    
    console.log('scenTree', scenarioTrees);
    return scenarioTrees.reduce(reducerMult, 1);
}