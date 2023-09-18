import { createStore, createEvent, sample } from 'effector';
import { generateKillerSudoku } from 'killer-sudoku-generator';
import { reshape } from 'patronum/reshape';
import { timerModel } from '@/features/timer';
import { routes } from '@/shared/routing';
import { DEFAULT_DIFFICULTY, EMPTY_CELL } from '@/shared/config';

type Area = {
  cells: Array<[number, number]>;
  sum: number;
};

type Sudoku = {
  puzzle: string;
  solution: string;
  difficulty: string;
  areas: Area[];
};

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
  fn: ({ type }) => generateKillerSudoku(type),
  target: $sudoku,
});

sample({
  clock: $sudoku,
  fn: ({ puzzle }) => puzzle,
  target: $board,
});

sample({
  clock: $board,
  fn: (board) => board.replaceAll(EMPTY_CELL, '0').split('').map(Number),
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
