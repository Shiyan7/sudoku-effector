import { createEffect, createEvent, createStore, sample } from 'effector';
import { hotkey } from 'effector-hotkey';
import { $selectedCellIndex } from './cell';
import { $board, $solved } from './start';

const keys = Array.from({ length: 9 }, (_, v) => v + 1).join('+');

const keyPressed = hotkey({ key: keys });

export const numberPressed = createEvent<{ key: string }>();

interface Params {
  board: string;
  solved: string;
  cell: number;
  key: string;
}

const replaceCharacterAtIndex = createEffect((params: Params) => {
  const { board, solved, cell, key } = params;

  const charAtIndex = board.charAt(cell);
  const solvedValue = solved.charAt(cell);

  if (charAtIndex !== '.' || Number(solvedValue) !== Number(key)) {
    throw new Error('Значение на заданном индексе не соответствует ожидаемому значению из решенной строки.');
  }

  const newStr = board.substring(0, cell) + Number(key) + board.substring(cell + 1);

  return newStr;
});

sample({
  clock: [keyPressed, numberPressed],
  source: { board: $board, solved: $solved, cell: $selectedCellIndex },
  fn: ({ board, solved, cell }, { key }) => ({ board, solved, cell, key }),
  target: replaceCharacterAtIndex,
});

sample({
  clock: replaceCharacterAtIndex.doneData,
  target: $board,
});
