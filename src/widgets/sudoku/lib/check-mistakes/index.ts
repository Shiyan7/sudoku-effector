interface CheckMistakesParams {
  initBoard: string;
  board: string;
  solution: string;
}

export function checkMistakes({ initBoard, board, solution }: CheckMistakesParams): Set<number> {
  const mistakes = new Set<number>();

  for (let i = 0; i < board.length; i++) {
    const initDigit = parseInt(initBoard[i], 10);
    const boardDigit = parseInt(board[i], 10);
    const solutionDigit = parseInt(solution[i], 10);

    if (initDigit !== boardDigit && boardDigit !== solutionDigit) {
      mistakes.add(i);
    }
  }

  return mistakes;
}
