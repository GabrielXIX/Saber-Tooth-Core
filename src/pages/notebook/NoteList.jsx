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
          <FontAwesomeIcon icon={faBook} className="h-[16px] w-[16px]" />
          <input
            className=" h-full w-40 overflow-hidden text-ellipsis rounded-sm bg-transparent px-2  hover:ring-2 hover:ring-gray-500 focus:outline focus:outline-1 focus:outline-skyLight"
            type="text"
            defaultValue={notebook.notebookName}
            onFocus={e => e.target.select()}
            maxLength={20}
            onBlur={e => handleNotebookNameUpdate(e.target.value.trim())}
          />
        </div>
        <div className="ml-auto flex gap-0.5">
          <DropdownMenu
            label="Filter By"
            triggerChild={{
              attributes: { secundary: true },
              element: <FontAwesomeIcon icon={faFilter} className="h-[16px] w-[16px]" />,
            }}
            dropdownItems={[{ element: <p>Last 24 hrs</p> }, { element: <p>With Images</p> }]}
          />
          <DropdownMenu
            label="Sort By"
            triggerChild={{
              attributes: { secundary: true },
              element: <FontAwesomeIcon icon={faSort} className="h-[16px] w-[16px]" />,
            }}
            dropdownItems={[{ element: <p>By Title</p> }, { element: <p>By Update</p> }]}
          />
        </div>
      </header>
      <ul className="py-1">
        {notebook.notes.map(note => (
          <li
            onClick={() => handleSelectNote(note._id)}
            key={note._id}
            className={`relative cursor-pointer px-6 py-4 ${
              note._id === activeNoteId
                ? "bg-denim after:absolute after:left-full after:top-0 after:h-full after:w-[4px] after:bg-sky"
                : "hover:bg-nero2"
            } `}
          >
            <p className="mb-1 text-xl/none">{note.title}</p>
            <p className="text-[14px] font-extralight text-silver">
              {dayjs(note.updatedAt).fromNow()}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
