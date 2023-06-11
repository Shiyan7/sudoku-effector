import { createEvent, sample } from 'effector';
import { EMPTY_CELL } from '@/shared/config';
import { $selectedCell } from './cell';
import { $board } from './start';
import { $mistakes, cellHasMistake, removeMistake } from './mistakes';
import { hotkey } from 'effector-hotkey';
import { updateBoardWithKey } from '../lib';

export const clearClicked = createEvent();

sample({
  clock: clearClicked,
  source: { indexOfCell: $selectedCell, mistakes: $mistakes, board: $board },
  filter: cellHasMistake,
  fn: ({ board, indexOfCell }) => updateBoardWithKey(board, indexOfCell, EMPTY_CELL),
  target: $board,
});

sample({
  clock: clearClicked,
  source: { indexOfCell: $selectedCell, mistakes: $mistakes },
  filter: cellHasMistake,
  target: removeMistake,
});

hotkey({ key: 'Ctrl+x', target: clearClicked });
