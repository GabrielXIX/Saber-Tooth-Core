import { Button } from "./Button";

export function DeleteToast({ setNotebook, deletedNote, closeToast }) {
  function handleUndo() {
    // !save to local storage
    setNotebook(prevNotebook => ({ ...prevNotebook, notes: [...prevNotebook.notes, deletedNote] }));
    closeToast();
  }

  return (
    <div className="flex items-center justify-between gap-2 pl-4">
      <p className="font-bold">Note Deleted</p>
      <Button secundary onClick={handleUndo}>
        Undo
      </Button>
    </div>
  );
}
