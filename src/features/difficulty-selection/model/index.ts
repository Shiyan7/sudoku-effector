import { redirect } from 'atomic-router';
import { createEvent, createStore, sample } from 'effector';
import { createToggler } from '@/shared/lib';
import { routes } from '@/shared/routing';
import { Difficulty } from '@/shared/config';

export const difficultyToggler = createToggler();

export const difficultyChosen = createEvent<{ type: Difficulty }>();

export const $difficulty = createStore<{ type: Difficulty }>({ type: 'easy' });

sample({
  source: difficultyChosen,
  target: [$difficulty, difficultyToggler.close],
});

redirect({
  clock: difficultyChosen,
  params: $difficulty,
  route: routes.game,
});
