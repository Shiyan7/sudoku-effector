import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';

export const GameSection = () => {
  const { board, solved } = useUnit({ board: sudokuModel.$board, solved: sudokuModel.$solved });
  const rows = Array.from({ length: 9 }, (_, v) => v);
  const grid = board.split('').map((value) => (value === '.' ? 0 : parseInt(value)));

  console.log({ board, solved });

  return (
    <table className="border-[2px] border-blue-900">
      <tbody>
        {rows.map((row) => (
          <tr className="[&:nth-child(3n)]:border-b-[2px] [&:nth-child(3n)]:border-blue-900" key={row}>
            {rows.map((column) => {
              const indexOfArray = row * 9 + column;
              const value = grid[indexOfArray];

              return (
                <td
                  className="text-3xl text-blue-900 font-light text-center border-[1px] border-blue-200 sm:w-[48px] sm:h-[48px] w-[42px] h-[42px] cursor-pointer [&:nth-child(3n)]:border-r-[2px] [&:nth-child(3n)]:border-r-blue-900 select-none"
                  key={column}>
                  {!!value && value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
