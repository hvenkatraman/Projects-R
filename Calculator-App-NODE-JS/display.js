import { getState, setState } from './state.js';

const display = document.querySelector('.display');

export function initDisplay() {
  updateDisplay('0');
}

export function updateDisplay(value) {
  display.value = value;
}

export function appendToDisplay(value) {
  const { shouldResetDisplay } = getState();
  if (display.value === '0' || shouldResetDisplay) {
    updateDisplay(value);
    setState(getState().currentExpression, false);
  } else {
    updateDisplay(display.value + value);
  }
}