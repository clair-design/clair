import { useRef, useEffect, useContext } from "react";
import { runMatchedCallback } from "../utils/ui";
import { KeyboardListeners } from "../interface";
import { PickerContext } from "../PickerContext";

const isNavKey = (e: KeyboardEvent) => {
  return ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key);
};

/**
 * navigating grid using keyboards
 * @param listeners callbacks when arrow keys pressed
 * @returns React RefObject to the gird element
 */
export function useGridNavigation(listener: KeyboardListeners) {
  const { isPanelFocused, setPanelFocus } = useContext(PickerContext);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // set panel focused when arrow key pressed
      if (!isPanelFocused && isNavKey(event)) {
        event.preventDefault();
        setPanelFocus(true);
        return;
      }
      runMatchedCallback(
        (event as unknown) as React.KeyboardEvent,
        ["ArrowLeft", listener.onLeftPressed, true],
        ["ArrowRight", listener.onRightPressed, true],
        ["ArrowUp", listener.onUpPressed, true],
        ["ArrowDown", listener.onDownPressed, true],
        ["Enter", listener.onEnterPressed, true],
        ["Escape", listener.onEscapePressed, true]
      );
    };
    const grid = gridRef.current;
    grid?.addEventListener("keydown", onKeyDown);
    return () => grid?.removeEventListener("keydown", onKeyDown);
  }, [isPanelFocused, listener, setPanelFocus, gridRef]);
  return gridRef;
}
