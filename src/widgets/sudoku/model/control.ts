import { createEffect, createEvent, createStore, sample } from 'effector';
import { hotkey } from 'effector-hotkey';
import { $selectedCell } from './cell';
import { $board, $solved } from './start';
import { $countMistakes, $mistakes, wrongCellClicked } from './status';

const keys = Array.from({ length: 9 }, (_, v) => v + 1).join('+');

const keyPressed = hotkey({ key: keys });

export const numberPressed = createEvent<{ key: string }>();

export const $updatedBoard = createStore<Board>('');

type UpdateBoardParams = {
  board: Board;
  updatedBoard: Board;
  solved: string;
  key: string;
  index: number;
  mistakes: Set<number>;
};

const updateBoardFx = createEffect<UpdateBoardParams, Board>(
  ({ board, solved, index, key, updatedBoard, mistakes }) => {
    const charAtIndex = board.charAt(index);
    const solvedValue = solved.charAt(index);

    if (charAtIndex !== '.' && !mistakes.has(index)) return board;

    if (solvedValue !== key) throw Error();

    return updatedBoard;
  }
);

sample({
  clock: [keyPressed, numberPressed],
  source: { board: $board, index: $selectedCell },
  fn: ({ board, index }, { key }) => board.substring(0, index) + key + board.substring(index + 1),
  target: $updatedBoard,
});

sample({
  clock: [keyPressed, numberPressed],
  source: { board: $board, solved: $solved, index: $selectedCell, updatedBoard: $updatedBoard, mistakes: $mistakes },
  fn: (params, { key }) => ({ ...params, key }),
  target: updateBoardFx,
});

sample({
  clock: updateBoardFx.doneData,
  source: { mistakes: $mistakes, index: $selectedCell },
  filter: ({ mistakes, index }) => mistakes.has(index),
  fn: ({ mistakes, index }) => new Set([...mistakes].filter((i) => i !== index)),
  target: $mistakes,
});

sample({
  clock: updateBoardFx.failData,
  source: { indexCell: $selectedCell },
  target: wrongCellClicked,
});

sample({
  clock: updateBoardFx.failData,
  source: $updatedBoard,
  target: $board,
});

$board.on(updateBoardFx.doneData, (_, payload) => payload);

$countMistakes.on(updateBoardFx.failData, (state) => state + 1);
