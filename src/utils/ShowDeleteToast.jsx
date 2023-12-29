import { DeleteToast } from "../components/DeleteToast";
import { toast, Slide } from "react-toastify";

export default function showDeleteToast(setNotebook, deletedNote) {
  toast.success(<DeleteToast setNotebook={setNotebook} deletedNote={deletedNote} />, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: "bg-nero1 w-72 font-[lexend] text-whiteSmoke",
    hideProgressBar: true,
    transition: Slide,
  });
}
