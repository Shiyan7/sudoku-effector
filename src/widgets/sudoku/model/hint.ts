import { createEvent, sample } from 'effector';
import { $selectedCell } from './cell';
import { $board, $solution } from './start';
import { isCellEmptyOrMistake, updateBoardWithSolution } from '../lib';
import { historyUpdated } from './history';
import { $mistakes } from './status';

export const hintClicked = createEvent();

sample({
  clock: hintClicked,
  filter: isCellEmptyOrMistake,
  source: { board: $board, indexOfCell: $selectedCell, solution: $solution, mistakes: $mistakes },
  fn: updateBoardWithSolution,
  target: historyUpdated,
});
