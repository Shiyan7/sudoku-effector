import { lazy } from "react";
import { Route } from "atomic-router-react";
import { routes } from "../shared/lib/atomic-router/routes";
import { tw } from "typewind";

const HomePage = lazy(() =>
  import("./home").then((module) => ({ default: module.HomePage }))
);
const GamePage = lazy(() =>
  import("./game").then((module) => ({ default: module.GamePage }))
);

export const Pages = () => (
  <div className={tw.px_5.h_full.max_w_lg.mx_auto.my_0.sm(tw.max_w_xs.px_0)}>
    <Route route={routes.home} view={HomePage} />
    <Route route={routes.game} view={GamePage} />
  </div>
);

export const routesMap = [
  { path: "/", route: routes.home },
  { path: "/game", route: routes.game },
];
