import { GameSection } from './game-section';
import { Navbar } from './navbar';

export const Sudoku = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <Navbar />
        <div className="text-blue-300 text-xs font-medium">Ошибки 0/3</div>
      </div>
      <GameSection />
    </>
  );
};
