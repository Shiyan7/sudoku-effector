import { lazy } from "react";
import { Route } from "atomic-router-react";
import { routes } from "../shared/lib/atomic-router/routes";

const HomePage = lazy(() =>
  import("./home").then((module) => ({ default: module.HomePage }))
);
const GamePage = lazy(() =>
  import("./game").then((module) => ({ default: module.GamePage }))
);

export const Pages = () => (
  <>
    <Route route={routes.home} view={HomePage} />
    <Route route={routes.game} view={GamePage} />
  </>
);

export const routesMap = [
  { path: "/", route: routes.home },
  { path: "/game", route: routes.game },
];
