import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/sabertooth_logo.png";
import { useState } from "react";

export function Content({ children }) {
  const [popover, setPopover] = useState(false);

  return (
    <main className="relative flex grow flex-col">
      {children}
      <div
        className="absolute bottom-12 left-0 cursor-pointer rounded-r-lg bg-nero1"
        onClick={() => setPopover(!popover)}
      >
        <img src={logo} alt="logo" width={32} />
      </div>
      {popover && (
        <div className="absolute bottom-24 right-14 flex cursor-default gap-2 rounded-lg bg-nero1 px-4 py-2">
          <p>Made with</p>
          <FontAwesomeIcon icon={faHeart} className="text-red-500" />
          <p>by</p>
          <a
            href="https://github.com/GabrielXIX"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Gabriel Dueñas
          </a>
        </div>
      )}
    </main>
  );
}
