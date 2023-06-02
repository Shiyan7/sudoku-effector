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
      <div className="flex items-end">
        <GameSection />
        <div className="flex flex-col justify-evenly ml-5 flex-grow">
          <Actions />
          <Controls />
          <Button onClick={open} className="w-full h-[60px]" variant="square">
            Новая игра
          </Button>
        </div>
      </div>
    </>
  );
};
