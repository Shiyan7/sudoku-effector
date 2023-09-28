import { createEvent, createStore, sample } from 'effector';
import { $selectedCell } from './cell';
import { TABLE_SIZE } from '@/shared/config';

export const $isNotesEnabled = createStore(false);

export const toggleNotesClicked = createEvent();

$isNotesEnabled.on(toggleNotesClicked, (state) => !state);

export const $arrayOfNotes = createStore<Array<Set<number>>>(Array.from({ length: TABLE_SIZE }, () => new Set()));

export const cellNotesUpdated = createEvent<{ key: string }>();

const $newNote = createStore<number>(0);

$newNote.on(cellNotesUpdated, (_, { key }) => Number(key));

sample({
  clock: cellNotesUpdated,
  source: { indexOfCell: $selectedCell, arrayOfNotes: $arrayOfNotes, newNote: $newNote },
  fn: ({ arrayOfNotes, indexOfCell, newNote }) => {
    const cellNotes = arrayOfNotes[indexOfCell];

    const cellHasNotes = cellNotes.has(newNote);

    if (cellHasNotes) {
      cellNotes.delete(newNote);

      return [...arrayOfNotes];
    } else {
      return arrayOfNotes.map((notes, idx) => {
        const isTargetNote = idx === indexOfCell;
        const newNotes = new Set([...notes, newNote]);

        return isTargetNote ? newNotes : notes;
      });
    }
  },
  target: $arrayOfNotes,
});
