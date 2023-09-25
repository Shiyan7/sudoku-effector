import { hotkey } from 'effector-hotkey';
import { TABLE_COLS, TABLE_SIZE } from '@/shared/config';
import { $selectedCell } from './cell';
import { timerModel } from '@/features/timer';

const arrowUp = hotkey({ key: 'ArrowUp', type: 'keydown', filter: timerModel.isRunning });
const arrowDown = hotkey({ key: 'ArrowDown', type: 'keydown', filter: timerModel.isRunning });
const arrowLeft = hotkey({ key: 'ArrowLeft', type: 'keydown', filter: timerModel.isRunning });
const arrowRight = hotkey({ key: 'ArrowRight', type: 'keydown', filter: timerModel.isRunning });

$selectedCell
  .on(arrowUp, (state) => (state >= TABLE_COLS ? state - TABLE_COLS : state))
  .on(arrowDown, (state) => (state + TABLE_COLS < TABLE_SIZE ? state + TABLE_COLS : state))
  .on(arrowLeft, (state) => (state % TABLE_COLS !== 0 ? state - 1 : state))
  .on(arrowRight, (state) => ((state + 1) % TABLE_COLS !== 0 ? state + 1 : state));
