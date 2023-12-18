import { DeleteToast } from "../components/DeleteToast";
import { toast, Slide } from "react-toastify";

export function showTrashToast(activeId) {
  toast.success(<DeleteToast noteId={activeId} />, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: "bg-nero1 w-72 font-[lexend] text-whiteSmoke",
    hideProgressBar: true,
    transition: Slide,
  });
}
