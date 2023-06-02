import { Header } from '@/widgets/header';
import { Sudoku } from '@/widgets/sudoku';

export const GamePage = () => {
  return (
    <div className="px-2 py-4 h-full max-w-lg mx-auto my-0 sm:max-w-[768px] sm:px-4 sm:py-6">
      <Header />
      <Sudoku />
    </div>
  );
};
