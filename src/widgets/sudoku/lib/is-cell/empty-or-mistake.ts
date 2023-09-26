import { EMPTY_CELL } from '@/shared/config';
import { isCellHasMistake } from './has-mistake';

interface IsCellEmptyOrMistakeParams {
  board: string;
  indexOfCell: number;
  mistakes: Set<number>;
}

export function isCellEmptyOrMistake({ board, indexOfCell, mistakes }: IsCellEmptyOrMistakeParams): boolean {
  const hasMistake = isCellHasMistake({ mistakes, indexOfCell });

  const cellValue = board[indexOfCell];

  const isEmpty = cellValue === EMPTY_CELL;

  return isEmpty || hasMistake;
}
