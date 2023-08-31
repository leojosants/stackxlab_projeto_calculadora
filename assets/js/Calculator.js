export default class Calculator {
    constructor(previous_operand_text_element, current_operand_text_element, data_container, history) {
        this.previous_operand_text_element = previous_operand_text_element;
        this.current_operand_text_element = current_operand_text_element;
        this.data_container = data_container;
        this.count = 0;
        this.history = history;
        this.clear();
    };

    incrementCount(value) {
        this.count += value;
    };

    decrementCount(value) {
        this.count -= value;
    };

    #formatDisplayNumber(number) {
        const string_number = number.toString();
        const integer_digits = parseFloat(string_number.split('.')[0]);
        const decimal_digits = string_number.split('.')[1];

        let integer_display;

        if (isNaN(integer_digits)) {
            integer_display = '';
        }
        else {
            integer_display = integer_digits.toLocaleString('en', {
                maximumFractionDigits: 0,
            });
        };

        if (decimal_digits != null) {
            return `${integer_display}.${decimal_digits}`;
        }
        else {
            return integer_display;
        };
    };

    delete() {
        this.current_operand = this.current_operand.toString().slice(0, -1);
    };

    calculate() {
        let result;

        const result_history = {
            data: [],
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        };

        const previous_operand_float = parseFloat(this.previous_operand);
        const current_operand_float = parseFloat(this.current_operand);

        if (isNaN(previous_operand_float) || isNaN(current_operand_float)) {
            return;
        };

        switch (this.operation) {
            case '+':
                result = previous_operand_float + current_operand_float;
                break;

            case '-':
                result = previous_operand_float - current_operand_float;
                break;

            case '*':
                result = previous_operand_float * current_operand_float;
                break;

            case '/':
                if (current_operand_float === 0) {
                    alert('Não é possível realizar divisão por ZERO.');
                    this.clear();
                    return;
                };
                result = previous_operand_float / current_operand_float;
                break;

            default:
                return;
        };

        this.current_operand = result;
        result_history.data.push(previous_operand_float, this.operation, current_operand_float, result);

        if (this.count < 4) {
            this.#createDataContainer(result_history);
            this.incrementCount(1);
        };

        this.operation = undefined;
        this.previous_operand = '';
    };

    #createDataContainer(result_history) {
        this.history.classList.remove('hide');

        const div_container = document.createElement('div');
        div_container.classList.add('result_date');

        const div_data = document.createElement('div');

        const label_date = document.createElement('label');
        label_date.innerHTML += '<i class="bi bi-calendar3"></i>';
        label_date.innerHTML += `<input disabled style="background-color: #fff;" type="text" value=${result_history.date} />`;

        const label_time = document.createElement('label');
        label_time.innerHTML += '<i class="bi bi-alarm"></i>';
        label_time.innerHTML += `<input disabled style="background-color: #fff;" type="text" value=${result_history.time} />`;

        const label_result = document.createElement('label');
        label_result.innerHTML += '<i style="cursor: help;" class="bi bi-calculator-fill"></i>';
        label_result.innerHTML += `<input class="result" disabled type="text" style="cursor: help; background-color: #fff;" value='${result_history.data[0]} ${result_history.data[1]} ${result_history.data[2]} = ${result_history.data[3]}' />`;

        const label_trash = document.createElement('label');
        label_trash.innerHTML += '<i style="cursor: pointer;" class="bi bi-trash3"></i>';
        label_trash.innerHTML += '<input readOnly class="delete" type="text" value="Deletar" style="cursor: pointer;" />';

        div_data.appendChild(label_date);
        div_data.appendChild(label_time);
        div_data.appendChild(label_result);
        div_data.appendChild(label_trash);
        div_container.appendChild(div_data);
        this.data_container.appendChild(div_container);
    };

    chooseOperation(operation) {
        if (this.current_operand === '') {
            alert('Operação já finalizada ou campo vazio');
            return;
        };

        if (this.previous_operand !== '') {
            this.calculate();
        };

        this.operation = operation;
        this.previous_operand = this.current_operand;
        this.current_operand = '';
    };

    appendNumber(number) {
        if (this.current_operand.includes('.') && number === '.') {
            return;
        };
        this.current_operand = `${this.current_operand}${number.toString()}`;
    };

    clear() {
        this.current_operand = '';
        this.previous_operand = '';
        this.operation = undefined;
    };

    updateDisplay() {
        this.previous_operand_text_element.innerText = `${this.#formatDisplayNumber(this.previous_operand)} ${this.operation || ''}`;
        this.current_operand_text_element.innerText = this.#formatDisplayNumber(this.current_operand);
    };
};