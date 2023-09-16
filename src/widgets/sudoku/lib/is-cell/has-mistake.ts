interface IsCellHasMistakeParams {
  mistakes: Set<number>;
  indexOfCell: number;
}

export function isCellHasMistake({ mistakes, indexOfCell }: IsCellHasMistakeParams): boolean {
  return mistakes.has(indexOfCell);
}
