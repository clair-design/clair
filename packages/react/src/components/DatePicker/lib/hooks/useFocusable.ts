import { useImperativeHandle, Ref, RefObject } from "react";
import { FocusableHandles } from "../interface";

/**
 * make the focusable element focus/blur when the component's
 * focus()/blur() method is called
 * @param componentRef reference to the component
 * @param focusableRef reference to the focusable element
 */
export function useFocusable(
  componentRef: Ref<FocusableHandles>,
  focusableRef: RefObject<HTMLInputElement>
): RefObject<HTMLInputElement> {
  useImperativeHandle(componentRef, () => ({
    focus: () => {
      focusableRef.current?.focus();
    },
    blur: () => {
      focusableRef.current?.blur();
    }
  }));
  return focusableRef;
}
