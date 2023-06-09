import { Pages } from '@/pages';
import { router } from '@/shared/routing';
import { RouterProvider } from 'atomic-router-react';

export const App = () => {
  return (
    <RouterProvider router={router}>
      <Pages />
    </RouterProvider>
  );
};
