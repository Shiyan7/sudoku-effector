import { updateBoardWithKey } from './with-key';

interface UpdateBoardWithSolutionParams {
  board: string;
  indexOfCell: number;
  solution: string;
}

export function updateBoardWithSolution({ board, indexOfCell, solution }: UpdateBoardWithSolutionParams): string {
  const solvedValue = solution[indexOfCell];

  return updateBoardWithKey({ board, indexOfCell, key: solvedValue });
}
