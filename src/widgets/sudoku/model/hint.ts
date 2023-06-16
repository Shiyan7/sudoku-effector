import { createEvent, sample } from 'effector';
import { hotkey } from 'effector-hotkey';
import { EMPTY_CELL } from '@/shared/config';
import { $selectedCell } from './cell';
import { $board, $solved } from './start';
import { updateBoardWithKey } from '../lib';
import { $mistakes } from './mistakes';

export const hintClicked = createEvent();

function isCellEmptyOrMistake(board: string, indexOfCell: number, mistakes: Set<number>) {
  const charAtIndex = board.charAt(indexOfCell);
  return charAtIndex === EMPTY_CELL || mistakes.has(indexOfCell);
}

function getUpdatedBoard(board: string, indexOfCell: number, solved: string) {
  const solvedValue = solved.charAt(indexOfCell);
  return updateBoardWithKey(board, indexOfCell, solvedValue);
}

sample({
  clock: hintClicked,
  source: { board: $board, indexOfCell: $selectedCell, solved: $solved, mistakes: $mistakes },
  filter: ({ board, indexOfCell, mistakes }) => isCellEmptyOrMistake(board, indexOfCell, mistakes),
  fn: ({ board, indexOfCell, solved }) => getUpdatedBoard(board, indexOfCell, solved),
  target: $board,
});

hotkey({ key: 'Ctrl+v', target: hintClicked });
