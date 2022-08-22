const numbers = document.querySelectorAll('.number');
const operands = document.querySelectorAll('.operand');
const deleteBtn = document.querySelector('.delete');
const allClearBtn = document.querySelector('.AC');
const calculateBtn = document.querySelector('.calculate');

const previousValueEl = document.querySelector('.prev-value');
const currentValueEl = document.querySelector('.current-value');

Array.from(numbers)
    .forEach(btn => btn.addEventListener('click', (e) => {
        calculator.appendNumber(e.currentTarget.textContent);
        calculator.updateDisplay();
    }))

Array.from(operands)
    .forEach(operand => operand.addEventListener('click', (e) => {
        calculator.updatePreviousNumberAsText(e.currentTarget.textContent);
        calculator.updateDisplay();
    }))
calculateBtn.addEventListener('click', () => {
    calculator.compute(calculator.operation);
    calculator.updateResult();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

allClearBtn.addEventListener('click', () => {
    calculator.allClear();
    calculator.updateDisplay();
})

const calculator = {
    previousOperand: null,
    currentOperand: null,
    operation: null,
    previousOperandAsText: '',
    currentOperandAsText: '',
    updateResult() {
        calculator.currentOperandAsText = calculator.previousOperandAsText;
        calculator.previousOperandAsText = '';
        calculator.operation = null;
    },
    delete() {
        calculator.currentOperandAsText = calculator.currentOperandAsText.slice(0, -1);
        calculator.updateDisplay();
    },
    allClear() {
        calculator.currentOperandAsText = '';
        calculator.previousOperandAsText = '';
        calculator.operation = null;
        calculator.updateDisplay();
    },
    appendNumber(number) {
        if (calculator.currentOperandAsText === '' && number === '.') {
            calculator.currentOperandAsText = '0.';
            return;
        }
        if (calculator.currentOperandAsText.includes('.') && number === '.') return;
        calculator.currentOperandAsText += number;
    },
    updateDisplay() {
        currentValueEl.textContent = calculator.currentOperandAsText;
        if (calculator.previousOperandAsText && calculator.operation) {
            previousValueEl.textContent = calculator.previousOperandAsText + ' ' + calculator.operation;
        } else if(!calculator.previousOperandAsText || !calculator.operation) {
            previousValueEl.textContent = '';
        }
    },
    updatePreviousNumberAsText(operation) {
        if (!calculator.operation) {
            calculator.operation = operation;
            calculator.previousOperandAsText = calculator.currentOperandAsText;
            calculator.currentOperandAsText = '';
            calculator.updateDisplay();
        } else if (calculator.currentOperandAsText === '') {
            calculator.operation = operation;
            calculator.updateDisplay();
        } else if (calculator.currentOperandAsText !== '') {
            calculator.compute(calculator.operation);
            calculator.operation = operation;
        }
    },
    compute(operation) {
        let result;
        switch (operation) {
            case '÷':
                result = parseFloat(calculator.previousOperandAsText) / parseFloat(calculator.currentOperandAsText);
                break;
            case '*':
                result = parseFloat(calculator.previousOperandAsText) * parseFloat(calculator.currentOperandAsText);
                break;
            case '+':
                result = parseFloat(calculator.previousOperandAsText) + parseFloat(calculator.currentOperandAsText);
                break;
            case '-':
                result = parseFloat(calculator.previousOperandAsText) - parseFloat(calculator.currentOperandAsText);
                break;
        }
        calculator.previousOperandAsText = result;
        calculator.currentOperandAsText = '';
        calculator.updateDisplay();
    }
}