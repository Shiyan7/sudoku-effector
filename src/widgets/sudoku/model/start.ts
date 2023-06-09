import sudoku from 'sudoku.utils';
import { reset } from 'patronum';
import { createStore, createEvent, sample, forward } from 'effector';
import { routes } from '@/shared/routing';
import { $selectedCellIndex } from './cell';

export const $initBoard = createStore('');
export const $board = createStore('');
export const $solved = createStore('');

export const newGameStarted = createEvent();

sample({
  clock: newGameStarted,
  source: routes.game.$params,
  fn: ({ type }) => sudoku.generate(type),
  target: [$board, $initBoard],
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
