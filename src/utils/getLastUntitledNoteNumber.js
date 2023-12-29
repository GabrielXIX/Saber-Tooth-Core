export default function getLastUntitledNoteNumber(notes) {
  if (notes.length === 0) return 0;

  const untitledNotes = notes.filter(note => note.title.startsWith("New Note "));
  const lastUnitledNoteNumber = parseInt(
    untitledNotes[untitledNotes.length - 1].title.split(" ")[2]
  );

  return lastUnitledNoteNumber;
}
