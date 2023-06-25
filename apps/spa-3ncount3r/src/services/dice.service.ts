const formulaOperators: string[] = ['+', '-']

const enum DiceFormulaOperators {
    Addition,
    Subtraction
}

export function doDiceFormulaCalculation(formula: string) : number {
    let result: number = 0;

    let formulaPieces: string[] = formula.split(' ');
    let operatorToApply: DiceFormulaOperators = DiceFormulaOperators.Addition;
    console.log(formulaPieces);

    formulaPieces.forEach((expression) => {
        if (expression.indexOf('d') >= 0) { // Handle dice expressions
            let diceExpression: string[] = expression.split('d');
            let expressionResult: number = doDiceRoll(parseInt(diceExpression[0]), parseInt(diceExpression[1]));
            result += applyFormulaOperator(expressionResult, operatorToApply);
        } 
        else if (formulaOperators.indexOf(expression) >= 0) { // Handle operators
            switch (expression) {
                case '+': operatorToApply = DiceFormulaOperators.Addition; break;
                case '-': operatorToApply = DiceFormulaOperators.Subtraction; break;
            }
        } else {
            result += applyFormulaOperator(parseInt(expression), operatorToApply);
        }
    });

    return Math.max(result, 1);
}

export function doDiceRoll(numberOfDice: number, diceSize: number): number {
    let diceResult: number = 0;

    for (let n = 0; n < numberOfDice; n++) {
        let rollResult: number = Math.floor(Math.random() * diceSize) + 1;
        diceResult += rollResult;
    }

    return diceResult;
}

function applyFormulaOperator(value: number, operator: DiceFormulaOperators): number {
    let result: number = 0;
    switch (operator) {
        case DiceFormulaOperators.Addition: result += value; break;
        case DiceFormulaOperators.Subtraction: result -= value; break;
    }

    return result;
}