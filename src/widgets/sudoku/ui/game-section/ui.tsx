import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';
import { Cell } from './cell';

export const GameSection = () => {
  const { board, selectedCellIndex, cellSelected } = useUnit({
    board: sudokuModel.$board,
    selectedCellIndex: sudokuModel.$selectedCellIndex,
    cellSelected: sudokuModel.cellSelected,
  });

  const rows = Array.from({ length: 9 }, (_, v) => v);
  const grid = board.split('').map((value) => (value === '.' ? 0 : parseInt(value)));

  return (
    <table className="border-[2px] border-blue-900">
      <tbody>
        {rows.map((row) => (
          <tr className="[&:nth-child(3n)]:border-b-[2px] [&:nth-child(3n)]:border-blue-900" key={row}>
            {rows.map((column) => {
              const idxOfArray = row * 9 + column;
              const value = grid[idxOfArray];

              return (
                <Cell
                  isSelected={selectedCellIndex === idxOfArray}
                  onSelect={() => cellSelected({ index: idxOfArray })}
                  key={idxOfArray}
                  value={value}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
