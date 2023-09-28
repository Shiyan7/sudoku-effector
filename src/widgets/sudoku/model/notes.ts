import { createEvent, createStore, sample } from 'effector';
import { $selectedCell } from './cell';

export const $isNotesEnabled = createStore(false);

export const toggleNotesClicked = createEvent();

$isNotesEnabled.on(toggleNotesClicked, (state) => !state);

export const $notes = createStore<Set<number>[]>(Array.from({ length: 81 }, () => new Set()));

export const updateNoteCell = createEvent<{ key: string }>();

const $newNote = createStore<number>(0);

$newNote.on(updateNoteCell, (_, { key }) => Number(key));

sample({
  clock: updateNoteCell,
  source: { indexOfCell: $selectedCell, notes: $notes, newNote: $newNote },
  fn: ({ notes, indexOfCell, newNote }) => {
    const cellNotes = notes[indexOfCell];

    const cellHasNotes = cellNotes.has(newNote);

    if (cellHasNotes) {
      cellNotes.delete(newNote);

      return [...notes];
    } else {
      return notes.map((note, idx) => {
        const isTargetNote = idx === indexOfCell;
        const newNotes = new Set([...note, newNote]);

        return isTargetNote ? newNotes : note;
      });
    }
  },
  target: $notes,
});
