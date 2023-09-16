interface CellHasMistakeParams {
  mistakes: Set<number>;
  indexOfCell: number;
}

export function cellHasMistake({ mistakes, indexOfCell }: CellHasMistakeParams) {
  return mistakes.has(indexOfCell);
}
