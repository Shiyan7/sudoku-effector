import { isCellEmptyOrMistake } from '../is-cell-empty-or-mistake';

interface UpdateBoardParams {
  board: string;
  updatedBoard: string;
  solved: string;
  key: string;
  indexOfCell: number;
  mistakes: Set<number>;
}

export function updateBoard({ board, solved, indexOfCell, key, updatedBoard, mistakes }: UpdateBoardParams) {
  const solvedValue = solved.charAt(indexOfCell);
  const isEmptyOrMistake = isCellEmptyOrMistake({ board, indexOfCell, mistakes });

  if (!isEmptyOrMistake) return board;

  if (solvedValue !== key) throw Error();

  return updatedBoard;
}
