export function updateBoardWithKey(board: Board, index: number, key: string) {
  return board.substring(0, index) + key + board.substring(index + 1);
}
