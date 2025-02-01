let currentExpression = '';
let shouldResetDisplay = false;

export function getState() {
  return { currentExpression, shouldResetDisplay };
}

export function setState(newExpression, resetDisplay) {
  currentExpression = newExpression;
  shouldResetDisplay = resetDisplay;
}

export function resetState() {
  currentExpression = '';
  shouldResetDisplay = false;
}