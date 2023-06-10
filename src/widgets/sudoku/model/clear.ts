import { createEvent, sample } from 'effector';
import { $selectedCell } from './cell';
import { $board } from './start';
import { $mistakes, cellHasMistake, removeMistake } from './mistakes';

export const clearClicked = createEvent();

sample({
  clock: clearClicked,
  source: { indexOfCell: $selectedCell, mistakes: $mistakes, board: $board },
  filter: cellHasMistake,
  fn: ({ board, indexOfCell }) => board.substring(0, indexOfCell) + '.' + board.substring(indexOfCell + 1),
  target: $board,
});

sample({
  clock: clearClicked,
  source: { indexOfCell: $selectedCell, mistakes: $mistakes },
  filter: cellHasMistake,
  target: removeMistake,
});
