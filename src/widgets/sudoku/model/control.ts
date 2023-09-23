import { createEffect, createEvent, createStore, sample } from 'effector';
import { hotkey } from 'effector-hotkey';
import { $selectedCell } from './cell';
import { $board, $solution } from './start';
import { $countMistakes } from './status';
import { isCellHasMistake, updateBoardWithErrorHandling, updateBoardWithKey } from '../lib';
import { hintClicked } from './hint';
import { $mistakes, removeMistake, wrongCellClicked } from './mistakes';
import { clearClicked } from './clear';

export const $updatedBoard = createStore('');

const $key = createStore('');

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
    solution: $solution,
    mistakes: $mistakes,
    key: $key,
  },
  target: updateBoardFx,
});

sample({
  clock: [updateBoardFx.doneData, hintClicked, clearClicked],
  source: { mistakes: $mistakes, indexOfCell: $selectedCell },
  filter: isCellHasMistake,
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
