import { Button } from "../../components/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignCenter,
  faAlignLeft,
  faAlignJustify,
  faAlignRight,
  faList,
  faListOl,
  faParagraph,
} from "@fortawesome/free-solid-svg-icons";
import { Searchbar } from "../../components/Searchbar";

export function Toolbar({ editor, isTitleVisible, noteName }) {
  // console.log("toolbar render");
  return (
    <div className="sticky top-0 z-10 flex min-h-[2.75rem] items-center bg-nero1 px-10 py-2">
      <div className="border-r border-r-charcoal pr-2">
        <Searchbar editor={editor} />
      </div>
      <div className="flex border-r border-r-charcoal px-2">
        <Button
          secundary
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          accented={editor.isActive("heading", { level: 1 })}
        >
          <p>H1</p>
        </Button>
        <Button
          secundary
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          accented={editor.isActive("heading", { level: 2 })}
        >
          <p>H2</p>
        </Button>
        <Button
          secundary
          onClick={() => editor.chain().focus().setParagraph().run()}
          accented={editor.isActive("paragraph")}
        >
          <FontAwesomeIcon icon={faParagraph} />
        </Button>
      </div>

      <div className="flex gap-1 border-r border-r-charcoal px-2">
        <Button
          secundary
          onClick={() => editor.chain().focus().toggleBold().run()}
          accented={editor.isActive("bold")}
        >
          <p className="text-bold">B</p>
        </Button>
        <Button
          secundary
          onClick={() => editor.chain().focus().toggleItalic().run()}
          accented={editor.isActive("italic")}
        >
          <p className="italic">I</p>
        </Button>
        <Button
          secundary
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          accented={editor.isActive("underline")}
        >
          <p className="underline">U</p>
        </Button>
        <Button
          secundary
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          accented={editor.isActive("highlight")}
        >
          <p>H</p>
        </Button>
      </div>
      <div className="flex gap-1 border-r border-r-charcoal px-2">
        <Button
          secundary
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          accented={editor.isActive({ textAlign: "left" })}
        >
          <FontAwesomeIcon icon={faAlignLeft} />
        </Button>
        <Button
          secundary
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          accented={editor.isActive({ textAlign: "center" })}
        >
          <FontAwesomeIcon icon={faAlignCenter} />
        </Button>
        <Button
          secundary
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          accented={editor.isActive({ textAlign: "right" })}
        >
          <FontAwesomeIcon icon={faAlignRight} />
        </Button>
        <Button
          secundary
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          accented={editor.isActive({ textAlign: "justify" })}
        >
          <FontAwesomeIcon icon={faAlignJustify} />
        </Button>
      </div>
      <div className="flex pl-2">
        <Button
          secundary
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aditionalStyle={editor.isActive("bulletList") ? "bg-sky" : ""}
        >
          <FontAwesomeIcon icon={faList} />
        </Button>
        <Button
          secundary
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aditionalStyle={editor.isActive("orderedList") ? "bg-sky" : ""}
        >
          <FontAwesomeIcon icon={faListOl} />
        </Button>
      </div>
      {!isTitleVisible && (
        <p className="ml-auto max-w-[7rem] cursor-default overflow-hidden text-ellipsis whitespace-nowrap text-sm font-light text-silver">
          {noteName}
        </p>
      )}
    </div>
  );
}
