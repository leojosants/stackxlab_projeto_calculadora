export default class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement, dataContainer, history) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.dataContainer = dataContainer;
        this.history = history;
        this.clear();
    };

    formatDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = integerDigits.toLocaleString(
                'en', { maximumFractionDigits: 0 }
            );
        };

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }
        else {
            return integerDisplay;
        };
    };

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };

    calculate() {
        let result;

        const resultHistory = {
            data: [],
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        };

        const previousOperandFloat = parseFloat(this.previousOperand);
        const currentOperandFloat = parseFloat(this.currentOperand);

        const operationsSymbols = {
            adition: '+',
            subtraction: '-',
            multiplication: '*',
            division: '/',
        };

        if (isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) {
            return;
        };

        switch (this.operation) {
            case operationsSymbols.adition:
                result = previousOperandFloat + currentOperandFloat;
                break;

            case operationsSymbols.subtraction:
                result = previousOperandFloat - currentOperandFloat;
                break;

            case operationsSymbols.multiplication:
                result = previousOperandFloat * currentOperandFloat;
                break;

            case operationsSymbols.division:
                if (currentOperandFloat === 0) {
                    alert('Não é possível realizar divisão por ZERO.');
                    this.clear();
                    return;
                };
                result = previousOperandFloat / currentOperandFloat;
                break;

            default:
                return;
        };

        this.currentOperand = result;

        resultHistory.data.push(
            previousOperandFloat,
            this.operation,
            currentOperandFloat,
            result,
        );

        if (this.dataContainer.childNodes.length > 3) {
            this.dataContainer.innerHTML = '';
        }

        this.createDataContainer(resultHistory);
        this.operation = undefined;
        this.previousOperand = '';
        this.currentOperand = '';
    };

    createElementFN(element) {
        return document.createElement(element);
    }

    createDataContainer(resultHistory) {
        this.history.classList.remove('class-hide');

        const divContainer = this.createElementFN('div');
        divContainer.classList.add('class-result-date');

        const divData = this.createElementFN('div');

        const labelDate = this.createElementFN('label');
        labelDate.innerHTML += '<i class="bi bi-calendar3"></i>';
        labelDate.innerHTML += `<input disabled style="background-color: #fff;" type="text" value=${resultHistory.date} />`;

        const labelTime = this.createElementFN('label');
        labelTime.innerHTML += '<i class="bi bi-alarm"></i>';
        labelTime.innerHTML += `<input disabled style="background-color: #fff;" type="text" value=${resultHistory.time} />`;

        const labelResult = this.createElementFN('label');
        labelResult.innerHTML += '<i style="cursor: help;" class="bi bi-calculator-fill"></i>';
        labelResult.innerHTML += `<input class="class-result" readonly type="text" style="cursor: help; background-color: #fff;" value='${resultHistory.data[0]} ${resultHistory.data[1]} ${resultHistory.data[2]} = ${resultHistory.data[3]}' />`;

        const labelTrash = this.createElementFN('label');
        labelTrash.innerHTML += '<i style="cursor: pointer;" class="bi bi-trash3"></i>';
        labelTrash.innerHTML += '<input readOnly class="class-delete" type="text" value="Deletar" style="cursor: pointer;" />';

        divData.appendChild(labelDate);
        divData.appendChild(labelTime);
        divData.appendChild(labelResult);
        divData.appendChild(labelTrash);
        divContainer.appendChild(divData);
        this.dataContainer.appendChild(divContainer);
    };

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            alert('Operação já finalizada ou campo vazio');
            return;
        };

        if (this.previousOperand !== '') {
            this.calculate();
        };

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    };

    appendNumber(number) {
        if (this.currentOperand.includes('.') && number === '.') {
            return;
        };
        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    };

    // adicionar resultado na tela ao clicar no histórico
    insertDisplay(number) {
        this.currentOperand = number;
        this.updateDisplay()
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    };

    updateDisplay() {
        this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ''}`;
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);
    };
};