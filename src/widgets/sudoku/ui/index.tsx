import { Button } from '@/shared/ui/button';
import { Actions } from './actions';
import { GameSection } from './game-section';
import { Navbar } from './navbar';
import { Controls } from './controls';
import { useToggler } from '@/shared/lib';
import { difficultyModel } from '@/features/difficulty-selection';

export const Sudoku = () => {
  const { open } = useToggler(difficultyModel.toggler);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row md:items-end">
        <GameSection />
        <div className="flex px-3 py-12 md:px-0 md:py-0 flex-col justify-evenly sm:ml-5 flex-grow">
          <Actions />
          <Controls />
          <Button onClick={open} className="hidden md:block w-full h-[60px]" variant="square">
            Новая игра
          </Button>
        </div>
      </div>
    </>
  );
};
