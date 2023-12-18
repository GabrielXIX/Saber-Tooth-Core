import { Button } from "../Button";
import { DropdownMenu } from "../DropdownMenu";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../adapters/AuthAPI";

import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faSliders, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    mutate: logoutMutate,
    isLoading: logoutLoading,
    isError: logoutError,
  } = useMutation(logout, {
    onSuccess: () => {
      auth.setUser(null);
      navigate("/login", { replace: true });
    },
  });

  function handleLogout() {
    logoutMutate();
  }

  if (!auth.user) {
    return (
      <Link to="/login">
        <p>Log in</p>
      </Link>
    );
  }

  return (
    <DropdownMenu
      label={auth.user.name}
      triggerChild={{
        attributes: { multiItem: true, aditionalStyle: "bg-transparent" },
        element: <FontAwesomeIcon icon={faCircleUser} className="h-[18px] w-[18px]" />,
      }}
      dropdownItems={[
        {
          element: (
            <>
              <FontAwesomeIcon icon={faCircleUser} className="h-[16px] w-[16px]" />
              <p>Profile</p>
            </>
          ),
        },
        {
          element: (
            <>
              <FontAwesomeIcon icon={faSliders} className="h-[16px] w-[16px]" />
              <p>Settings</p>
            </>
          ),
        },
        {
          element: (
            <>
              <FontAwesomeIcon icon={faRightFromBracket} className="h-[16px] w-[16px]" />
              <p>Go to landing</p>
            </>
          ),
        },
        {
          element: (
            <>
              <FontAwesomeIcon icon={faRightFromBracket} className="h-[16px] w-[16px]" />
              <p>Log Out</p>
            </>
          ),
          onSelect: handleLogout,
        },
      ]}
    />
  );
}
