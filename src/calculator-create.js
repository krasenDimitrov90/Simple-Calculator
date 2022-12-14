export const calc = {
    operation: null,
    isEqualBtnClicked: false,
    result: null,
    previousOperandAsText: '',
    currentOperandAsText: '',
    finalResult() {

        calc.result = calc.previousOperandAsText.toString();
        calc.previousOperandAsText = '';
        calc.currentOperandAsText = ''
        calc.operation = null;
    },
    delete() {

        calc.currentOperandAsText = calc.currentOperandAsText.slice(0, -1);
    },
    allClear() {

        calc.currentOperandAsText = '';
        calc.previousOperandAsText = '';
        calc.operation = null;
        calc.isEqualBtnClicked = false;
        calc.result = null;
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

        // if (calc.isEqualBtnClicked) {
        //     previousValueEl.textContent = '';
        //     let [beforeDecimal, afterDecimal] = calc.result.split('.');
        //     currentValueEl.textContent = Number(beforeDecimal).toLocaleString('fr');
        //     if (afterDecimal) {
        //         currentValueEl.textContent += '.' + afterDecimal;
        //     }
        //     return;
        // }
        if (!calc.currentOperandAsText) {
            currentValueEl.textContent = '';
        }
        let [beforeDecimal, afterDecimal] = calc.currentOperandAsText.split('.') || calc.result.split('.');
        currentValueEl.textContent = Number(beforeDecimal).toLocaleString('fr');
        if (afterDecimal) {
            currentValueEl.textContent += '.' + afterDecimal;
        }

        if (calc.isEqualBtnClicked) {
            previousValueEl.textContent = '';
            return;
        }
        // } else if (!calc.currentOperandAsText.includes('.')) {
        //     currentValueEl.textContent = Number(calc.currentOperandAsText).toLocaleString('fr')
        // }

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
        calc.operation = null;
    }
}