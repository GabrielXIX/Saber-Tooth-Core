import { toast, Slide } from "react-toastify";
import { Button } from "../components/Button";

export function showToast(text, type, action = false) {
  toast[type](
    ({ closeToast }) => (
      <div className="flex items-center justify-between gap-2 pl-4">
        <p className="font-bold">{text}</p>
        {action && (
          <Button
            secundary
            onClick={() => {
              action();
              closeToast();
            }}
          >
            Undo
          </Button>
        )}
      </div>
    ),
    {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "bg-nero1 font-[lexend] text-whiteSmoke",
      hideProgressBar: true,
      transition: Slide,
    }
  );
}
