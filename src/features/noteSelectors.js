export const selectNotes = (state) => state.note.notes;

export const selectNotesByCategory = (categoryId) => (state) =>
  state.note.notes.filter(note => note.categoryId === categoryId);

export const selectPinnedNotes = (state) =>
  state.note.notes.filter(note => note.pinned);
