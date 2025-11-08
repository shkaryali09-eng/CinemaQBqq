document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelector('.buttons');
    let currentInput = '0';
    let operator = null;
    let previousInput = null;
    let shouldResetDisplay = false;

    buttons.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.matches('button')) {
            return;
        }

        const value = target.dataset.value;

        if (value === 'C') {
            currentInput = '0';
            operator = null;
            previousInput = null;
        } else if (value === '=') {
            if (operator && previousInput !== null) {
                try {
                    // Use a safer way to evaluate than eval()
                    const result = new Function('return ' + previousInput + operator + currentInput)();
                    currentInput = String(result);
                    operator = null;
                    previousInput = null;
                } catch (error) {
                    currentInput = 'Error';
                }
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            operator = value;
            previousInput = currentInput;
            shouldResetDisplay = true;
        } else { // It's a number or dot
            if (currentInput === '0' || shouldResetDisplay) {
                currentInput = value;
                shouldResetDisplay = false;
            } else {
                currentInput += value;
            }
        }

        display.textContent = currentInput;
    });
});