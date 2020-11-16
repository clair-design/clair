import { useRef, useEffect } from "react";
import { UseFocusEventProps } from "../util/types";

export function useFocusEvent(props: UseFocusEventProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { handleFocus, handleBlur, handleKeyDown } = props;
    const menu = menuRef.current;
    const eventHandler = {
      keydown: handleKeyDown,
      blur: handleBlur,
      focus: handleFocus
    };
    const handleEventListener = (
      mode: "addEventListener" | "removeEventListener",
      listeners: typeof eventHandler
    ) => {
      Object.entries(listeners).forEach(([type, callback]) => {
        menu?.[mode](
          type,
          (callback as unknown) as EventListenerOrEventListenerObject
        );
      });
    };
    handleEventListener("addEventListener", eventHandler);
    return () => handleEventListener("removeEventListener", eventHandler);
  }, [props]);

  return menuRef;
}
