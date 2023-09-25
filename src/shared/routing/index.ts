import { createHistoryRouter, createRoute } from 'atomic-router';
import { createBrowserHistory } from 'history';
import { appStarted } from '@/shared/config';
import { Difficulty } from 'sudoku-toolbox/types';
import { sample } from 'effector';

export const routes = {
  home: createRoute(),
  game: createRoute<{ type: Difficulty }>(),
};

export const routesMap = [
  { path: '/', route: routes.home },
  { path: '/game/:type', route: routes.game },
];

export const router = createHistoryRouter({
  routes: routesMap,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
