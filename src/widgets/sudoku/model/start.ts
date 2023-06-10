import sudoku from 'sudoku.utils';
import { reset } from 'patronum';
import { createStore, createEvent, sample, forward } from 'effector';
import { timerModel } from '@/features/timer';
import { routes } from '@/shared/routing';
import { $selectedCell } from './cell';

export const $initBoard = createStore<Board>('');
export const $board = createStore<Board>('');
export const $solved = createStore<Board>('');

export const newGameStarted = createEvent();

forward({
  from: [routes.game.opened, routes.game.updated],
  to: newGameStarted,
});

sample({
  clock: newGameStarted,
  source: routes.game.$params,
  fn: ({ type }) => sudoku.generate(type),
  target: [$board, $initBoard],
});

sample({
  clock: $initBoard,
  fn: (board) => sudoku.solve(board),
  target: $solved,
});

forward({
  from: newGameStarted,
  to: [timerModel.stopTimer, timerModel.startTimer],
});

reset({
  clock: newGameStarted,
  target: [$selectedCell, timerModel.$time],
});
