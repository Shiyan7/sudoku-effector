import { Pages } from '@/pages';
import { createHistoryRouter } from 'atomic-router';
import { RouterProvider } from 'atomic-router-react';
import { createBrowserHistory } from 'history';
import { routesMap } from '@/pages';

export const router = createHistoryRouter({
  routes: routesMap,
});

const history = createBrowserHistory();

router.setHistory(history);

export const App = () => {
  return (
    <RouterProvider router={router}>
      <Pages />
    </RouterProvider>
  );
};
