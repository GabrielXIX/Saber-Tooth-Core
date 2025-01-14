import { DropdownMenu } from "../../components/DropdownMenu";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faSort, faCalendar, faArrowDownAZ } from "@fortawesome/free-solid-svg-icons";
import { useIsMount } from "../../utils/useIsMount";

export function NoteList({ notebook, activeNoteId, handleSelectNote, handleNotebookNameUpdate }) {
  dayjs.extend(relativeTime);

  const [sortBy, setSortBy] = useState(localStorage.getItem("lastSortBy") || "date");
  const isMount = useIsMount();

  useEffect(() => {
    if (isMount) return;

    localStorage.setItem("lastSortBy", sortBy);
  }, [sortBy]);

  return (
    <>
      <header className="flex items-center gap-1.5 px-4 py-1">
        <FontAwesomeIcon icon={faBook} />
        <input
          className="h-7 grow overflow-hidden text-ellipsis rounded-sm bg-transparent px-2 selection:bg-selection  hover:ring-2 hover:ring-sky focus:outline focus:outline-2 focus:outline-sky"
          type="text"
          defaultValue={notebook.notebookName}
          onFocus={e => e.target.select()}
          maxLength={32}
          onBlur={e => {
            handleNotebookNameUpdate(e.target.value.trim());
            e.target.setSelectionRange(0, 0);
          }}
          onKeyDown={e => e.key === "Enter" && e.target.blur()}
        />
        {notebook.notes.length > 0 && (
          <DropdownMenu
            label="Sort By"
            triggerChild={{
              attributes: { secundary: true },
              element: <FontAwesomeIcon icon={faSort} />,
            }}
            dropdownItems={[
              {
                element: (
                  <>
                    <FontAwesomeIcon icon={faArrowDownAZ} />
                    <p>Title</p>
                  </>
                ),
                onSelect: () => setSortBy("title"),
                active: sortBy === "title",
              },
              {
                element: (
                  <>
                    <FontAwesomeIcon icon={faCalendar} />
                    <p>Date</p>
                  </>
                ),
                onSelect: () => setSortBy("date"),
                active: sortBy === "date",
              },
            ]}
          />
        )}
      </header>
      {notebook.notes && (
        <ul className="mb-4 overflow-y-auto py-1">
          {notebook.notes
            .sort((a, b) => {
              if (sortBy === "title") return a.title > b.title ? 1 : -1;
              else if (sortBy === "date") return new Date(b.updatedAt) - new Date(a.updatedAt);
            })
            .map(note => (
              <li
                onClick={() => handleSelectNote(note._id)}
                key={note._id}
                className={`relative cursor-pointer px-6 py-4 ${
                  note._id === activeNoteId
                    ? "bg-denim after:absolute after:right-0 after:top-0 after:h-full after:w-[4px] after:bg-sky"
                    : "transition-colors duration-150 hover:bg-nero2"
                } `}
              >
                <p className="mb-1 break-words text-xl/none">
                  {note.title.length > 21 ? note.title.substring(0, 15) + "..." : note.title}
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
