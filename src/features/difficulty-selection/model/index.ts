import { createToggler } from '@/shared/lib';
import { routes } from '@/shared/routing';
import { redirect } from 'atomic-router';
import { createEvent, createStore, sample } from 'effector';

export const toggler = createToggler();

export const difficultyChosen = createEvent<{ type: string }>();

export const $difficulty = createStore({ type: '' });

sample({
  source: difficultyChosen,
  target: [$difficulty, toggler.close],
});

redirect({
  clock: difficultyChosen,
  query: $difficulty,
  route: routes.game,
});
