import { debounce } from "lodash";
import { useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export function Searchbar({ editor }) {
  const handleSearch = useCallback(
    debounce(searchValue => {
      if (!searchValue) return;

      console.log("Search");
      console.log(editor.getJSON());
      editor.commands.setTextSelection({ from: 5, to: 10 });
      editor.commands.setMark("highlight");
    }, 500),
    []
  );

  return (
    <div className="relative flex items-center text-gray-500 focus-within:text-gray-300">
      <FontAwesomeIcon icon={faSearch} className="pointer-events-none absolute ml-4" />
      <input
        type="text"
        className="h-7 w-48 rounded-lg bg-denim pl-10 pr-4 text-[14px] placeholder-gray-500 hover:bg-denimLight focus:bg-denimLight focus:outline focus:outline-1 focus:outline-gray-600"
        placeholder="Search (Ctrl + K)"
        onChange={e => handleSearch(e.target.value)}
      />
    </div>
  );
}
