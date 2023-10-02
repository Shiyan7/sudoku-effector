import { Pages } from '@/pages';
import { router } from '@/shared/routing';
import { RouterProvider } from 'atomic-router-react';
import { ThemeProvider } from 'next-themes';

export const App = () => {
  return (
    <ThemeProvider enableSystem={false}>
      <RouterProvider router={router}>
        <Pages />
      </RouterProvider>
    </ThemeProvider>
  );
};
