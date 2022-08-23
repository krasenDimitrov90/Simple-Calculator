export const calc = {
    operation: null,
    previousOperandAsText: '',
    currentOperandAsText: '',
    finalResult() {

        calc.currentOperandAsText = calc.previousOperandAsText.toString();
        calc.previousOperandAsText = '';
        calc.operation = null;
    },
    delete() {

        calc.currentOperandAsText = calc.currentOperandAsText.slice(0, -1);
    },
    allClear() {

        calc.currentOperandAsText = '';
        calc.previousOperandAsText = '';
        calc.operation = null;
    },
    appendNumber(number) {

        if (calc.currentOperandAsText === '' && number === '.') {
            calc.currentOperandAsText = '0.';
            return;
        }
        if (calc.currentOperandAsText.includes('.') && number === '.') return;
        calc.currentOperandAsText += number.toString();
    },
    updateDisplay(currentValueEl, previousValueEl) {

        if (calc.currentOperandAsText.includes('.')) {
            let [beforeDecimal, afterDecimal] = calc.currentOperandAsText.split('.');
            currentValueEl.textContent = Number(beforeDecimal).toLocaleString('fr') + '.' + afterDecimal;

        } else if (!calc.currentOperandAsText) {
            currentValueEl.textContent = '';

        } else if (!calc.currentOperandAsText.includes('.')) {
            currentValueEl.textContent = Number(calc.currentOperandAsText).toLocaleString('fr')
        }
        
        if (calc.previousOperandAsText && calc.operation) {
            previousValueEl.textContent = calc.previousOperandAsText + ' ' + calc.operation;

        } else if (!calc.previousOperandAsText || !calc.operation) {
            previousValueEl.textContent = '';
        }
    },
    updateOperation(operation) {

        if (!calc.operation && calc.currentOperandAsText) {
            calc.operation = operation;
            calc.previousOperandAsText = calc.currentOperandAsText;
            calc.currentOperandAsText = '';
            
        } else if (calc.currentOperandAsText === '' && calc.previousOperandAsText) {
            calc.operation = operation;
            
        } else if (calc.currentOperandAsText !== '') {
            calc.operation = operation;
        }
    },
    compute(operation) {

        let result;
        switch (operation) {
            case '÷':
                result = parseFloat(calc.previousOperandAsText) / parseFloat(calc.currentOperandAsText);
                break;
            case '*':
                result = parseFloat(calc.previousOperandAsText) * parseFloat(calc.currentOperandAsText);
                break;
            case '+':
                result = parseFloat(calc.previousOperandAsText) + parseFloat(calc.currentOperandAsText);
                break;
            case '-':
                result = parseFloat(calc.previousOperandAsText) - parseFloat(calc.currentOperandAsText);
                break;
        }
        calc.previousOperandAsText = result.toString();
        calc.currentOperandAsText = '';
    }
}