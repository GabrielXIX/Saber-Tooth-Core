import { Button } from "./Button";

export function DeleteToast({ noteId, closeToast }) {
  function handleUndo(noteId) {
    console.log("Undoing delete " + noteId);
    closeToast();
  }

  console.log("Toast render");
  return (
    <div className="flex items-center justify-between gap-2 pl-4">
      <p className="font-bold">Note Deleted</p>
      <Button secundary onClick={() => handleUndo(noteId)}>
        Undo
      </Button>
    </div>
  );
}
