import { Sidebar } from "../../components/Sidebar";
import { Content } from "../../components/Content";
import { NoteList } from "./NoteList";
import { Editor } from "./Editor";

import { Button } from "../../components/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import uuid from "react-uuid";
import { useEffect, useState } from "react";

import showDeleteToast from "../../utils/ShowDeleteToast";
import getLastUntitledNoteNumber from "../../utils/getLastUntitledNoteNumber";
import useIsMount from "../../utils/useIsMount";

const initialNotebook = {
  notebookName: "Notebook 1",
  notes: [],
};

export function NotebookPage() {
  const [notebook, setNotebook] = useState(
    () => JSON.parse(localStorage.getItem("notebook")) || initialNotebook
  );
  const [activeNoteId, setActiveNoteId] = useState(
    () => localStorage.getItem("lastActiveNoteId") || ""
  );
  const isMount = useIsMount();

  useEffect(() => {
    if (isMount) return;
    localStorage.setItem("notebook", JSON.stringify(notebook));
  }, [notebook]);

  useEffect(() => {
    if (isMount || !activeNoteId) return;
    localStorage.setItem("lastActiveNoteId", activeNoteId);
  }, [activeNoteId]);

  function addNote() {
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

    showDeleteToast(setNotebook, deletedNote);
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
        <footer className="mb-8 mt-auto px-6 py-1">
          <Button accented multiItem onClick={addNote}>
            <FontAwesomeIcon icon={faPlus} />
            <p>New Note</p>
          </Button>
        </footer>
      </Sidebar>
      <Content>
        {activeNoteId ? (
          <Editor
            selectedNote={notebook.notes.find(note => note._id === activeNoteId)}
            handleNoteTitleUpdate={updateNoteTitle}
            handleNoteContentUpdate={updateNoteContent}
            handleRemoveNote={removeNote}
          />
        ) : (
          <div className="p-4">Hello, create a new note!</div>
        )}
      </Content>
    </div>
  );
}
