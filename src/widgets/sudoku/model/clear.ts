import { createEvent, sample } from 'effector';
import { EMPTY_CELL } from '@/shared/config';
import { $selectedCell } from './cell';
import { $board } from './start';
import { isCellHasMistake, updateBoardWithKey } from '../lib';
import { $mistakes, removeMistake } from './mistakes';

export const clearClicked = createEvent();

sample({
  clock: clearClicked,
  filter: isCellHasMistake,
  source: { indexOfCell: $selectedCell, mistakes: $mistakes, board: $board },
  fn: ({ board, indexOfCell }) => updateBoardWithKey({ board, indexOfCell, key: EMPTY_CELL }),
  target: $board,
});
