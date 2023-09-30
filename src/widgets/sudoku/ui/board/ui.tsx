import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';
import { timerModel } from '@/features/timer';
import { Icon } from '@/shared/ui/icon';
import { TABLE_COLS } from '@/shared/config';
import { Cell } from './cell';
import { Winner } from '../winner';
import { Areas } from './areas';
import { useEffect, useRef, useState } from 'react';

export const Board = () => {
  const {
    initBoard,
    arrayOfNotes,
    grid,
    selectedCell,
    selectedValue,
    segment,
    cellSelected,
    selectedRow,
    selectedColumn,
    mistakes,
    isRunning,
    startTimer,
    isWin,
  } = useUnit({
    initBoard: sudokuModel.$initBoard,
    arrayOfNotes: sudokuModel.$arrayOfNotes,
    grid: sudokuModel.$grid,
    selectedCell: sudokuModel.$selectedCell,
    selectedValue: sudokuModel.$selectedValue,
    segment: sudokuModel.$segment,
    cellSelected: sudokuModel.cellSelected,
    selectedRow: sudokuModel.$selectedRow,
    selectedColumn: sudokuModel.$selectedColumn,
    mistakes: sudokuModel.$mistakes,
    isRunning: timerModel.isRunning,
    startTimer: timerModel.startTimer,
    isWin: sudokuModel.$isWin,
  });

  const rows = Array.from({ length: TABLE_COLS }, (_, idx) => idx);

  const [cellWidth, setCellWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    const containerSize = containerRef.current?.offsetWidth;
    const cellWidth = (Number(containerSize) - 2) / 9;
    setCellWidth(cellWidth);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative md:pb-0 pb-[100%]">
      {!isRunning && (
        <button
          onClick={startTimer}
          className="absolute z-10 left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 flex items-center justify-center rounded-full bg-blue-100 hover:bg-[#0065c8] text-white w-14 h-14"
        >
          <Icon className="fill-white w-[21px] h-[21px]" name="common/play" />
        </button>
      )}
      <Winner />
      {isRunning && <Areas cellWidth={cellWidth} />}
      <table
        className={clsx(
          'md:static absolute top-0 dark:bg-dark-100 left-0 w-full h-full border-sudoku-border border-blue-900 dark:border-black',
          isWin && 'opacity-0'
        )}
      >
        <tbody>
          {rows.map((row) => (
            <tr
              key={row}
              className="[&:nth-child(3n)]:border-b-sudoku-border [&:nth-child(3n)]:border-blue-900 dark:[&:nth-child(3n)]:border-black"
            >
              {rows.map((column) => {
                const indexOfCell = row * TABLE_COLS + column;
                const value = grid[indexOfCell];
                const isCellSelected = selectedCell === indexOfCell;
                const isRowSelected = selectedRow === row;
                const isColumnSelected = selectedColumn === column;
                const isError = [...mistakes].includes(indexOfCell);
                const isInSegment = segment.includes(indexOfCell);
                const isSimilar = !!value && value === selectedValue;
                const isNewValue = initBoard[indexOfCell] !== String(value);
                const notesOfCell = arrayOfNotes[indexOfCell];

                return (
                  <Cell
                    notesOfCell={notesOfCell}
                    isSimilar={isSimilar}
                    isError={isError}
                    isHidden={!isRunning}
                    isNewValue={isNewValue}
                    isCellSelected={isCellSelected}
                    isNeighbourOfSelected={isRowSelected || isColumnSelected || isInSegment}
                    onSelect={() => cellSelected({ indexOfCell })}
                    key={indexOfCell}
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
