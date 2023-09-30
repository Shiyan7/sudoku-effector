import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';
import clsx from 'clsx';

interface ControlsProps {
  disabled: boolean;
}

export const Controls = ({ disabled }: ControlsProps) => {
  const { numberPressed, isNotesEnabled } = useUnit({
    numberPressed: sudokuModel.numberPressed,
    isNotesEnabled: sudokuModel.$isNotesEnabled,
  });

  const numbers = Array.from({ length: 9 }, (_, index) => String(index + 1));

  return (
    <div className="grid gap-2 grid-cols-9 md:grid-cols-3 md:mb-4">
      {numbers.map((key) => (
        <button
          disabled={disabled}
          onClick={() => numberPressed({ key })}
          key={key}
          className={clsx(
            'rounded md:bg-blue-400 dark:md:bg-dark-100 dark:md:hover:bg-dark-300 text-4xl md:font-light md:py-5 disabled:text-gray-300 disabled:pointer-events-none md:hover:bg-blue-500 transition-colors',
            isNotesEnabled ? 'text-gray-400' : 'text-blue-100 dark:text-blue-100-dark'
          )}
        >
          {key}
        </button>
      ))}
    </div>
  );
};
