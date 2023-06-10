import { createStore, createEvent, sample } from 'effector';

export const $selectedCell = createStore(0);
export const $selectedRow = createStore(0);
export const $selectedColumn = createStore(0);
export const cellSelected = createEvent<{ index: number }>();

sample({
  clock: cellSelected,
  fn: ({ index }) => index,
  target: $selectedCell,
});

sample({
  clock: $selectedCell,
  fn: (index) => Math.floor(index / 9),
  target: $selectedRow,
});

sample({
  clock: $selectedCell,
  fn: (index) => index % 9,
  target: $selectedColumn,
});
