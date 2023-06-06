import { routes } from '@/shared/routing';
import { createStore, createEvent, sample, forward } from 'effector';
import { reset } from 'patronum';
import sudoku from 'sudoku.utils';
import { $selectedCellIndex } from './cell';

export const $board = createStore<string>('');
export const $solved = createStore<string>('');

export const newGameStarted = createEvent();

sample({
  clock: newGameStarted,
  source: routes.game.$params,
  fn: ({ type }) => sudoku.generate(type),
  target: $board,
});

sample({
  clock: $board,
  fn: (board) => sudoku.solve(board),
  target: $solved,
});

forward({
  from: [routes.game.opened, routes.game.updated],
  to: newGameStarted,
});

reset({
  clock: newGameStarted,
  target: $selectedCellIndex,
});
