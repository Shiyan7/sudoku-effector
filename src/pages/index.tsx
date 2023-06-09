import { Route } from 'atomic-router-react';
import { routes } from '@/shared/routing';
import { HomePage } from './home';
import { GamePage } from './game';

export const Pages = () => (
  <>
    <Route route={routes.home} view={HomePage} />
    <Route route={routes.game} view={GamePage} />
  </>
);
