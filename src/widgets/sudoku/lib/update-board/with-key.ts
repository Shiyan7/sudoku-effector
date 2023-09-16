interface UpdateBoardWithKeyParams {
  board: string;
  indexOfCell: number;
  key: string;
}

export function updateBoardWithKey({ board, indexOfCell, key }: UpdateBoardWithKeyParams) {
  return board.substring(0, indexOfCell) + key + board.substring(indexOfCell + 1);
}
