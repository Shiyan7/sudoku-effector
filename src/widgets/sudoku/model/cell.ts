import { createStore, createEvent, sample } from 'effector';
import { $board, $grid, newGameStarted } from './start';
import { TABLE_COLS } from '@/shared/config';
import { findSegmentByIndexOfCell } from '../lib';
import { timerModel } from '@/features/timer';

export const $selectedCell = createStore(0);
export const $selectedRow = createStore(0);
export const $selectedColumn = createStore(0);
export const $selectedValue = createStore(0);
export const $segment = createStore<number[]>([]);

export const cellSelected = createEvent<{ indexOfCell: number }>();

sample({
  clock: cellSelected,
  filter: timerModel.isRunning,
  fn: ({ indexOfCell }) => indexOfCell,
  target: $selectedCell,
});

sample({
  clock: [cellSelected, $selectedCell, $board],
  source: { grid: $grid, indexOfCell: $selectedCell },
  fn: ({ grid, indexOfCell }) => grid[indexOfCell],
  target: $selectedValue,
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

sample({
  clock: [newGameStarted, $selectedCell],
  source: $selectedCell,
  fn: findSegmentByIndexOfCell,
  target: $segment,
});
