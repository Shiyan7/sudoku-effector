import { createEvent, sample } from 'effector';
import { $selectedCell } from './cell';
import { $board, $solution } from './start';
import { isCellEmptyOrMistake, updateBoardWithSolution } from '../lib';
import { $mistakes } from './mistakes';
import { hotkey } from 'effector-hotkey';
import { timerModel } from '@/features/timer';

export const hintClicked = createEvent();

hotkey({ key: 'Ctrl+v', target: hintClicked, filter: timerModel.isRunning });

sample({
  clock: hintClicked,
  filter: isCellEmptyOrMistake,
  source: { board: $board, indexOfCell: $selectedCell, solution: $solution, mistakes: $mistakes },
  fn: updateBoardWithSolution,
  target: $board,
});
