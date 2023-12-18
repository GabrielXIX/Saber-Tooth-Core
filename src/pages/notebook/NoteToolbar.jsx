import { Button } from "../../components/Button";
import { DropdownMenu } from "../../components/DropdownMenu";
import { SavingLabel } from "../../components/SavingLabel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faAlignCenter,
  faAlignLeft,
  faAlignJustify,
  faAlignRight,
  faTable,
  faImage,
  faCode,
  faBrush,
  faPlus,
  faFont,
  faList,
  faListOl,
  faParagraph,
} from "@fortawesome/free-solid-svg-icons";
import { Searchbar } from "../../components/Searchbar";

export function NoteToolbar({
  editor,
  isTitleVisible,
  // updateContentLoading,
  // updateTitleLoading,
  noteName,
}) {
  // console.log("toolbar render");
  return (
    <div className="sticky top-0 z-10 flex min-h-[2.75rem] items-center bg-nero1 px-10 py-2">
      <div className="border-r border-r-charcoal pr-2">
        <Searchbar editor={editor} />
      </div>
      <div className="border-r border-r-charcoal px-2">
        <Button
          secundary
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          aditionalStyle={editor.isActive("heading", { level: 1 }) ? "bg-sky" : ""}
        >
          <p>H1</p>
        </Button>
        <Button
          secundary
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          aditionalStyle={editor.isActive("heading", { level: 2 }) ? "bg-sky" : ""}
        >
          <p>H2</p>
        </Button>
        <Button
          secundary
          onClick={() => editor.chain().focus().setParagraph().run()}
          aditionalStyle={editor.isActive("paragraph") ? "bg-sky" : ""}
        >
          <FontAwesomeIcon icon={faParagraph} className="h-[16px] w-[16px]" />
        </Button>
      </div>

      <div className="flex gap-1 border-r border-r-charcoal px-2">
        <Button
          secundary
          onClick={() => editor.chain().focus().toggleBold().run()}
          aditionalStyle={editor.isActive("bold") ? "bg-sky" : ""}
        >
          <p className="text-bold">B</p>
        </Button>
        <Button
          secundary
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aditionalStyle={editor.isActive("italic") ? "bg-sky" : ""}
        >
          <p className="italic">I</p>
        </Button>
        <Button
          secundary
          onClick={() => {
            editor.chain().focus().toggleUnderline().run();
          }}
          aditionalStyle={editor?.isActive("underline") ? "bg-sky" : ""}
        >
          <p className="underline">U</p>
        </Button>
        <Button
          secundary
          onClick={() => {
            editor.chain().focus().toggleHighlight().run();
          }}
          aditionalStyle={editor?.isActive("highlight") ? "bg-sky" : ""}
        >
          <p>H</p>
        </Button>
        <DropdownMenu
          triggerChild={{
            attributes: { secundary: true, multiItem: true },
            element: (
              <FontAwesomeIcon
                icon={
                  (editor.isActive({ textAlign: "left" }) && faAlignLeft) ||
                  (editor.isActive({ textAlign: "center" }) && faAlignCenter) ||
                  (editor.isActive({ textAlign: "right" }) && faAlignRight) ||
                  (editor.isActive({ textAlign: "justify" }) && faAlignJustify)
                }
                className="h-[16px] w-[16px]"
              />
            ),
          }}
          dropdownItems={[
            {
              element: (
                <FontAwesomeIcon
                  icon={faAlignLeft}
                  className={`h-[16px] w-[16px] ${
                    editor.isActive({ textAlign: "left" }) ? "text-skyLight" : ""
                  }`}
                />
              ),
              onSelect: () => editor.chain().focus().setTextAlign("left").run(),
            },
            {
              element: (
                <FontAwesomeIcon
                  icon={faAlignCenter}
                  className={`h-[16px] w-[16px] ${
                    editor.isActive({ textAlign: "center" }) ? "text-skyLight" : ""
                  }`}
                />
              ),
              onSelect: () => editor.chain().focus().setTextAlign("center").run(),
            },
            {
              element: (
                <FontAwesomeIcon
                  icon={faAlignRight}
                  className={`h-[16px] w-[16px] ${
                    editor.isActive({ textAlign: "right" }) ? "text-skyLight" : ""
                  }`}
                />
              ),
              onSelect: () => editor.chain().focus().setTextAlign("right").run(),
            },
            {
              element: (
                <FontAwesomeIcon
                  icon={faAlignJustify}
                  className={`h-[16px] w-[16px] ${
                    editor.isActive({ textAlign: "justify" }) ? "text-skyLight" : ""
                  }`}
                />
              ),
              onSelect: () => editor.chain().focus().setTextAlign("justify").run(),
            },
          ]}
        />
      </div>
      <div className="pl-2">
        <Button
          secundary
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aditionalStyle={editor.isActive("bulletList") ? "bg-sky" : ""}
        >
          <FontAwesomeIcon icon={faList} className="h-[16px] w-[16px]" />
        </Button>
        <Button
          secundary
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aditionalStyle={editor.isActive("orderedList") ? "bg-sky" : ""}
        >
          <FontAwesomeIcon icon={faListOl} className="h-[16px] w-[16px]" />
        </Button>
      </div>
      <div className="ml-auto flex gap-6">
        {!isTitleVisible && (
          <p className="max-w-[7rem] cursor-default overflow-hidden text-ellipsis whitespace-nowrap text-sm font-light text-silver">
            {noteName}
          </p>
        )}
        <SavingLabel
        // updateContentLoading={updateContentLoading}
        // updateTitleLoading={updateTitleLoading}
        />
      </div>
    </div>
  );
}
