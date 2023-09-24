import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';
import { TABLE_COLS } from '@/shared/config';

function calculatePosition(x: number, y: number, cellWidth: number) {
  const cellX = x * cellWidth;
  const cellY = y * cellWidth;
  const absoluteX = (cellX / TABLE_COLS) * TABLE_COLS;
  const absoluteY = (cellY / TABLE_COLS) * TABLE_COLS;

  return { left: absoluteX, top: absoluteY };
}

function calculatePseudoElementStyle(
  hasBorderTop: boolean,
  hasBorderRight: boolean,
  hasBorderBottom: boolean,
  hasBorderLeft: boolean,
  cellWidth: number
) {
  const cellSize = cellWidth - 3 * 2;
  const offset = 7;

  const pseudoElementStyle = {
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    width: `${cellSize}px`,
    height: `${cellSize}px`,
  };

  if (hasBorderTop) {
    pseudoElementStyle.top = `-${offset}px`;
    pseudoElementStyle.height = `${cellSize + offset}px`;
  }

  if (hasBorderRight) {
    pseudoElementStyle.right = `-${offset}px`;
    pseudoElementStyle.width = `${cellSize + offset}px`;
  }

  if (hasBorderBottom) {
    pseudoElementStyle.bottom = `-${offset}px`;
    pseudoElementStyle.height = `${cellSize + offset}px`;
  }

  if (hasBorderLeft) {
    pseudoElementStyle.left = `-${offset}px`;
    pseudoElementStyle.width = `${cellSize + offset}px`;
  }

  if (hasBorderTop && hasBorderBottom) {
    pseudoElementStyle.top = `-${offset}px`;
    pseudoElementStyle.height = `${cellSize + offset + offset}px`;
  }

  if (hasBorderLeft && hasBorderRight) {
    pseudoElementStyle.left = `-${offset}px`;
    pseudoElementStyle.width = `${cellSize + offset + offset}px`;
  }

  return pseudoElementStyle;
}

interface AreasProps {
  cellWidth: number;
}

export const Areas = ({ cellWidth }: AreasProps) => {
  const { areas } = useUnit({ areas: sudokuModel.$areas });

  return (
    <div className="absolute z-10 top-[4px] left-[4px] w-full h-full pointer-events-none">
      {areas.map(({ cells, sum }, idx) => {
        return (
          <div key={idx}>
            {cells.map(([x, y], idx) => {
              const isFirstElement = idx === 0;

              const { left, top } = calculatePosition(y, x, cellWidth);

              const hasCellAbove = cells.some(([nextX, nextY]) => nextX === x - 1 && nextY === y);
              const hasCellBelow = cells.some(([nextX, nextY]) => nextX === x + 1 && nextY === y);
              const hasCellLeft = cells.some(([nextX, nextY]) => nextX === x && nextY === y - 1);
              const hasCellRight = cells.some(([nextX, nextY]) => nextX === x && nextY === y + 1);

              const pseudoElementStyle = calculatePseudoElementStyle(
                hasCellAbove,
                hasCellRight,
                hasCellBelow,
                hasCellLeft,
                cellWidth
              );

              return (
                <div
                  key={idx}
                  className="absolute w-[42px] h-[42px]"
                  style={{
                    top,
                    left,
                  }}>
                  <div
                    className="absolute top-[0px] left-[0px]"
                    style={{
                      ...pseudoElementStyle,
                      borderBottom: hasCellBelow ? 'none' : '1.5px dashed #314b62',
                      borderRight: hasCellRight ? 'none' : '1.5px dashed #314b62',
                      borderTop: hasCellAbove ? 'none' : '1.5px dashed #314b62',
                      borderLeft: hasCellLeft ? 'none' : '1.5px dashed #314b62',
                    }}
                  />
                  {isFirstElement && (
                    <span className="absolute z-10 bg-white top-[-2px] left-[-2px] p-[1px] text-[9px] leading-[9px] text-blue-900">
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
