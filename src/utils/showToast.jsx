import { Button } from "../components/Button";

import { toast, Slide } from "react-toastify";

export function showToast(text, type, action = false, actionText = "") {
  toast[type](
    ({ closeToast }) => (
      <div className="flex items-center justify-between gap-2 pl-4">
        <p>{text}</p>
        {action && (
          <Button
            onClick={() => {
              action();
              closeToast();
            }}
          >
            <p className="font-bold">{actionText}</p>
          </Button>
        )}
      </div>
    ),
    {
      position: toast.POSITION.BOTTOM_RIGHT,
      hideProgressBar: true,
      transition: Slide,
    }
  );
}
