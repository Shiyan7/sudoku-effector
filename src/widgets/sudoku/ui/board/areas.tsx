import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';
import { TABLE_COLS } from '@/shared/config';
import clsx from 'clsx';

function calculatePosition(x: number, y: number) {
  const cellSize = 48;
  const cellX = x * cellSize;
  const cellY = y * cellSize;
  const absoluteX = (cellX / TABLE_COLS) * TABLE_COLS;
  const absoluteY = (cellY / TABLE_COLS) * TABLE_COLS;

  return { left: absoluteX, top: absoluteY };
}

function determineCell(
  x: number,
  y: number,
  selectedCell: number,
  segment: number[],
  selectedRow: number,
  selectedColumn: number
) {
  const row = Math.floor(x / 9) * 9;
  const column = Math.floor(y / 9);
  const cellInsideBlock = (x % 9) * 9 + (y % 9);
  const indexOfCell = row * 9 + column * 9 + cellInsideBlock;

  const isRowSelected = selectedRow === x;
  const isColumnSelected = selectedColumn === y;
  const isCellSelected = selectedCell === indexOfCell;
  const isInSegment = segment.includes(indexOfCell);
  const isNeighbourOfSelected = isRowSelected || isColumnSelected || isInSegment;

  return {
    isCellSelected,
    isNeighbourOfSelected,
  };
}

export const Areas = () => {
  const { areas, selectedCell, segment, selectedRow, selectedColumn } = useUnit({
    areas: sudokuModel.$areas,
    selectedCell: sudokuModel.$selectedCell,
    segment: sudokuModel.$segment,
    selectedRow: sudokuModel.$selectedRow,
    selectedColumn: sudokuModel.$selectedColumn,
  });

  return (
    <div className="absolute top-[4px] left-[4px] w-full h-full pointer-events-none">
      {areas.map(({ cells, sum }, idx) => {
        return (
          <div key={idx}>
            {cells.map(([x, y], idx) => {
              const { left, top } = calculatePosition(y, x);

              const hasCellBelow = cells.some(([nextX, nextY]) => nextX === x + 1 && nextY === y);
              const hasCellRight = cells.some(([nextX, nextY]) => nextX === x && nextY === y + 1);
              const hasCellAbove = cells.some(([nextX, nextY]) => nextX === x - 1 && nextY === y);
              const hasCellLeft = cells.some(([nextX, nextY]) => nextX === x && nextY === y - 1);

              const { isCellSelected, isNeighbourOfSelected } = determineCell(
                x,
                y,
                selectedCell,
                segment,
                selectedRow,
                selectedColumn
              );

              return (
                <div
                  key={idx}
                  className="absolute w-[42px] h-[42px]"
                  style={{
                    top,
                    left,
                    borderBottom: hasCellBelow ? 'none' : '1.9px dashed #314b62',
                    borderRight: hasCellRight ? 'none' : '1.9px dashed #314b62',
                    borderTop: hasCellAbove ? 'none' : '1.9px dashed #314b62',
                    borderLeft: hasCellLeft ? 'none' : '1.9px dashed #314b62',
                  }}>
                  {idx === 0 && (
                    <span
                      className={clsx(
                        'absolute top-[-3px] left-[-3px] p-[1px] text-[9px] leading-[9px] text-blue-900',
                        !isNeighbourOfSelected && !isCellSelected && 'bg-white',
                        isNeighbourOfSelected && 'bg-[#e2ebf3]',
                        isCellSelected && '!bg-[#bbdefb]'
                      )}>
                      {sum}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
