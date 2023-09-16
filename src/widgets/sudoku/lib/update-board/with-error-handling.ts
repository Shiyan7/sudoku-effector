import { isCellEmptyOrMistake } from '../is-cell';

interface UpdateBoardWithErrorHandlingParams {
  board: string;
  updatedBoard: string;
  solved: string;
  key: string;
  indexOfCell: number;
  mistakes: Set<number>;
}

export function updateBoardWithErrorHandling({
  board,
  solved,
  indexOfCell,
  key,
  updatedBoard,
  mistakes,
}: UpdateBoardWithErrorHandlingParams) {
  const solvedValue = solved.charAt(indexOfCell);

  const isEmptyOrMistake = isCellEmptyOrMistake({ board, indexOfCell, mistakes });

  if (!isEmptyOrMistake) return board;

  if (solvedValue !== key) throw Error();

  return updatedBoard;
}
