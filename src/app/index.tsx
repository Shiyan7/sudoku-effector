import { Pages } from '@/pages';
import { createHistoryRouter } from 'atomic-router';
import { RouterProvider } from 'atomic-router-react';
import { createBrowserHistory } from 'history';
import { routesMap } from '@/pages';
import { BaseLayout } from '@/widgets/layouts';

export const router = createHistoryRouter({
  routes: routesMap,
});

const history = createBrowserHistory();

router.setHistory(history);

export const App = () => {
  return (
    <RouterProvider router={router}>
      <BaseLayout>
        <Pages />
      </BaseLayout>
    </RouterProvider>
  );
};
