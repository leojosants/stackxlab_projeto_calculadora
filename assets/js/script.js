import Calculator from "./Calculator.js";

/* selected elements */
const power_button = document.querySelector('[data_power]');
const equals_button = document.querySelector('[data_equals]');
const delete_button = document.querySelector('[data_delete]');
const number_buttons = document.querySelectorAll('[data_number]');
const history = document.querySelector('[data_history_container]');
const all_clear_button = document.querySelector('[data_all_clear]');
const operation_buttons = document.querySelectorAll('[data_operator]');
const data_container = document.querySelector('[data_result_date_container]');
const previous_operand_text_element = document.querySelector('[data_previous_operand]');
const current_operand_text_element = document.querySelector('[data_current_operand]');

// instance
const calculator = new Calculator(previous_operand_text_element, current_operand_text_element, data_container, history);

/* events */
for (const number_button of number_buttons) {
    number_button.addEventListener('click', () => {
        calculator.appendNumber(number_button.innerText);
        calculator.updateDisplay();
    });
};

for (const operation_button of operation_buttons) {
    operation_button.addEventListener('click', () => {
        calculator.chooseOperation(operation_button.innerText);
        calculator.updateDisplay();
    });
};

all_clear_button.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

equals_button.addEventListener('click', () => {
    if (calculator.current_operand === '') {
        calculator.updateDisplay();
        alert('Operação já finalizada ou campo vazio');
        return;
    };

    calculator.calculate();
    calculator.updateDisplay();
    calculator.clear();
});

delete_button.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

document.addEventListener('click', (e) => {
    const target_element = e.target;
    const parent_element = target_element.closest('div');

    if (target_element.classList.contains('delete')) {
        parent_element.remove();
        calculator.decrementCount(1);
    };
});

power_button.addEventListener('click', () => {
    location.reload();
});
