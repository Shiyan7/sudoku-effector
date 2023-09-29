import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { Button } from '@/shared/ui';
import { difficultyModel } from '@/features/difficulty-selection';
import { sudokuModel } from '@/widgets/sudoku';
import { useToggler } from '@/shared/lib';
import { Flags } from './flags';
import { Stats } from './stats';

export const Winner = () => {
  const { open } = useToggler(difficultyModel.difficultyToggler);
  const { isWin } = useUnit({ isWin: sudokuModel.$isWin });

  return (
    <div
      className={clsx(
        'absolute overflow-hidden flex flex-col items-center justify-center z-50 top-0 left-0 w-full h-full bg-custom-gradient rounded-xl',
        isWin ? 'opacity-100 visible' : 'opacity-0 invisible'
      )}
    >
      <Flags />
      <h2 className="text-white text-3xl pt-[85px] mb-4 font-semibold">Отлично!</h2>
      <Stats />
      <Button
        onClick={open}
        variant="square"
        className="bg-white text-blue-100 text-base h-[50px] px-12 mt-5 hover:bg-[#f1f1f1]"
      >
        Новая игра
      </Button>
    </div>
  );
};
