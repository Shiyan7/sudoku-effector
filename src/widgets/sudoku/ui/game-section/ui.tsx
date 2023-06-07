import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';
import { TABLE_COLS } from '@/shared/config';
import { Cell } from './cell';
import { timerModel } from '@/features/timer';
import { Icon } from '@/shared/ui';

export const GameSection = () => {
  const { board, selectedCellIndex, cellSelected, isRunning, toggleTimer } = useUnit({
    board: sudokuModel.$board,
    selectedCellIndex: sudokuModel.$selectedCellIndex,
    cellSelected: sudokuModel.cellSelected,
    isRunning: timerModel.$isRunning,
    toggleTimer: timerModel.toggleTimer,
  });

  const rows = Array.from({ length: TABLE_COLS }, (_, v) => v);
  const grid = board.split('').map((value) => (value === '.' ? 0 : parseInt(value)));

  return (
    <div className="relative">
      {!isRunning && (
        <button
          onClick={toggleTimer}
          className="absolute z-10 left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 flex items-center justify-center rounded-full bg-blue-100 text-white w-14 h-14">
          <Icon className="fill-white w-[21px] h-[21px]" name="common/play" />
        </button>
      )}
      <table className="border-[2px] border-blue-900">
        <tbody>
          {rows.map((row) => (
            <tr className="[&:nth-child(3n)]:border-b-[2px] [&:nth-child(3n)]:border-blue-900" key={row}>
              {rows.map((column) => {
                const idxOfArray = row * TABLE_COLS + column;
                const value = grid[idxOfArray];

                return (
                  <Cell
                    isHidden={!isRunning}
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
    </div>
  );
};
