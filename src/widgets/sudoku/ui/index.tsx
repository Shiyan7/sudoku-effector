import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';
import { DifficultySelection, difficultyModel } from '@/features/difficulty-selection';
import { Button } from '@/shared/ui/button';
import { useToggler } from '@/shared/lib';
import { Actions } from './actions';
import { GameSection } from './game-section';
import { Navbar } from './navbar';
import { Controls } from './controls';
import { GameOver } from './game-over';

export const Sudoku = () => {
  const { open } = useToggler(difficultyModel.difficultyToggler);
  const { cancelClicked, startAgainClicked, isLoss } = useUnit({
    cancelClicked: sudokuModel.cancelClicked,
    startAgainClicked: sudokuModel.startAgainClicked,
    isLoss: sudokuModel.$isLoss,
  });

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
      <GameOver />
      {isLoss ? (
        <DifficultySelection
          onCancel={cancelClicked}
          onStartAgain={startAgainClicked}
          description="Прогресс текущей игры будет потерян"
          isClosable={false}
        />
      ) : (
        <DifficultySelection description="Пазлы для всех уровней мастерства" />
      )}
    </>
  );
};
