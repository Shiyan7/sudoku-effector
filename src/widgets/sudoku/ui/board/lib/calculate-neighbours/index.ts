import { Coord } from 'sudoku-toolbox/types';

interface CalculateNeighboursParams {
  x: number;
  y: number;
  cells: Coord[];
}

export function calculateNeighbours({ x, y, cells }: CalculateNeighboursParams) {
  const hasCellAbove = cells.some(([nextX, nextY]) => nextX === x - 1 && nextY === y);
  const hasCellBelow = cells.some(([nextX, nextY]) => nextX === x + 1 && nextY === y);
  const hasCellLeft = cells.some(([nextX, nextY]) => nextX === x && nextY === y - 1);
  const hasCellRight = cells.some(([nextX, nextY]) => nextX === x && nextY === y + 1);

  return {
    hasCellAbove,
    hasCellBelow,
    hasCellLeft,
    hasCellRight,
  };
}
