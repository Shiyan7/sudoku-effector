import { createEvent, createStore } from 'effector';

type cellHasMistakeParams = {
  mistakes: Set<number>;
  indexOfCell: number;
};

export const $mistakes = createStore<Set<number>>(new Set());
export const wrongCellClicked = createEvent<{ indexOfCell: number }>();
export const removeMistake = createEvent<{ indexOfCell: number }>();

$mistakes.on(wrongCellClicked, (mistakes, { indexOfCell }) => new Set([...mistakes, indexOfCell]));
$mistakes.on(removeMistake, (mistakes, { indexOfCell }) => {
  mistakes.delete(indexOfCell);
});

export const cellHasMistake = ({ mistakes, indexOfCell }: cellHasMistakeParams) => mistakes.has(indexOfCell);
