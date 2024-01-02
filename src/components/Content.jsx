import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTooth } from "@fortawesome/free-solid-svg-icons";
// import logo from "../assets/sabertooth_logo.png";
import { useState } from "react";
import { Button } from "./Button";

export function Content({ children }) {
  const [popover, setPopover] = useState(false);

  return (
    <main className="relative flex grow flex-col">
      {children}
      <Button
        secundary="true"
        aditionalStyle="absolute bottom-12 left-[-0.25rem] z-30 cursor-pointer rounded-r-lg bg-nero1"
        onClick={() => setPopover(!popover)}
      >
        {/* <img src={logo} alt="logo" width={32} /> */}
        <FontAwesomeIcon icon={faTooth} />
      </Button>
      {popover && (
        <div className="absolute bottom-12 left-8 flex cursor-default gap-2 rounded-lg bg-nero1 px-4 py-1.5">
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
