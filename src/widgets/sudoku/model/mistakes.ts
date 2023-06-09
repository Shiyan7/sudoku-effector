import { difficultyModel } from '@/features/difficulty-selection';
import { createToggler } from '@/shared/lib';
import { createEvent, createStore, sample } from 'effector';
import { $board, $initBoard } from './start';
import { reset } from 'patronum';

export const gameOverToggler = createToggler();

export const $mistakes = createStore(0);
export const $isLoss = createStore(false);

export const newGameClicked = createEvent();
export const secondChanceClicked = createEvent();
export const cancelClicked = createEvent();
export const startAgainClicked = createEvent();
export const difficultySelected = createEvent();
export const difficultyLinkClicked = createEvent();

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
  clock: $mistakes,
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
  source: $mistakes,
  fn: (mistakes) => mistakes - 1,
  target: [gameOverToggler.close, $mistakes],
});

reset({
  clock: [secondChanceClicked, startAgainClicked, difficultySelected],
  target: $isLoss,
});

reset({
  clock: [startAgainClicked, difficultySelected, difficultyLinkClicked],
  target: $mistakes,
});
