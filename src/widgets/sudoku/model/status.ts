import { reset } from 'patronum';
import { createEvent, createStore, forward, sample } from 'effector';
import { difficultyModel } from '@/features/difficulty-selection';
import { createToggler } from '@/shared/lib';
import { $board, $initBoard, $solved, newGameStarted } from './start';
import { $mistakes } from './mistakes';
import { timerModel } from '@/features/timer';

export const gameOverToggler = createToggler();
export const $countMistakes = createStore(0);

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

forward({
  from: secondChanceClicked,
  to: gameOverToggler.close,
});

forward({
  from: newGameClicked,
  to: [gameOverToggler.close, difficultyModel.difficultyToggler.open],
});

reset({
  clock: [secondChanceClicked, startAgainClicked, newGameStarted],
  target: [$isLoss, $isWin],
});

reset({
  clock: [startAgainClicked, newGameStarted],
  target: [$countMistakes, $mistakes],
});

sample({
  clock: $board,
  source: $solved,
  filter: (solved, board) => board === solved,
  fn: () => true,
  target: [$isWin, timerModel.stopTimer],
});
