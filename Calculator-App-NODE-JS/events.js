import { appendToDisplay, updateDisplay } from './display.js';
import { evaluateExpression, appendOperator } from './operations.js';
import { getState, setState, resetState } from './state.js';

export function initEvents() {
  const buttons = document.querySelector('.buttons');

  // Button click events
  buttons.addEventListener('click', (e) => {
    if (!e.target.matches('button')) return;
    const type = e.target.dataset.type;
    const value = e.target.textContent;

    switch (type) {
      case 'number':
        appendToDisplay(value);
        setState(getState().currentExpression + value, false);
        break;
      case 'operator':
        appendOperator(value);
        break;
      case 'equals':
        evaluateExpression();
        break;
      case 'clear':
        updateDisplay('0');
        resetState();
        break;
      // Add cases for decimal, backspace, etc.
    }
  });

  // Keyboard events
  document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
      appendToDisplay(e.key);
      setState(getState().currentExpression + e.key, false);
    }
    if (['+', '-', '*', '/'].includes(e.key)) appendOperator(e.key);
    if (e.key === 'Enter') evaluateExpression();
    if (e.key === 'Escape') {
      updateDisplay('0');
      resetState();
    }
  });
}