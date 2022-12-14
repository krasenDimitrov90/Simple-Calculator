import { calc } from './calculator-create.js'
const calculator = calc

const numbers = document.querySelectorAll('.number');
const operands = document.querySelectorAll('.operand');
const deleteBtn = document.querySelector('.delete');
const allClearBtn = document.querySelector('.AC');
const calculateBtn = document.querySelector('.calculate');

const previousValueEl = document.querySelector('.prev-value');
const currentValueEl = document.querySelector('.current-value');

Array.from(numbers)
    .forEach(btn => btn.addEventListener('click', (e) => {
        if (calculator.isEqualBtnClicked) {
            calculator.allClear();
            calculator.isEqualBtnClicked = false;
        }
        calculator.appendNumber(e.currentTarget.textContent);
        calculator.updateDisplay(currentValueEl, previousValueEl);
    }))

Array.from(operands)
    .forEach(operand => operand.addEventListener('click', (e) => {

        if (calculator.isEqualBtnClicked) {
            calculator.previousOperandAsText = calculator.result;
            calculator.result = null;
            calculator.isEqualBtnClicked = false;
        }
        if(calculator.currentOperandAsText && calculator.previousOperandAsText) {
            calc.compute(calculator.operation);
        }
        calculator.updateOperation(e.currentTarget.textContent);
        calculator.updateDisplay(currentValueEl, previousValueEl);
    }))

calculateBtn.addEventListener('click', () => {
    if (!calculator.currentOperandAsText || !calculator.previousOperandAsText) return;

    calculator.isEqualBtnClicked = true;
    calculator.compute(calculator.operation);
    calculator.finalResult();
    calculator.updateDisplay(currentValueEl, previousValueEl);
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay(currentValueEl, previousValueEl);
})

allClearBtn.addEventListener('click', () => {
    calculator.allClear();
    calculator.updateDisplay(currentValueEl, previousValueEl);
})

