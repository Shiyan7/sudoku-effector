import { createEffect, createEvent, sample } from 'effector';
import { hotkey } from 'effector-hotkey';
import { $selectedCellIndex } from './cell';
import { $board, $solved } from './start';
import { $isLoss, $mistakes } from './mistakes';
import { not } from 'patronum';

const keys = Array.from({ length: 9 }, (_, v) => v + 1).join('+');

const keyPressed = hotkey({ key: keys });

export const numberPressed = createEvent<{ key: string }>();

interface Params {
  board: string;
  solved: string;
  key: string;
  index: number;
}

const fillCellFx = createEffect<Params, string>(({ board, solved, index, key }) => {
  const charAtIndex = board.charAt(index);
  const solvedValue = solved.charAt(index);
  const updatedBoard = board.substring(0, index) + key + board.substring(index + 1);

  if (charAtIndex !== '.') return board;

  if (solvedValue !== key) throw Error();

  return updatedBoard;
});

sample({
  clock: [keyPressed, numberPressed],
  source: { board: $board, solved: $solved, index: $selectedCellIndex },
  filter: not($isLoss),
  fn: ({ board, solved, index }, { key }) => ({ board, solved, index, key }),
  target: fillCellFx,
});

$board.on(fillCellFx.doneData, (_, payload) => payload);

$mistakes.on(fillCellFx.failData, (state) => state + 1);
