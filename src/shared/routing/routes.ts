import { createRoute, createRouterControls } from "atomic-router";

export const routes = {
  home: createRoute(),
  game: createRoute(),
};

export const controls = createRouterControls();
