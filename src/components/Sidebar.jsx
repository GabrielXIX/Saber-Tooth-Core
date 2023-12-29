import { Button } from "./Button";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export function Sidebar({ children }) {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <div className="relative">
      {openSidebar && (
        <aside className="relative z-20 flex h-full w-72 flex-none flex-col bg-nero1 py-1">
          {children}
        </aside>
      )}
      <Button
        secundary="true"
        aditionalStyle="absolute bottom-2 right-[-1.75rem] z-30"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        <FontAwesomeIcon icon={openSidebar ? faChevronLeft : faChevronRight} />
      </Button>
    </div>
  );
}
