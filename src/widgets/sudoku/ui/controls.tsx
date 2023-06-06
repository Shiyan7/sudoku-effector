import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';

export const Controls = () => {
  const { numberPressed } = useUnit({ numberPressed: sudokuModel.numberPressed });
  const numbers = Array.from({ length: 9 }, (_, v) => String(v + 1));

  return (
    <div className="grid gap-2 grid-cols-9 md:grid-cols-3 md:mb-4">
      {numbers.map((key) => (
        <button
          onClick={() => numberPressed({ key })}
          key={key}
          className="rounded md:bg-blue-400 text-blue-100 text-4xl md:font-light md:py-5">
          {key}
        </button>
      ))}
    </div>
  );
};