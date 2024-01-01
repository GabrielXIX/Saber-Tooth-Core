import { Button } from "./Button";

import { Root, Trigger, Portal, Content, Item, Label } from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";

export function DropdownMenu({
  triggerChild = {
    element: <p>Open</p>,
  },
  dropdownItems = [{}],
  label = "",
}) {
  return (
    <Root modal={false}>
      <Trigger asChild>
        <Button
          aria-label="Menu"
          aditionalStyle="data-[state=open]:bg-nero2"
          {...triggerChild.attributes}
        >
          {triggerChild.element}
        </Button>
      </Trigger>
      <Portal>
        <Content
          className="z-50 w-fit rounded-lg bg-nero2 p-3 text-whiteSmoke"
          sideOffset={5}
          asChild
        >
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {label && <Label className="px-2 pb-2 font-bold">{label}</Label>}
            <div className="flex flex-col gap-1">
              {dropdownItems.map((dropdownItem, key) => (
                <Item
                  key={key}
                  onSelect={
                    dropdownItem.onSelect ||
                    function () {
                      console.log("Selected");
                      // !remove
                    }
                  }
                  className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-1.5 transition-colors hover:bg-charcoal hover:outline-none ${
                    dropdownItem.active ? "bg-sky hover:bg-skyLight " : ""
                  }`}
                >
                  {dropdownItem.element || <p>Option</p>}
                  {dropdownItem.command && <p className="ml-auto pl-4">{dropdownItem.command}</p>}
                </Item>
              ))}
            </div>
          </motion.div>
        </Content>
      </Portal>
    </Root>
  );
}
