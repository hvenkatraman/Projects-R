import { initDisplay } from './display.js';
import { initEvents } from './events.js';
import { initOperations } from './operations.js';

function initCalculator() {
  initDisplay();
  initEvents();
  initOperations();
}

initCalculator();