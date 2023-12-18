import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export function NotebookSidebarFooter({ handleAddNote }) {
  // const { user } = useAuth();

  return (
    <footer className="mb-8 mt-auto px-6 py-1">
      <Button accented multiItem onClick={handleAddNote}>
        <FontAwesomeIcon icon={faPlus} className="h-[18px] w-[18px]" />
        <p>New Note</p>
      </Button>
    </footer>
  );
}
