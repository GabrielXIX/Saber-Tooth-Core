import { DropdownMenu } from "../../components/DropdownMenu";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faFilter, faSort } from "@fortawesome/free-solid-svg-icons";

export function NoteList({ notebook, activeNoteId, handleSelectNote, handleNotebookNameUpdate }) {
  dayjs.extend(relativeTime);

  return (
    <>
      <header className="flex px-4 py-1">
        <div className="flex items-center gap-1.5">
          <FontAwesomeIcon icon={faBook} />
          <input
            className=" h-full w-40 overflow-hidden text-ellipsis rounded-sm bg-transparent px-2  hover:ring-2 hover:ring-sky focus:outline focus:outline-2 focus:outline-sky"
            type="text"
            defaultValue={notebook.notebookName}
            onFocus={e => e.target.select()}
            maxLength={20}
            onBlur={e => {
              handleNotebookNameUpdate(e.target.value.trim());
              e.target.setSelectionRange(0, 0);
            }}
            onKeyDown={e => e.key === "Enter" && e.target.blur()}
          />
        </div>
        <div className="ml-auto flex gap-0.5">
          <DropdownMenu
            label="Filter By"
            triggerChild={{
              attributes: { secundary: true },
              element: <FontAwesomeIcon icon={faFilter} />,
            }}
            dropdownItems={[{ element: <p>Last 24 hrs</p> }, { element: <p>With Images</p> }]}
          />
          <DropdownMenu
            label="Sort By"
            triggerChild={{
              attributes: { secundary: true },
              element: <FontAwesomeIcon icon={faSort} />,
            }}
            dropdownItems={[{ element: <p>By Title</p> }, { element: <p>By Update</p> }]}
          />
        </div>
      </header>
      {notebook.notes && (
        <ul className="py-1">
          {notebook.notes.map(note => (
            <li
              onClick={() => handleSelectNote(note._id)}
              key={note._id}
              className={`relative cursor-pointer px-6 py-4 ${
                note._id === activeNoteId
                  ? "bg-denim after:absolute after:left-full after:top-0 after:h-full after:w-[4px] after:bg-sky"
                  : "transition-colors duration-150 hover:bg-nero2"
              } `}
            >
              <p className="mb-1 break-words text-xl/none">
                {note.title.length > 21 ? note.title.substring(0, 21) + "..." : note.title}
              </p>
              <p className="text-[14px] font-extralight text-silver">
                {dayjs(note.updatedAt).fromNow()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
