import { hotkey } from 'effector-hotkey';
import { TABLE_COLS, TABLE_SIZE } from '@/shared/config';
import { $selectedCellIndex } from './cell';

const arrowUp = hotkey({ key: 'ArrowUp', type: 'keydown' });
const arrowDown = hotkey({ key: 'ArrowDown', type: 'keydown' });
const arrowLeft = hotkey({ key: 'ArrowLeft', type: 'keydown' });
const arrowRight = hotkey({ key: 'ArrowRight', type: 'keydown' });

$selectedCellIndex
  .on(arrowUp, (state) => (state >= 9 ? state - 9 : state))
  .on(arrowDown, (state) => (state + 9 < TABLE_SIZE ? state + 9 : state))
  .on(arrowLeft, (state) => (state % TABLE_COLS !== 0 ? state - 1 : state))
  .on(arrowRight, (state) => ((state + 1) % TABLE_COLS !== 0 ? state + 1 : state));
