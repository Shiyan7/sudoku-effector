import sudoku from 'sudoku.utils';
import { reset } from 'patronum';
import { createStore, createEvent, sample, forward } from 'effector';
import { timerModel } from '@/features/timer';
import { routes } from '@/shared/routing';
import { $selectedCellIndex } from './cell';
import { $history, sendHistory } from './history';

export const $initBoard = createStore('');
export const $board = createStore('');
export const $solved = createStore('');

export const newGameStarted = createEvent();

forward({
  from: [routes.game.opened, routes.game.updated],
  to: newGameStarted,
});

sample({
  clock: newGameStarted,
  source: { params: routes.game.$params, history: $history },
  fn: ({ params }) => sudoku.generate(params.type),
  target: sendHistory,
});

sample({
  clock: $history,
  fn: (array) => array[array.length - 1],
  target: [$board, $initBoard],
});

sample({
  clock: $board,
  fn: (board) => sudoku.solve(board),
  target: $solved,
});

forward({
  from: newGameStarted,
  to: [timerModel.stopTimer, timerModel.startTimer],
});

reset({
  clock: newGameStarted,
  target: [$selectedCellIndex, timerModel.$time],
});
