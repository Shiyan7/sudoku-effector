import { EMPTY_CELL } from '@/shared/config';

interface IsCellEmptyOrMistakeParams {
  board: string;
  indexOfCell: number;
  mistakes: Set<number>;
}

export function isCellEmptyOrMistake({ board, indexOfCell, mistakes }: IsCellEmptyOrMistakeParams) {
  const charAtIndex = board.charAt(indexOfCell);
  return charAtIndex === EMPTY_CELL || mistakes.has(indexOfCell);
}
