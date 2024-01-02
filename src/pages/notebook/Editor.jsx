import { Toolbar } from "./Toolbar";
import { DropdownMenu } from "../../components/DropdownMenu";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import { useState, useCallback } from "react";
import { debounce } from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faTrash, faCopy } from "@fortawesome/free-solid-svg-icons";

export function Editor({
  selectedNote,
  handleNoteTitleUpdate,
  handleNoteContentUpdate,
  handleRemoveNote,
}) {
  const [isTitleVisible, setIsTitleVisible] = useState(true);

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
          bulletList: {
            HTMLAttributes: {
              class: "list-disc ml-8",
            },
          },
          orderedList: {
            HTMLAttributes: {
              class: "list-decimal ml-8",
            },
          },
        }),
        Placeholder.configure({
          placeholder: "Start Typing...",
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Highlight,
        Underline,
      ],
      content: selectedNote.content,
      editorProps: {
        attributes: {
          class: "px-10 grow focus:outline-none pt-4 leading-normal selection:bg-selection",
        },
      },
      onUpdate: ({ editor }) => handleNoteContentChange(editor.getJSON()),
    },
    [selectedNote._id]
  );

  function handleScroll(event) {
    if (event.target.scrollTop > 44) setIsTitleVisible(false);
    else setIsTitleVisible(true);
  }

  const handleNoteContentChange = useCallback(
    debounce(editorContent => handleNoteContentUpdate(editorContent, selectedNote._id), 1000),
    [selectedNote._id, handleNoteContentUpdate]
  );

  const handleNoteTitleChange = useCallback(
    debounce(newTitle => handleNoteTitleUpdate(newTitle, selectedNote._id), 1000),
    [selectedNote._id, handleNoteTitleUpdate]
  );

  if (!editor) {
    return null;
  }

  //TODO: Editor re renders on every selection?
  return (
    <div className="min-h-full overflow-auto" onScroll={handleScroll}>
      <Toolbar editor={editor} isTitleVisible={isTitleVisible} noteName={selectedNote.title} />
      <div className="mx-10 flex items-center gap-6 border-b-[1px] border-nero2">
        <input
          className="h-[4.375rem] w-56 grow overflow-hidden text-ellipsis bg-transparent text-4xl focus:outline-none"
          onChange={e => handleNoteTitleChange(e.target.value.trim())}
          defaultValue={selectedNote.title}
          key={selectedNote._id}
          maxLength={60}
          onBlur={e => e.target.setSelectionRange(0, 0)}
          placeholder="Type a Title..."
        />
        <DropdownMenu
          label="Note Options"
          triggerChild={{
            attributes: { secundary: true, multiItem: true },
            element: <FontAwesomeIcon icon={faEllipsis} />,
          }}
          dropdownItems={[
            {
              element: (
                <>
                  <FontAwesomeIcon icon={faCopy} className="h-[16px] w-[16px]" />
                  <p>Duplicate</p>
                </>
              ),
            },
            {
              element: (
                <>
                  <FontAwesomeIcon icon={faTrash} className="h-[16px] w-[16px]" />
                  <p>Delete</p>
                </>
              ),
              onSelect: () => handleRemoveNote(selectedNote._id),
            },
          ]}
        />
      </div>
      <EditorContent
        editor={editor}
        className="relative flex min-h-[calc(100%-115px)] flex-col"
        spellCheck={false}
      />
    </div>
  );
}
