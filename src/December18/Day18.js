import { returnArrayFromText } from '../utils/helpers';

function solveExpression(expression, mode) {
    while (expression.includes("(")) {
        expression = expression.replace(
            /\(([\d+\+\* ]+)\)/,
            (match, p1) => String(solveExpression(p1, mode)),
        );
    }
    
    if (mode) {
        while (expression.includes("+")) {
            expression = expression.replace(/\d+ \+ \d+/, (match) => {
                const tokens = match.split(" ");
                return String(parseInt(tokens[0]) + parseInt(tokens[2]));
            });
        }
        while (expression.includes("*")) {
            expression = expression.replace(/\d+ \* \d+/, (match) => {
                const tokens = match.split(" ");
                return String(parseInt(tokens[0]) * parseInt(tokens[2]));
            });
        }
        return parseInt(expression);
    } else {
        while (expression.includes("+") || expression.includes("*")) {
            expression = expression.replace(/\d+ ([\*\+]) \d+/, (match, op) => {
                const tokens = match.split(" ");
                if (op === "+") {
                return String(parseInt(tokens[0]) + parseInt(tokens[2]));
                } else {
                return String(parseInt(tokens[0]) * parseInt(tokens[2]));
                }
            });
        }
        return parseInt(expression);
    }
}

export function solveDay(text, advanced) {
  const array = returnArrayFromText(text);

  return array.map(expression => {
      return solveExpression(expression, advanced);
  }).reduce((acc, val) => acc + val, 0);
}
