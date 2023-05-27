import { Link } from 'atomic-router-react';
import { routes } from '@/shared/routing';

export const GamePage = () => {
  return <Link to={routes.home}>to home page</Link>;
};
