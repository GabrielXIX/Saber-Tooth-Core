import { Sidebar } from "../../components/Sidebar";
import { Content } from "../../components/Content";
import { NoteList } from "./NoteList";
import { NotebookSidebarFooter } from "./NotebookSidebarFooter";
import { Editor } from "./Editor";

import uuid from "react-uuid";
import { useState } from "react";

const initialNotebook = {
  notebookName: "My Notebook 1",
  notes: [
    {
      _id: "a1",
      title: "Note 1",
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            attrs: { textAlign: "left" },
            content: [{ type: "text", text: "content 1" }],
          },
        ],
      },
      updatedAt: new Date(),
    },
  ],
};

// useEffect for getting local storage
export function NotebookPage() {
  const [notebook, setNotebook] = useState(initialNotebook);
  const [activeNoteId, setActiveNoteId] = useState("");
  // console.log(`Selected Note: ${activeNoteId || "None"}`);

  function addNote() {
    const unnamedNoteCount = notebook.notes.filter(note =>
      note.title.startsWith("New Note ")
    ).length;

    const newNote = {
      _id: uuid(),
      title: `New Note ${unnamedNoteCount ? unnamedNoteCount + 1 : "1"}`,
      content: { type: "doc", content: [{ type: "paragraph", attrs: { textAlign: "left" } }] },
      updatedAt: new Date(),
    };

    setNotebook(prevNotebook => ({ ...prevNotebook, notes: [...prevNotebook.notes, newNote] }));
    setActiveNoteId(newNote._id);
  }

  function removeNote(selectedNoteId) {
    setNotebook(prevNotebook => ({
      ...prevNotebook,
      notes: prevNotebook.notes.filter(note => note._id !== selectedNoteId),
    }));

    if (notebook.notes.length > 1) setActiveNoteId(notebook.notes[0]._id);
    else setActiveNoteId("");
  }

  function updateNoteContent(editorContent, selectedNoteId) {
    if (notebook.notes.some(note => JSON.stringify(note.content) === JSON.stringify(editorContent)))
      return;

    setNotebook(prevNotebook => ({
      ...prevNotebook,
      notes: prevNotebook.notes.map(note => {
        if (note._id === selectedNoteId) return { ...note, content: editorContent };
        else return note;
      }),
    }));
  }

  function updateNoteTitle(newTitle, selectedNoteId) {
    if (notebook.notes.some(note => note._id === selectedNoteId && note.title === newTitle)) return;

    setNotebook(prevNotebook => ({
      ...prevNotebook,
      notes: prevNotebook.notes.map(note => {
        if (note._id === selectedNoteId) return { ...note, title: newTitle };
        else return note;
      }),
    }));
  }

  function updateNotebookName(newName) {
    if (notebook.notebookName === newName) return;
    setNotebook(prevNotebook => ({ ...prevNotebook, notebookName: newName }));
  }

  return (
    <div className="flex h-full">
      <Sidebar>
        <NoteList
          notebook={notebook}
          activeNoteId={activeNoteId}
          handleSelectNote={setActiveNoteId}
          handleNotebookNameUpdate={updateNotebookName}
        />
        <NotebookSidebarFooter handleAddNote={addNote} />
      </Sidebar>
      <Content>
        {activeNoteId ? (
          <Editor
            selectedNote={notebook.notes.find(note => note._id === activeNoteId)}
            handleNoteTitleUpdate={updateNoteTitle}
            handleNoteContentUpdate={updateNoteContent}
            handleRemoveNote={removeNote}
            // updateContentLoading={updateContentLoading}
            // updateTitleLoading={updateTitleLoading}
          />
        ) : (
          <div className="p-4">Hello, create a new note!</div>
        )}
      </Content>
    </div>
  );
}

// when not a single note is focused then put placeholder image
// change notebook title
//finished note toolbar funcionality
