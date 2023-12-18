import { Navbar } from "./Navbar";
import { Profile } from "./Profile";

import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";

export function Header() {
  const { pathname } = useLocation();

  if (pathname === "/login" || pathname === "/signup") {
    return;
  }

  return (
    <header className="z-40 flex min-w-fit items-center justify-between gap-4 bg-denim px-4 py-2">
      <Link to="/">
        <FontAwesomeIcon icon={faTooth} className="h-[18px] w-[18px]" />
      </Link>
      {/* <Navbar /> */}
      <Profile />
    </header>
  );
}
