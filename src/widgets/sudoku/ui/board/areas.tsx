import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';
import { calculateAreaStyles, calculateNeighbours, calculatePosition } from './lib';

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

              const { left, top } = calculatePosition({ x, y, cellWidth });

              const cellState = calculateNeighbours({ x, y, cells });

              const areaStyle = calculateAreaStyles({ cellState, cellWidth });

              return (
                <div
                  key={idx}
                  className="absolute"
                  style={{
                    top,
                    left,
                  }}
                >
                  <div className="absolute top-[0px] left-[0px]" style={areaStyle} />
                  {isFirstElement && (
                    <span className="absolute z-10 bg-white top-[-2px] left-[-2px] p-[1px] text-[9px] leading-[9px] text-blue-900 select-none">
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
