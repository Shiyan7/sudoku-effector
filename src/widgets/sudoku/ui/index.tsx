import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';
import { DifficultySelection, difficultyModel } from '@/features/difficulty-selection';
import { Button } from '@/shared/ui/button';
import { useToggler } from '@/shared/lib';
import { Actions } from './actions';
import { Board } from './board';
import { Navbar } from './navbar';
import { Controls } from './controls';
import { GameOver } from './game-over';
import { timerModel } from '@/features/timer';

export const Sudoku = () => {
  const { open } = useToggler(difficultyModel.difficultyToggler);

  const { isRunning, cancelClicked, startAgainClicked, isLoss, isWin } = useUnit({
    isRunning: timerModel.isRunning,
    cancelClicked: sudokuModel.cancelClicked,
    startAgainClicked: sudokuModel.startAgainClicked,
    isLoss: sudokuModel.$isLoss,
    isWin: sudokuModel.$isWin,
  });

  const isDisabled = isWin || !isRunning;

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row md:items-end">
        <Board />
        <div className="flex px-3 py-12 md:px-0 md:py-0 flex-col justify-evenly sm:ml-5 flex-grow">
          <Actions disabled={isDisabled} />
          <Controls disabled={isDisabled} />
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
