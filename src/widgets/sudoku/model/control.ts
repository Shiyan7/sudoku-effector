import { createEffect, createEvent, createStore, sample } from 'effector';
import { hotkey } from 'effector-hotkey';
import { $selectedCell } from './cell';
import { $board, $initBoard, $solution } from './start';
import { $countMistakes, $mistakes } from './status';
import { checkMistakes, updateBoardWithErrorHandling, updateBoardWithKey } from '../lib';
import { hintClicked } from './hint';
import { clearClicked } from './clear';
import { timerModel } from '@/features/timer';
import { not } from 'patronum';
import { $isNotesEnabled, cellNotesUpdated } from './notes';
import { backwardClicked, historyUpdated } from './history';

export const $updatedBoard = createStore('');

const $key = createStore('');

const keys = Array.from({ length: 9 }, (_, v) => v + 1).join('+');

export const keyPressed = hotkey({ key: keys, filter: timerModel.isRunning });

export const numberPressed = createEvent<{ key: string }>();

$key.on([keyPressed, numberPressed], (_, { key }) => key);

const updateBoardFx = createEffect(updateBoardWithErrorHandling);

sample({
  clock: [keyPressed, numberPressed],
  filter: not($isNotesEnabled),
  source: { board: $board, indexOfCell: $selectedCell, key: $key },
  fn: updateBoardWithKey,
  target: $updatedBoard,
});

sample({
  clock: [keyPressed, numberPressed],
  filter: not($isNotesEnabled),
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
  clock: [keyPressed, numberPressed],
  filter: $isNotesEnabled,
  target: cellNotesUpdated,
});

sample({
  clock: [$board, hintClicked, clearClicked, backwardClicked, cellNotesUpdated],
  source: { initBoard: $initBoard, board: $board, solution: $solution },
  fn: checkMistakes,
  target: $mistakes,
});

sample({
  clock: updateBoardFx.failData,
  source: $updatedBoard,
  target: historyUpdated,
});

sample({
  clock: updateBoardFx.doneData,
  target: historyUpdated,
});

$countMistakes.on(updateBoardFx.failData, (state) => state + 1);
