import { createEffect, createEvent, createStore, sample } from 'effector';
import { hotkey } from 'effector-hotkey';
import { EMPTY_CELL } from '@/shared/config';
import { $selectedCell } from './cell';
import { $board, $solved } from './start';
import { $mistakes, cellHasMistake, removeMistake, wrongCellClicked } from './mistakes';
import { $countMistakes } from './status';
import { updateBoardWithKey } from '../lib';
import { hintClicked } from './hint';

const keys = Array.from({ length: 9 }, (_, v) => v + 1).join('+');

const keyPressed = hotkey({ key: keys });

export const numberPressed = createEvent<{ key: string }>();

export const $updatedBoard = createStore('');

type UpdateBoardParams = {
  board: string;
  updatedBoard: string;
  solved: string;
  key: string;
  indexOfCell: number;
  mistakes: Set<number>;
};

const updateBoardFx = createEffect<UpdateBoardParams, string>(
  ({ board, solved, indexOfCell, key, updatedBoard, mistakes }) => {
    const charAtIndex = board.charAt(indexOfCell);
    const solvedValue = solved.charAt(indexOfCell);

    if (charAtIndex !== EMPTY_CELL && !mistakes.has(indexOfCell)) return board;

    if (solvedValue !== key) throw Error();

    return updatedBoard;
  }
);

sample({
  clock: [keyPressed, numberPressed],
  source: { board: $board, indexOfCell: $selectedCell },
  fn: ({ board, indexOfCell }, { key }) => updateBoardWithKey(board, indexOfCell, key),
  target: $updatedBoard,
});

sample({
  clock: [keyPressed, numberPressed],
  source: {
    board: $board,
    indexOfCell: $selectedCell,
    updatedBoard: $updatedBoard,
    solved: $solved,
    mistakes: $mistakes,
  },
  fn: (params, { key }) => ({ ...params, key }),
  target: updateBoardFx,
});

sample({
  clock: [updateBoardFx.doneData, hintClicked],
  source: { mistakes: $mistakes, indexOfCell: $selectedCell },
  filter: cellHasMistake,
  target: removeMistake,
});

sample({
  clock: updateBoardFx.failData,
  source: { indexOfCell: $selectedCell },
  target: wrongCellClicked,
});

sample({
  clock: updateBoardFx.failData,
  source: $updatedBoard,
  target: $board,
});

$board.on(updateBoardFx.doneData, (_, payload) => payload);

$countMistakes.on(updateBoardFx.failData, (state) => state + 1);
