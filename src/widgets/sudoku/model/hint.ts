import { createEvent, sample } from 'effector';
import { $selectedCell } from './cell';
import { $board, $solved } from './start';
import { isCellEmptyOrMistake, updateBoardWithKey } from '../lib';
import { $mistakes } from './mistakes';

export const hintClicked = createEvent();

function getUpdatedBoard(board: string, indexOfCell: number, solved: string) {
  const solvedValue = solved.charAt(indexOfCell);

  return updateBoardWithKey({ board, indexOfCell, key: solvedValue });
}

sample({
  clock: hintClicked,
  filter: isCellEmptyOrMistake,
  source: { board: $board, indexOfCell: $selectedCell, solved: $solved, mistakes: $mistakes },
  fn: ({ board, indexOfCell, solved }) => getUpdatedBoard(board, indexOfCell, solved),
  target: $board,
});
