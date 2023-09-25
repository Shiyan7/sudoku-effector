import { TABLE_COLS } from '@/shared/config';

interface CalculatePositionParams {
  x: number;
  y: number;
  cellWidth: number;
}

export function calculatePosition({ x, y, cellWidth }: CalculatePositionParams) {
  const cellX = y * cellWidth;
  const cellY = x * cellWidth;
  const absoluteX = (cellX / TABLE_COLS) * TABLE_COLS;
  const absoluteY = (cellY / TABLE_COLS) * TABLE_COLS;

  return { left: absoluteX, top: absoluteY };
}
