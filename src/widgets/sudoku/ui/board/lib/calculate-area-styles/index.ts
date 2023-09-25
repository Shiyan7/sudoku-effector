import { CSSProperties } from 'react';

type CellState = {
  hasCellAbove: boolean;
  hasCellRight: boolean;
  hasCellBelow: boolean;
  hasCellLeft: boolean;
};

interface CalculateAreaStylesParams {
  cellState: CellState;
  cellWidth: number;
}

const CELL_OFFSET = 1;
const BORDER_WIDTH = 1.6;
const OFFSET = 5;

function getBorderStyle(hasNeighbour: boolean) {
  return hasNeighbour ? 'none' : `${BORDER_WIDTH}px dashed #314b62`;
}

export function calculateAreaStyles({ cellState, cellWidth }: CalculateAreaStylesParams) {
  const { hasCellAbove, hasCellRight, hasCellBelow, hasCellLeft } = cellState;

  const CELL_SIZE = cellWidth - BORDER_WIDTH * 2 * (CELL_OFFSET * 2);

  const areaStyle: CSSProperties = {
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    width: `${CELL_SIZE}px`,
    height: `${CELL_SIZE}px`,
    borderBottom: getBorderStyle(hasCellBelow),
    borderRight: getBorderStyle(hasCellRight),
    borderTop: getBorderStyle(hasCellAbove),
    borderLeft: getBorderStyle(hasCellLeft),
  };

  if (hasCellAbove) {
    areaStyle.top = `-${OFFSET}px`;
    areaStyle.height = `${CELL_SIZE + OFFSET}px`;
  }

  if (hasCellRight) {
    areaStyle.right = `-${OFFSET}px`;
    areaStyle.width = `${CELL_SIZE + OFFSET}px`;
  }

  if (hasCellBelow) {
    areaStyle.bottom = `-${OFFSET}px`;
    areaStyle.height = `${CELL_SIZE + OFFSET}px`;
  }

  if (hasCellLeft) {
    areaStyle.left = `-${OFFSET}px`;
    areaStyle.width = `${CELL_SIZE + OFFSET}px`;
  }

  if (hasCellAbove && hasCellBelow) {
    areaStyle.top = `-${OFFSET}px`;
    areaStyle.height = `${CELL_SIZE + OFFSET * 2}px`;
  }

  if (hasCellLeft && hasCellRight) {
    areaStyle.left = `-${OFFSET}px`;
    areaStyle.width = `${CELL_SIZE + OFFSET * 2}px`;
  }

  return areaStyle;
}
