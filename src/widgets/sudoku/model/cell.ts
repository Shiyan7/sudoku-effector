import { createStore, createEvent, sample } from 'effector';

export const $selectedCellIndex = createStore(0);
export const cellSelected = createEvent<{ index: number }>();

sample({
  clock: cellSelected,
  fn: ({ index }) => index,
  target: $selectedCellIndex,
});
