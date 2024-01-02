export function getLastUntitledNoteNumber(notes) {
  if (notes.length === 0) return 0;

  const untitledNotes = notes.filter(note => note.title.startsWith("New Note "));
  if (untitledNotes.length === 0) return 0;

  const untitledNotesNumbers = untitledNotes.map(note => parseInt(note.title.split(" ")[2]));
  const lastUntitledNoteNumber = Math.max(...untitledNotesNumbers);

  return lastUntitledNoteNumber;
}
