import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faCloud } from "@fortawesome/free-solid-svg-icons";

export function SavingLabel({ updateContentLoading = false, updateTitleLoading = false }) {
  return (
    <div className="flex items-center gap-2">
      {updateContentLoading || updateTitleLoading ? (
        <>
          <FontAwesomeIcon icon={faArrowRotateRight} className="h-[16px] w-[16px]" />
          <p className="cursor-default whitespace-nowrap text-sm font-light">Saving...</p>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faCloud} className="h-[16px] w-[16px] text-silver" />
          <p className="cursor-default whitespace-nowrap text-sm font-light text-silver">
            Note Saved
          </p>
        </>
      )}
    </div>
  );
}
