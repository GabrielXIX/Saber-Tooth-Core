import { Sidebar } from "../../components/Sidebar";
import { NoteList } from "./NoteList";
import { Editor } from "./Editor";
import { CopyrightPopover } from "../../components/CopyrightPopover";

import { Button } from "../../components/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faNoteSticky } from "@fortawesome/free-solid-svg-icons";

import uuid from "react-uuid";
import { AES, enc } from "crypto-js";
import { useEffect, useState } from "react";

import { showToast } from "../../utils/showToast";
import { getLastUntitledNoteNumber } from "../../utils/getLastUntitledNoteNumber";
import { useIsMount } from "../../utils/useIsMount";

const initialNotebook = {
  notebookName: "Notebook 1",
  notes: [],
};

export function NotebookPage() {
  const [notebook, setNotebook] = useState(() =>
    localStorage.getItem("notebook")
      ? JSON.parse(
          AES.decrypt(
            localStorage.getItem("notebook"),
            import.meta.env.VITE_ENCRYPTION_KEY1
          ).toString(enc.Utf8)
        )
      : initialNotebook
  );
  const [activeNoteId, setActiveNoteId] = useState(() =>
    localStorage.getItem("lastActiveNoteId")
      ? AES.decrypt(
          localStorage.getItem("lastActiveNoteId"),
          import.meta.env.VITE_ENCRYPTION_KEY2
        ).toString(enc.Utf8)
      : ""
  );
  const isMount = useIsMount();

  useEffect(() => {
    if (isMount) return;
    const encryptedNotebook = AES.encrypt(
      JSON.stringify(notebook),
      import.meta.env.VITE_ENCRYPTION_KEY1
    ).toString();
    localStorage.setItem("notebook", encryptedNotebook);
  }, [notebook]);

  useEffect(() => {
    if (isMount || !activeNoteId) return;
    const encryptedActiveNoteId = AES.encrypt(
      activeNoteId,
      import.meta.env.VITE_ENCRYPTION_KEY2
    ).toString();
    localStorage.setItem("lastActiveNoteId", encryptedActiveNoteId);
  }, [activeNoteId]);

  function addNote() {
    if (notebook.notes.length >= 20) {
      showToast("Max Number of Notes is 20!", "error");
      return;
    }

    const lastUntitledNoteNumber = getLastUntitledNoteNumber(notebook.notes);

    const newNote = {
      _id: uuid(),
      title: `New Note ${lastUntitledNoteNumber + 1}`,
      content: { type: "doc", content: [{ type: "paragraph", attrs: { textAlign: "left" } }] },
      updatedAt: new Date(),
    };

    setActiveNoteId(newNote._id);
    setNotebook(prevNotebook => ({
      ...prevNotebook,
      notes: [...prevNotebook.notes, newNote],
    }));
  }

  function removeNote(selectedNoteId) {
    const deletedNote = notebook.notes.find(note => note._id === selectedNoteId);

    if (notebook.notes.length >= 2)
      setActiveNoteId(notebook.notes[notebook.notes.indexOf(deletedNote) === 0 ? 1 : 0]._id);
    else setActiveNoteId("");

    setNotebook(prevNotebook => ({
      ...prevNotebook,
      notes: prevNotebook.notes.filter(note => note._id !== selectedNoteId),
    }));

    showToast(
      `"${
        deletedNote.title.length > 15
          ? deletedNote.title.substring(0, 15) + "..."
          : deletedNote.title
      }" Deleted`,
      "success",
      () => {
        setNotebook(prevNotebook => ({
          ...prevNotebook,
          notes: [...prevNotebook.notes, deletedNote],
        }));
        setActiveNoteId(deletedNote._id);
      },
      "Undo"
    );
  }

  function duplicateNote(selectedNoteId) {
    const noteToDuplicate = notebook.notes.find(note => note._id === selectedNoteId);

    const duplicateNote = {
      _id: uuid(),
      title: `${noteToDuplicate.title} (copy)`,
      content: noteToDuplicate.content,
      updatedAt: new Date(),
    };

    setActiveNoteId(duplicateNote._id);
    setNotebook(prevNotebook => ({
      ...prevNotebook,
      notes: [...prevNotebook.notes, duplicateNote],
    }));
  }

  function updateNoteContent(editorContent, selectedNoteId) {
    if (notebook.notes.some(note => JSON.stringify(note.content) === JSON.stringify(editorContent)))
      return;

    setNotebook(prevNotebook => ({
      ...prevNotebook,
      notes: prevNotebook.notes.map(note => {
        if (note._id === selectedNoteId)
          return { ...note, content: editorContent, updatedAt: new Date() };
        else return note;
      }),
    }));
  }

  function updateNoteTitle(newTitle, selectedNoteId) {
    if (notebook.notes.some(note => note._id === selectedNoteId && note.title === newTitle)) return;

    const lastUntitledNoteNumber = getLastUntitledNoteNumber(notebook.notes);

    setNotebook(prevNotebook => ({
      ...prevNotebook,
      notes: prevNotebook.notes.map(note => {
        if (note._id === selectedNoteId)
          return {
            ...note,
            title: newTitle || `New Note ${lastUntitledNoteNumber + 1}`,
            updatedAt: new Date(),
          };
        else return note;
      }),
    }));
  }

  function updateNotebookName(newName) {
    if (notebook.notebookName === newName) return;

    setNotebook(prevNotebook => ({ ...prevNotebook, notebookName: newName || "Notebook 1" }));
  }

  return (
    <div className="flex h-full">
      <Sidebar>
        {notebook && (
          <NoteList
            notebook={notebook}
            activeNoteId={activeNoteId}
            handleSelectNote={setActiveNoteId}
            handleNotebookNameUpdate={updateNotebookName}
          />
        )}
        <footer className="mb-1 mt-auto px-6 py-1">
          <Button accented multiItem onClick={addNote}>
            <FontAwesomeIcon icon={faPlus} />
            <p>New Note</p>
          </Button>
        </footer>
        <CopyrightPopover />
      </Sidebar>
      <main className="relative flex w-full flex-col">
        {activeNoteId && notebook.notes.length > 0 ? (
          <Editor
            selectedNote={notebook.notes.find(note => note._id === activeNoteId)}
            handleNoteTitleUpdate={updateNoteTitle}
            handleNoteContentUpdate={updateNoteContent}
            handleRemoveNote={removeNote}
            handleDuplicateNote={duplicateNote}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-8 p-8">
            <div className="flex items-center">
              <img src="../src/assets/sabertooth_logo.png" alt="Logo" />
              <h1 className="inline-block">Saber Tooth</h1>
            </div>
            <div className="flex items-center gap-4">
              <h3>Create a</h3>
              <Button onClick={addNote} accented>
                <h3>Note</h3>
              </Button>
              <h3>and start typing!</h3>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
