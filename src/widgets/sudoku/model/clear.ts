import { createEvent, sample } from 'effector';
import { EMPTY_CELL } from '@/shared/config';
import { $selectedCell } from './cell';
import { $board } from './start';
import { isCellHasMistake, updateBoardWithKey } from '../lib';
import { $arrayOfNotes, cellNotesUpdated } from './notes';
import { historyUpdated } from './history';
import { $mistakes } from './status';

export const clearClicked = createEvent();

sample({
  clock: [clearClicked, cellNotesUpdated],
  filter: isCellHasMistake,
  source: { indexOfCell: $selectedCell, mistakes: $mistakes, board: $board },
  fn: ({ board, indexOfCell }) => updateBoardWithKey({ board, indexOfCell, key: EMPTY_CELL }),
  target: historyUpdated,
});

sample({
  clock: clearClicked,
  source: { indexOfCell: $selectedCell, arrayOfNotes: $arrayOfNotes },
  fn: ({ arrayOfNotes, indexOfCell }) => {
    const cellNotes = arrayOfNotes[indexOfCell];

    cellNotes.clear();

    return [...arrayOfNotes];
  },
  target: $arrayOfNotes,
});
