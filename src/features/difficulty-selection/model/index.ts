import { redirect } from 'atomic-router';
import { createEvent, createStore, sample } from 'effector';
import { createToggler } from '@/shared/lib';
import { routes } from '@/shared/routing';

export const difficultyToggler = createToggler();

export const difficultyChosen = createEvent<{ type: string }>();

export const $difficulty = createStore({ type: '' });

sample({
  source: difficultyChosen,
  target: [$difficulty, difficultyToggler.close],
});

redirect({
  clock: difficultyChosen,
  params: $difficulty,
  route: routes.game,
});
