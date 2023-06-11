import { hotkey } from 'effector-hotkey';
import { TABLE_COLS, TABLE_SIZE } from '@/shared/config';
import { $selectedCell } from './cell';

const arrowUp = hotkey({ key: 'ArrowUp', type: 'keydown' });
const arrowDown = hotkey({ key: 'ArrowDown', type: 'keydown' });
const arrowLeft = hotkey({ key: 'ArrowLeft', type: 'keydown' });
const arrowRight = hotkey({ key: 'ArrowRight', type: 'keydown' });

$selectedCell
  .on(arrowUp, (state) => (state >= TABLE_COLS ? state - TABLE_COLS : state))
  .on(arrowDown, (state) => (state + TABLE_COLS < TABLE_SIZE ? state + TABLE_COLS : state))
  .on(arrowLeft, (state) => (state % TABLE_COLS !== 0 ? state - 1 : state))
  .on(arrowRight, (state) => ((state + 1) % TABLE_COLS !== 0 ? state + 1 : state));
