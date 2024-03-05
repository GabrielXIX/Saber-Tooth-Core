import { forwardRef } from "react";

export const Button = forwardRef((props, forwardedRef) => {
  const {
    secundary,
    accented,
    multiItem,
    aditionalStyle,
    onClick,
    type = "button",
    ariaLabel = "Button",
    children,
    ...restOfProps
  } = props;

  return (
    <button
      {...restOfProps}
      ref={forwardedRef}
      className={`whitespace-nowrap transition-colors duration-150 focus:outline-none
        ${secundary ? "rounded-lg px-2 py-1.5" : "rounded-[2.2rem] px-4 py-2"}
        ${accented ? "bg-sky" : "bg-nero1 hover:bg-nero2"}
        ${multiItem ? "flex items-center gap-1.5" : ""}
        ${aditionalStyle ? aditionalStyle : ""}
      `}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
});
