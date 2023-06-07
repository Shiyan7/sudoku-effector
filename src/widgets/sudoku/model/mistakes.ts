import { createStore, sample } from 'effector';

export const $mistakes = createStore(0);
export const $isLoss = createStore(false);

sample({
  clock: $mistakes,
  filter: (mistakes) => mistakes >= 3,
  fn: () => true,
  target: $isLoss,
});
