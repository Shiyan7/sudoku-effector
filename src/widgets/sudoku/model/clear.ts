import { createEvent, sample } from 'effector';
import { EMPTY_CELL } from '@/shared/config';
import { $selectedCell } from './cell';
import { $board } from './start';
import { isCellHasMistake, updateBoardWithKey } from '../lib';
import { $mistakes } from './mistakes';
import { hotkey } from 'effector-hotkey';
import { timerModel } from '@/features/timer';
import { $notes, updateNoteCell } from './notes';

export const clearClicked = createEvent();

hotkey({ key: 'Ctrl+x', target: clearClicked, filter: timerModel.isRunning });

sample({
  clock: [clearClicked, updateNoteCell],
  filter: isCellHasMistake,
  source: { indexOfCell: $selectedCell, mistakes: $mistakes, board: $board },
  fn: ({ board, indexOfCell }) => updateBoardWithKey({ board, indexOfCell, key: EMPTY_CELL }),
  target: $board,
});

sample({
  clock: clearClicked,
  source: { indexOfCell: $selectedCell, notes: $notes },
  fn: ({ notes, indexOfCell }) => {
    const cellNotes = notes[indexOfCell];

    cellNotes.clear();

    return [...notes];
  },
  target: $notes,
});
