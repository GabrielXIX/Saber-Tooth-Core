import { Button } from "./Button";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

export function CopyrightPopover() {
  const [popover, setPopover] = useState(false);

  return (
    <div className="mx-6 my-1 flex gap-2">
      <Button secundary onClick={() => setPopover(!popover)}>
        <FontAwesomeIcon icon={faCode} />
      </Button>
      {popover && (
        <div className="flex cursor-default items-center gap-2 rounded-lg bg-nero2 px-4 py-1.5 text-[13px]">
          <p>
            Made by{" "}
            <a
              href="https://github.com/GabrielXIX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-skyLight underline"
            >
              Gabriel Dueñas
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
