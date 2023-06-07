import { createEffect, createEvent, createStore, sample } from 'effector';
import { hotkey } from 'effector-hotkey';
import { $selectedCellIndex } from './cell';
import { $board, $solved } from './start';
import { $mistakes } from './mistakes';

interface Params {
  board: string;
  solved: string;
  key: string;
  cell: number;
}

const keys = Array.from({ length: 9 }, (_, v) => v + 1).join('+');

const keyPressed = hotkey({ key: keys });

export const numberPressed = createEvent<{ key: string }>();

const replaceCharacterAtIndexFx = createEffect(({ board, solved, cell, key }: Params) => {
  const charAtIndex = board.charAt(cell);
  const solvedValue = solved.charAt(cell);
  const updatedBoard = board.substring(0, cell) + Number(key) + board.substring(cell + 1);

  if (charAtIndex !== '.') return board;

  if (solvedValue !== key) throw new Error();

  return updatedBoard;
});

sample({
  clock: [keyPressed, numberPressed],
  source: { board: $board, solved: $solved, cell: $selectedCellIndex },
  fn: ({ board, solved, cell }, { key }) => ({ board, solved, cell, key }),
  target: replaceCharacterAtIndexFx,
});

$board.on(replaceCharacterAtIndexFx.doneData, (_, payload) => payload);

$mistakes.on(replaceCharacterAtIndexFx.failData, (state) => state + 1);
