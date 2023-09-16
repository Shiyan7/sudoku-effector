import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';
import { TABLE_COLS } from '@/shared/config';

function calculatePosition(x: number, y: number) {
  const cellSize = 48;
  const cellX = x * cellSize;
  const cellY = y * cellSize;
  const absoluteX = (cellX / TABLE_COLS) * TABLE_COLS;
  const absoluteY = (cellY / TABLE_COLS) * TABLE_COLS;

  return { left: absoluteX, top: absoluteY };
}

export const Areas = () => {
  const { areas } = useUnit({ areas: sudokuModel.$areas });

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
                    <span className="absolute bg-white top-[-3px] left-[-3px] p-[1px] text-[9px] leading-[9px] text-blue-900">
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
