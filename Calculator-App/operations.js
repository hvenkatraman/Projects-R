import { getState, setState } from './state.js';
import { updateDisplay } from './display.js';

export function initOperations() {
  // No initialization needed for now
}

export function evaluateExpression() {
  const { currentExpression } = getState();
  try {
    const result = eval(currentExpression);
    updateDisplay(result);
    setState(String(result), true);
  } catch (error) {
    updateDisplay('Error');
    setState('', true);
  }
}

export function appendOperator(op) {
  const { currentExpression, shouldResetDisplay } = getState();
  const sanitizedOp = op.replace('×', '*').replace('÷', '/');
  const newExpression = shouldResetDisplay
    ? display.value + sanitizedOp
    : currentExpression + sanitizedOp;
  setState(newExpression, true);
  updateDisplay(op);
}