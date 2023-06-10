import { reset } from 'patronum';
import { createEvent, createStore, sample } from 'effector';
import { difficultyModel } from '@/features/difficulty-selection';
import { createToggler } from '@/shared/lib';
import { $board, $initBoard, newGameStarted } from './start';

export const gameOverToggler = createToggler();

export const $countMistakes = createStore(0);
export const $mistakes = createStore<number[]>([]);

export const $isLoss = createStore(false);
export const $isWin = createStore(false);

export const newGameClicked = createEvent();
export const secondChanceClicked = createEvent();
export const cancelClicked = createEvent();
export const startAgainClicked = createEvent();

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
  clock: newGameClicked,
  target: [gameOverToggler.close, difficultyModel.difficultyToggler.open],
});

sample({
  clock: secondChanceClicked,
  source: $countMistakes,
  fn: (mistakes) => mistakes - 1,
  target: [gameOverToggler.close, $countMistakes],
});

reset({
  clock: [secondChanceClicked, startAgainClicked, newGameStarted],
  target: $isLoss,
});

reset({
  clock: [startAgainClicked, newGameStarted],
  target: $countMistakes,
});
