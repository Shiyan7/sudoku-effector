import { createEvent, createStore } from 'effector';

export const $history = createStore<string[]>([]);

export const historyUpdated = createEvent<string>();

$history.on(historyUpdated, (state, puzzle) => {
  const lastElement = state.at(-1);

  if (lastElement !== puzzle) {
    return [...state, puzzle];
  }
});

export const backwardClicked = createEvent();

$history.on(backwardClicked, (state) => {
  if (state.length > 1) {
    return state.slice(0, -1);
  }
});
