import { createStore, createEvent, sample } from 'effector';
import { newGameStarted } from './start';

export const $selectedCell = createStore(0);
export const $selectedRow = createStore(0);
export const $selectedColumn = createStore(0);
export const cellSelected = createEvent<{ indexOfCell: number }>();

sample({
  clock: cellSelected,
  fn: ({ indexOfCell }) => indexOfCell,
  target: $selectedCell,
});

sample({
  clock: $selectedCell,
  fn: (indexOfCell) => Math.floor(indexOfCell / 9),
  target: $selectedRow,
});

sample({
  clock: $selectedCell,
  fn: (indexOfCell) => indexOfCell % 9,
  target: $selectedColumn,
});

$selectedCell.reset(newGameStarted);
