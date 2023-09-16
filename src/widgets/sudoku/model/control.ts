import { createEffect, createEvent, createStore, sample } from 'effector';
import { hotkey } from 'effector-hotkey';
import { $selectedCell } from './cell';
import { $board, $solved } from './start';
import { $countMistakes } from './status';
import { cellHasMistake, updateBoardWithErrorHandling, updateBoardWithKey } from '../lib';
import { hintClicked } from './hint';
import { $mistakes, removeMistake, wrongCellClicked } from './mistakes';

export const $updatedBoard = createStore<string>('');

const $key = createStore<string>('');

const keys = Array.from({ length: 9 }, (_, v) => v + 1).join('+');

export const keyPressed = hotkey({ key: keys });

export const numberPressed = createEvent<{ key: string }>();

$key.on([keyPressed, numberPressed], (_, { key }) => key);

const updateBoardFx = createEffect(updateBoardWithErrorHandling);

sample({
  clock: [keyPressed, numberPressed],
  source: { board: $board, indexOfCell: $selectedCell, key: $key },
  fn: updateBoardWithKey,
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
    key: $key,
  },
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
