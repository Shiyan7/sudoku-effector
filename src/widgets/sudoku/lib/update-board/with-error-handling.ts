import { isCellEmptyOrMistake } from '../is-cell';

interface UpdateBoardWithErrorHandlingParams {
  board: string;
  updatedBoard: string;
  solution: string;
  key: string;
  indexOfCell: number;
  mistakes: Set<number>;
}

export function updateBoardWithErrorHandling({
  board,
  solution,
  indexOfCell,
  key,
  updatedBoard,
  mistakes,
}: UpdateBoardWithErrorHandlingParams): string {
  const solvedValue = solution[indexOfCell];

  const isEmptyOrMistake = isCellEmptyOrMistake({ board, indexOfCell, mistakes });

  if (!isEmptyOrMistake) return board;

  if (solvedValue !== key) throw Error();

  return updatedBoard;
}
