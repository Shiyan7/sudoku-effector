import { createEffect, createEvent, createStore, sample } from 'effector';
import { hotkey } from 'effector-hotkey';
import { $selectedCell } from './cell';
import { $board, $solved } from './start';
import { $mistakes, cellHasMistake, removeMistake, wrongCellClicked } from './mistakes';
import { $countMistakes } from './status';

const keys = Array.from({ length: 9 }, (_, v) => v + 1).join('+');

const keyPressed = hotkey({ key: keys });

export const numberPressed = createEvent<{ key: string }>();

export const $updatedBoard = createStore<Board>('');

type UpdateBoardParams = {
  board: Board;
  updatedBoard: Board;
  solved: string;
  key: string;
  indexOfCell: number;
  mistakes: Set<number>;
};

const updateBoardFx = createEffect<UpdateBoardParams, Board>(
  ({ board, solved, indexOfCell, key, updatedBoard, mistakes }) => {
    const charAtIndex = board.charAt(indexOfCell);
    const solvedValue = solved.charAt(indexOfCell);

    if (charAtIndex !== '.' && !mistakes.has(indexOfCell)) return board;

    if (solvedValue !== key) throw Error();

    return updatedBoard;
  }
);

sample({
  clock: [keyPressed, numberPressed],
  source: { board: $board, indexOfCell: $selectedCell },
  fn: ({ board, indexOfCell }, { key }) => board.substring(0, indexOfCell) + key + board.substring(indexOfCell + 1),
  target: $updatedBoard,
});

sample({
  clock: [keyPressed, numberPressed],
  source: {
    board: $board,
    solved: $solved,
    indexOfCell: $selectedCell,
    updatedBoard: $updatedBoard,
    mistakes: $mistakes,
  },
  fn: (params, { key }) => ({ ...params, key }),
  target: updateBoardFx,
});

sample({
  clock: updateBoardFx.doneData,
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
