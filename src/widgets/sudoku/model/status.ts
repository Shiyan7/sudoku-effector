import { createEvent, createStore, sample } from 'effector';
import { difficultyModel } from '@/features/difficulty-selection';
import { createToggler } from '@/shared/lib';
import { $board, $initBoard, $solution } from './start';
import { timerModel } from '@/features/timer';

export const gameOverToggler = createToggler();
export const $countMistakes = createStore(0);

export const $mistakes = createStore<Set<number>>(new Set());
export const $isLoss = createStore(false);
export const $isWin = createStore(false);

export const newGameClicked = createEvent();
export const secondChanceClicked = createEvent();
export const cancelClicked = createEvent();
export const startAgainClicked = createEvent();

$countMistakes.on(secondChanceClicked, (state) => state - 1);

sample({
  clock: cancelClicked,
  target: [difficultyModel.difficultyToggler.close, gameOverToggler.open],
});

sample({
  clock: startAgainClicked,
  target: difficultyModel.difficultyToggler.close,
});

sample({
  clock: startAgainClicked,
  source: $initBoard,
  target: $board,
});

sample({
  clock: $countMistakes,
  filter: (mistakes) => mistakes >= 3,
  fn: () => true,
  target: [$isLoss, gameOverToggler.open],
});

sample({
  clock: secondChanceClicked,
  target: gameOverToggler.close,
});

sample({
  clock: newGameClicked,
  target: [gameOverToggler.close, difficultyModel.difficultyToggler.open],
});

sample({
  clock: $board,
  source: $solution,
  filter: (solution, board) => board === solution,
  fn: () => true,
  target: [$isWin, timerModel.stopTimer],
});
