import { createStore, createEvent, sample } from 'effector';
import { reshape } from 'patronum/reshape';
import { timerModel } from '@/features/timer';
import { routes } from '@/shared/routing';
import { DEFAULT_DIFFICULTY } from '@/shared/config';
import type { Sudoku } from 'sudoku-toolbox/types';
import { generateSudoku } from 'sudoku-toolbox';
import { $history, historyUpdated } from './history';

const $sudoku = createStore<Sudoku>({
  puzzle: '',
  solution: '',
  difficulty: DEFAULT_DIFFICULTY,
  areas: [],
});

export const $board = createStore('');
export const newGameStarted = createEvent();
export const $grid = createStore<number[]>([]);

sample({
  clock: [routes.game.opened, routes.game.updated],
  target: newGameStarted,
});

sample({
  clock: newGameStarted,
  target: [timerModel.stopTimer, timerModel.startTimer],
});

sample({
  clock: newGameStarted,
  source: routes.game.$params,
  fn: ({ type: difficulty }) => generateSudoku(difficulty),
  target: $sudoku,
});

sample({
  clock: $sudoku,
  fn: ({ puzzle }) => puzzle,
  target: historyUpdated,
});

sample({
  clock: $history,
  fn: (array) => array[array.length - 1],
  target: $board,
});

sample({
  clock: $board,
  fn: (board) => board.split('').map(Number),
  target: $grid,
});

export const { $initBoard, $solution, $areas } = reshape({
  source: $sudoku,
  shape: {
    $initBoard: (sudoku) => sudoku.puzzle,
    $solution: (sudoku) => sudoku.solution,
    $areas: (sudoku) => sudoku.areas,
  },
});
