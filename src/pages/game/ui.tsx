import { Header } from '@/widgets/header';
import { Sudoku } from '@/widgets/sudoku';

export const GamePage = () => {
  return (
    <div className="px-2 pb-0 h-full max-w-[400px] mx-auto my-0 md:max-w-[768px] md:px-4 md:pb-6">
      <Header />
      <Sudoku />
    </div>
  );
};
