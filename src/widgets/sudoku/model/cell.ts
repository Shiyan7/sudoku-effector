import { createStore, createEvent, sample } from 'effector';

export const $selectedCellIndex = createStore(0);
export const $selectedRow = createStore(0);
export const $selectedColumn = createStore(0);
export const cellSelected = createEvent<{ index: number }>();

sample({
  clock: cellSelected,
  fn: ({ index }) => index,
  target: $selectedCellIndex,
});

sample({
  clock: $selectedCellIndex,
  fn: (index) => Math.floor(index / 9),
  target: $selectedRow,
});

sample({
  clock: $selectedCellIndex,
  fn: (index) => index % 9,
  target: $selectedColumn,
});
