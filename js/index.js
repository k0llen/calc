let firstNumber = '0', secondNumber = '', operator = '', finish = false;

const buttons = document.querySelector('.calculator-buttons');
const screenText = document.querySelector('.calculator-display-current');
const acButton = document.querySelector('[data-value="ac"]');

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9','.'];
const operators = ['(', ')', 'mc', 'm+', 'm-', 'mr', '2nd', 'x2', 'x3', 'xy', 'ex', '10x', '1/x', '2√x', '3√x', 'y√x', 'ln', 'log10', 'x1', 'sin', 'cos', 'tan', 'e', 'ee', 'rad', 'sinh', 'cosh', 'tanh', 'oi', 'rand', '+-', '+', '-', '*', '/', '%'];

function clearAll() {
    firstNumber = '0';
    secondNumber = '';
    operator = '';
    finish = false;
    screenText.innerHTML = 0;
}

buttons.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn')) {
        const key = event.target.dataset.value;
        const firstNumberBuff = firstNumber;
        const funResult = () => {
            if(secondNumber === '') secondNumber = firstNumber;
            switch (operator) {
                case '+':
                    firstNumber = (+firstNumber) + (+secondNumber);
                    break;
                case '-':
                    firstNumber = firstNumber - secondNumber;
                    break;
                case '*':
                    firstNumber = firstNumber * secondNumber;
                    break;
                case '/':
                    if (secondNumber == '0') {
                        firstNumber = 0;
                    } else {
                        firstNumber = (+firstNumber) / (+secondNumber);
                    }
                    break;
                case 'xy':
                    for (let i = 1; i < secondNumber; i++) firstNumber *= firstNumberBuff;
                    break;
            }
            screenText.innerHTML = Intl.NumberFormat().format(firstNumber);
            finish = true;
        };
        if (acButton.contains(event.target)) {
            clearAll();
        }
        if (numbers.includes(key)) {
            if (secondNumber === '' && operator === '') {
                if (firstNumber === '0' && key !== '.') {
                    firstNumber = key;
                    screenText.innerHTML = Intl.NumberFormat().format(firstNumber);
                } else if (key === '.'){
                    firstNumber += key;
                    screenText.innerHTML = firstNumber;
                }else {
                    firstNumber += key;
                    screenText.innerHTML = Intl.NumberFormat().format(firstNumber);
                }
            } else if (firstNumber !== '' && secondNumber !== '' && finish) {
                secondNumber = key;
                finish = false;
                screenText.innerHTML = Intl.NumberFormat().format(secondNumber);
            } else {
                secondNumber += key;
                screenText.innerHTML = Intl.NumberFormat().format(secondNumber);
            }
        }
        if (operators.includes(key)) {
            if (operator === '') {
                operator = key;
            } else if (operator !== '') {
                if(key === '%') {
                    secondNumber = firstNumber / 100 * secondNumber;
                } else {
                    operator = key;
                    secondNumber = firstNumber;
                }
                
            }
        }

        switch(key) {
            case '=': 
                funResult();
                break;
            case 'x2':            
                firstNumber = firstNumber * firstNumber;
                screenText.innerHTML = Intl.NumberFormat().format(firstNumber);
                finish = true;
                break;
            case 'x3': 
                firstNumber = firstNumber * firstNumber * firstNumber;
                screenText.innerHTML = Intl.NumberFormat().format(firstNumber);
                finish = true;
                break;
            case '10x':
                if (firstNumber < 161) {
                    if (firstNumber === '0' ?? firstNumber === '') {
                        firstNumber = 1;
                        screenText.innerHTML = '1';
                    } else {
                        firstNumber = 10;
                        for (let i = 1; i < firstNumberBuff; i++) firstNumber *= 10;
                        screenText.innerHTML = Intl.NumberFormat().format(firstNumber);
                    }
                    finish = true;
                } else {
                    screenText.innerHTML = 'Ошибка';
                }
                break;
            case '1/x':
                firstNumber = 1 / firstNumber;
                screenText.innerHTML = Intl.NumberFormat().format(firstNumber);
                break;
        }
    }
    console.log(firstNumber, operator, secondNumber, finish);
});

const clearBtn = document.querySelector('.clear-btn');
clearBtn.addEventListener('click',()=> console.clear());