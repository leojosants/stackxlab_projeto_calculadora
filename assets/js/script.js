import Calculator from "./Calculator.js";

/* selected elements */
const powerButton = document.querySelector('[data-power]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const numbeButtons = document.querySelectorAll('[data-number]');
const allClearButton = document.querySelector('[data-all-clear]');
const history = document.querySelector('[data-history-container]');
const operationButtons = document.querySelectorAll('[data-operator]');
const dataContainer = document.querySelector('[data-result-date-container]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');

// instance
const calculator = new Calculator(
    previousOperandTextElement, currentOperandTextElement, dataContainer, history
);

const events = {
    click: 'click',
}

/* events */
for (const numberButton of numbeButtons) {
    numberButton.addEventListener(
        events.click, () => {
            calculator.appendNumber(numberButton.innerText);
            calculator.updateDisplay();
        }
    );
};

for (const operationButton of operationButtons) {
    operationButton.addEventListener(
        events.click, () => {
            calculator.chooseOperation(operationButton.innerText);
            calculator.updateDisplay();
        }
    );
};

allClearButton.addEventListener(
    events.click, () => {
        calculator.clear();
        calculator.updateDisplay();
    }
);

equalsButton.addEventListener(
    events.click, () => {
        if (calculator.currentOperand === '') {
            calculator.updateDisplay();
            alert('Operação já finalizada ou campo vazio');
            return;
        };

        calculator.calculate();
        calculator.updateDisplay();
        calculator.clear();
    }
);

deleteButton.addEventListener(
    events.click, () => {
        calculator.delete();
        calculator.updateDisplay();
    }
);

document.addEventListener(
    events.click, (event) => {
        const targetElement = event.target;
        const parentElement = targetElement.closest('div');

        if (!history.className.includes('class-hide')) {
            powerButton.classList.add('class-active');
        }

        if (targetElement.classList.value.includes('class-result')) {
            calculator.insertDisplay(targetElement.value.split('=')[1].trim())
        }

        if (targetElement.classList.contains('class-delete')) {
            parentElement.remove();
        };
    }
);

powerButton.addEventListener(
    events.click, () => {
        location.reload();
    }
);
