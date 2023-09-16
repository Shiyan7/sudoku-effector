import { SEGMENT_COLS, SEGMENT_SIZE, TABLE_COLS } from '@/shared/config';

export function findSegmentByIndexOfCell(indexOfCell: number) {
  const segment: number[] = [];
  const segmentRow = Math.floor(indexOfCell / SEGMENT_SIZE);
  const segmentCol = Math.floor((indexOfCell % TABLE_COLS) / SEGMENT_COLS);

  for (let dy = 0; dy < SEGMENT_COLS; dy++) {
    for (let dx = 0; dx < SEGMENT_COLS; dx++) {
      const cellIndex = segmentRow * SEGMENT_SIZE + segmentCol * SEGMENT_COLS + dy * TABLE_COLS + dx;

      segment.push(cellIndex);
    }
  }

  return segment;
}
