import { createStore, createEvent, sample, forward, split } from 'effector';
import { generateKillerSudoku } from 'killer-sudoku-generator';
import { reshape } from 'patronum/reshape';
import { timerModel } from '@/features/timer';
import { routes } from '@/shared/routing';

type Area = {
  cells: Array<number[]>;
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
  difficulty: 'easy',
  areas: [],
});

export const $board = createStore('');
export const newGameStarted = createEvent();

forward({
  from: [routes.game.opened, routes.game.updated],
  to: newGameStarted,
});

forward({
  from: newGameStarted,
  to: [timerModel.stopTimer, timerModel.startTimer],
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

export const { $initBoard, $solved, $areas } = reshape({
  source: $sudoku,
  shape: {
    $initBoard: (sudoku) => sudoku.puzzle,
    $solved: (sudoku) => sudoku.solution,
    $areas: (sudoku) => sudoku.areas,
  },
});
