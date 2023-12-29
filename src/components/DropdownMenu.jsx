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
            {dropdownItems.map((dropdownItem, key) => (
              <Item
                key={key}
                onSelect={
                  dropdownItem.onSelect ||
                  function () {
                    console.log("Selected");
                  }
                }
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-charcoal hover:outline-none"
              >
                {dropdownItem.element || <p>Option</p>}
                {dropdownItem.command && <p className="ml-auto pl-4">{dropdownItem.command}</p>}
              </Item>
            ))}
          </motion.div>
        </Content>
      </Portal>
    </Root>
  );
}
