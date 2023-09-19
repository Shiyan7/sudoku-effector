import { Difficulty } from 'sudoku-toolbox/types';

export const EMPTY_CELL = '-';
export const SEGMENT_COLS = 3;
export const TABLE_COLS = SEGMENT_COLS * SEGMENT_COLS;
export const SEGMENT_SIZE = SEGMENT_COLS * TABLE_COLS;
export const TABLE_SIZE = TABLE_COLS * TABLE_COLS;
export const DEFAULT_DIFFICULTY: Difficulty = 'easy';
