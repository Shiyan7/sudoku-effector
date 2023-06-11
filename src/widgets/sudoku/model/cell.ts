import { createStore, createEvent, sample } from 'effector';
import { newGameStarted } from './start';
import { SEGMENT_COLS, SEGMENT_SIZE, TABLE_COLS } from '@/shared/config';

export const $selectedCell = createStore(0);
export const $selectedRow = createStore(0);
export const $selectedColumn = createStore(0);
export const $segment = createStore<number[]>([]);

export const cellSelected = createEvent<{ indexOfCell: number }>();

sample({
  clock: cellSelected,
  fn: ({ indexOfCell }) => indexOfCell,
  target: $selectedCell,
});

sample({
  clock: $selectedCell,
  fn: (indexOfCell) => Math.floor(indexOfCell / TABLE_COLS),
  target: $selectedRow,
});

sample({
  clock: $selectedCell,
  fn: (indexOfCell) => indexOfCell % TABLE_COLS,
  target: $selectedColumn,
});

function findSegmentByIndexOfCell(indexOfCell: number) {
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

sample({
  clock: [newGameStarted, $selectedCell],
  source: $selectedCell,
  fn: findSegmentByIndexOfCell,
  target: $segment,
});
