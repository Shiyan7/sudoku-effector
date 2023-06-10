import { hotkey } from 'effector-hotkey';
import { $selectedCell } from './cell';

const arrowUp = hotkey({ key: 'ArrowUp', type: 'keydown' });
const arrowDown = hotkey({ key: 'ArrowDown', type: 'keydown' });
const arrowLeft = hotkey({ key: 'ArrowLeft', type: 'keydown' });
const arrowRight = hotkey({ key: 'ArrowRight', type: 'keydown' });

$selectedCell
  .on(arrowUp, (state) => (state >= 9 ? state - 9 : state))
  .on(arrowDown, (state) => (state + 9 < 9 * 9 ? state + 9 : state))
  .on(arrowLeft, (state) => (state % 9 !== 0 ? state - 1 : state))
  .on(arrowRight, (state) => ((state + 1) % 9 !== 0 ? state + 1 : state));
