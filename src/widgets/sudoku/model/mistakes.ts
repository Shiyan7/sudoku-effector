import { createEvent, createStore } from 'effector';

export const wrongCellClicked = createEvent<{ indexOfCell: number }>();

export const removeMistake = createEvent<{ indexOfCell: number }>();

export const $mistakes = createStore<Set<number>>(new Set());

$mistakes.on(wrongCellClicked, (mistakes, { indexOfCell }) => {
  return new Set([...mistakes, indexOfCell]);
});

$mistakes.on(removeMistake, (mistakes, { indexOfCell }) => {
  return new Set([...mistakes].filter((mistakeIdx) => mistakeIdx !== indexOfCell));
});
