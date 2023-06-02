import type { PropsWithChildren } from 'react';
import { DifficultySelection } from '@/features/difficulty-selection';

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <DifficultySelection />
    </>
  );
};
