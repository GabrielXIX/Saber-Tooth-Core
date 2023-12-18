import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky, faSquareCheck, faHome, faTooth } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  return (
    <nav>
      <ul className="flex gap-1.5">
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center gap-1.5 rounded-[2.2rem] px-4 py-2 ${
                isActive ? "bg-sky" : "bg-denim hover:bg-denimLight"
              }`
            }
          >
            <FontAwesomeIcon icon={faHome} className="h-[16px] w-[16px]" />
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/notebook"
            className={({ isActive }) =>
              `flex items-center gap-1.5 rounded-[2.2rem] px-4 py-2 ${
                isActive ? "bg-sky" : "bg-denim hover:bg-denimLight"
              }`
            }
          >
            <FontAwesomeIcon icon={faNoteSticky} className="h-[16px] w-[16px]" />
            <p>Notes</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/workspace"
            className={({ isActive }) =>
              `flex items-center gap-1.5 rounded-[2.2rem] px-4 py-2 ${
                isActive ? "bg-sky" : "bg-denim hover:bg-denimLight"
              }`
            }
          >
            <FontAwesomeIcon icon={faSquareCheck} className="h-[16px] w-[16px]" />
            <p>Tasks</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
