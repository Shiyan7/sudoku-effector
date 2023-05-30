import { Header } from '@/widgets/headers';
import { Sudoku } from '@/widgets/sudoku';

export const GamePage = () => {
  return (
    <div className="px-6 py-4 h-full max-w-lg mx-auto my-0 sm:max-w-screen-md sm:px-0 sm:py-6">
      <Header />
      <Sudoku />
    </div>
  );
};
