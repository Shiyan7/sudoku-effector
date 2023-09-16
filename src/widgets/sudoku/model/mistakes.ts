import { createEvent, createStore } from 'effector';

interface CellHasMistakeParams {
  mistakes: Set<number>;
  indexOfCell: number;
}

const removeIndexFromSet = (set: Set<number>, index: number) => new Set([...set].filter((i) => i !== index));

const addIndexToSet = (set: Set<number>, index: number) => new Set([...set, index]);

export const cellHasMistake = ({ mistakes, indexOfCell }: CellHasMistakeParams) => mistakes.has(indexOfCell);

export const wrongCellClicked = createEvent<{ indexOfCell: number }>();
export const removeMistake = createEvent<{ indexOfCell: number }>();
export const $mistakes = createStore<Set<number>>(new Set())
  .on(wrongCellClicked, (mistakes, { indexOfCell }) => addIndexToSet(mistakes, indexOfCell))
  .on(removeMistake, (mistakes, { indexOfCell }) => removeIndexFromSet(mistakes, indexOfCell));
